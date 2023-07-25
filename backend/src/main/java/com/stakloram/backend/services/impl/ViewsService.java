package com.stakloram.backend.services.impl;

import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.Debtor;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.ViewsBuilder;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ViewsService {

    public Logger logger = LoggerFactory.getLogger(ServiceModel.class);
    private final ViewsBuilder viewsBuilder = new ViewsBuilder();

    public ViewsService() {
    }

    public List<Debtor> getAllDebtors() throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return viewsBuilder.getAllDebtors(conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public Debtor getDebtor(String buyerOID) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return viewsBuilder.getDebtor(buyerOID, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }
}
