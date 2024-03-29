package com.stakloram.backend.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import static com.stakloram.backend.constants.Constants.WORK_ORDER_PDF_DIRECTORY;
import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.Image;
import com.stakloram.backend.models.Pdf;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.WorkOrderItem;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.PdfBuilder;
import com.stakloram.backend.services.impl.builder.impl.WorkOrderBuilder;
import com.stakloram.backend.util.DataChecker;
import com.stakloram.backend.util.Helper;
import java.io.File;
import java.io.IOException;
import static java.nio.file.Files.copy;
import java.nio.file.Path;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class WorkOrderService extends ServiceModel {

    private final PdfBuilder pdfBuilder = new PdfBuilder();

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new WorkOrderBuilder();
    }

    public Set<String> getAllWorkOrderItemDescriptions() throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return ((WorkOrderBuilder) this.baseBuilder).getAllWorkOrderItemDescriptions(conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public List<WorkOrder> getAllUnsettledWorkOrder(String buyerOID) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return ((WorkOrderBuilder) this.baseBuilder).getAllUnsettledWorkOrder(buyerOID, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public boolean toggleSettledForWorkOrder(String workOrderOID, boolean settled) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            this.startTransaction(conn);
            boolean isSettled = ((WorkOrderBuilder) this.baseBuilder).toggleSettledForWorkOrder(workOrderOID, settled, conn);
            if (isSettled) {
                this.endTransaction(conn);
            } else {
                this.rollback(conn);
            }
            return isSettled;
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        WorkOrder wo = (WorkOrder) baseModel;
        if (!super.isObjectWithOid(wo.getBuyer())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyer"));
        }
        for (WorkOrderItem woi : wo.getWorkOrderItems()) {
            if (DataChecker.isNull(woi.getDescription()) || woi.getDescription().trim().isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("description"));
            }
            super.checkIsAmountPositive(woi.getSumQuantity(), UserMessage.getLocalizedMessage("amount"));
        }
        for (Image image : wo.getImages()) {
            if (DataChecker.isNull(image) || image.getUrl().isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("imageIsntSelected"));
            }
        }
    }

    public long getNextWorkOrderNumber(int year) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return ((WorkOrderBuilder) this.baseBuilder).getNextWorkOrderNumber(year, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public boolean changeBuyer(String workOrderOID, String buyerOID) throws SException {
        if (DataChecker.isNull(buyerOID) || buyerOID.trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyer"));
        }
        if (DataChecker.isNull(workOrderOID) || workOrderOID.trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("workOrder"));
        }
        try ( Connection conn = ConnectionToDatabase.connect()) {
            this.startTransaction(conn);
            boolean isChanged = true;
            // TODO
            BaseModel previousObjectWorkOrder = this.baseBuilder.getObjectByOid(workOrderOID, conn);
            if (!((WorkOrderBuilder) this.baseBuilder).changeBuyer(workOrderOID, buyerOID, conn)) {
                isChanged = false;
            }
            BaseModel objectWorkOrder = this.baseBuilder.getObjectByOid(workOrderOID, conn);
            // write change to history
            try {
                ObjectMapper objectMapper = JsonMapper.builder()
                        .addModule(new JavaTimeModule())
                        .build();
                this.history.createNewObject(new History(History.Action.UPDATE, objectWorkOrder.getClass().getSimpleName().toLowerCase(), objectMapper.writeValueAsString(previousObjectWorkOrder), objectMapper.writeValueAsString(objectWorkOrder), LocalDateTime.now(), new User(this.getCurrentUserOID()), objectWorkOrder.getOid()), conn);
            } catch (JsonProcessingException ex) {
                logger.error(ex.toString());
            }

            if (isChanged) {
                this.endTransaction(conn);
            } else {
                this.rollback(conn);
            }
            return isChanged;
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public WorkOrder uploadFile(String workOrderOid, MultipartFile file) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            this.startTransaction(conn);
            WorkOrder workOrder = (WorkOrder) this.getObjectByOID(workOrderOid);

            // save file
            String filename = "workOrder_" + workOrder.getDateOfCreate().getYear() + "_" + workOrder.getDateOfCreate().getMonthValue() + "_" + workOrder.getDateOfCreate().getDayOfMonth() + "__" + workOrder.getNumber() + "_" + workOrder.getDateOfCreate().getYear() + "." + Helper.getFileExtension(file);
            File f = new File(WORK_ORDER_PDF_DIRECTORY);
            if (!(f.exists() && f.isDirectory())) {
                f.mkdir();
            }
            Path fileStorage = get(WORK_ORDER_PDF_DIRECTORY, filename).toAbsolutePath().normalize();
            copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);

            // if file is saved then add it to work order
            Pdf pdf = new Pdf();
            pdf.setUrl(filename);
            this.pdfBuilder.createNewObject(pdf, conn);
            boolean isChanged = ((WorkOrderBuilder) this.baseBuilder).assignPdf(workOrder, pdf, conn);
            if (isChanged) {
                this.endTransaction(conn);
            } else {
                this.rollback(conn);
            }
            return workOrder;
        } catch (IOException ex) {
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public File downloadFile(String workOrderOID) throws SException {
        WorkOrder workOrder = (WorkOrder) this.getObjectByOID(workOrderOID);
        if (workOrder.getPdf() == null || workOrder.getPdf().getUrl() == null) {
            throw new SException(UserMessage.getLocalizedMessage("fileNotFound"));
        }
        File file = new File(WORK_ORDER_PDF_DIRECTORY + "/" + workOrder.getPdf().getUrl());
        if (!file.exists()) {
            throw new SException(UserMessage.getLocalizedMessage("fileNotFound"));
        }
        return file;
    }
}
