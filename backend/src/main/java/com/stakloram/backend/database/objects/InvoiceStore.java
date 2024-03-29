package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ConnectionToDatabase;
import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.util.Helper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;

public class InvoiceStore extends ObjectStore {

    @Override
    public void setTableName() {
        this.tableName = "invoice";
    }

    @Override
    public Invoice createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        Invoice object = (Invoice) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getType().name());
        st.setInt(++i, this.getInvoiceNumberForInvoice(object));
        st.setString(++i, object.getNumber());
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfCreate()));
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfTurnover()));
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfMaturity()));
        st.setString(++i, object.getPlaceOfIssue());
        st.setString(++i, object.getMethodOfPayment());
        st.setString(++i, object.getComment());
        st.setDouble(++i, object.getNetAmount());
        st.setDouble(++i, object.getVatRate());
        st.setDouble(++i, object.getVatAmount());
        st.setDouble(++i, object.getGrossAmount());
        st.setString(++i, object.getNumberOfCashBill());
        st.setString(++i, object.getCurrency());
        st.setString(++i, object.getCountry());
        if (BaseModel.getIdFromOid(object.getAdvanceInvoiceOid()) == null) {
            st.setNull(++i, Types.INTEGER);
        } else {
            st.setLong(++i, BaseModel.getIdFromOid(object.getAdvanceInvoiceOid()));
        }
        st.setDouble(++i, object.getAdvancePayAmount());
        if (BaseModel.getIdFromOid(object.getPreInvoiceOid()) == null) {
            st.setNull(++i, Types.INTEGER);
        } else {
            st.setLong(++i, BaseModel.getIdFromOid(object.getPreInvoiceOid()));
        }
        st.setLong(++i, object.getBuyer().getId());
        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public Invoice modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        Invoice object = (Invoice) model;
        object.setOid(oid);
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_type=?,"
                + this.getTableName() + "_number=?,"
                + this.getTableName() + "_number_sign=?,"
                + this.getTableName() + "_date_of_create=?,"
                + this.getTableName() + "_date_of_turnover=?,"
                + this.getTableName() + "_date_of_maturity=?,"
                + this.getTableName() + "_place_of_issue=?,"
                + this.getTableName() + "_method_of_payment=?,"
                + this.getTableName() + "_comment=?,"
                + this.getTableName() + "_net_amount=?,"
                + this.getTableName() + "_vat_rate=?,"
                + this.getTableName() + "_vat_amount=?,"
                + this.getTableName() + "_gross_amount=?,"
                + this.getTableName() + "_number_of_cash_bill=?,"
                + this.getTableName() + "_currency=?,"
                + this.getTableName() + "_country=?,"
                + this.getTableName() + "_advance_pay_amount=? "
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getType().name());
        st.setInt(++i, this.getInvoiceNumberForInvoice(object));
        st.setString(++i, object.getNumber());
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfCreate()));
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfTurnover()));
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfMaturity()));
        st.setString(++i, object.getPlaceOfIssue());
        st.setString(++i, object.getMethodOfPayment());
        st.setString(++i, object.getComment());
        st.setDouble(++i, object.getNetAmount());
        st.setDouble(++i, object.getVatRate());
        st.setDouble(++i, object.getVatAmount());
        st.setDouble(++i, object.getGrossAmount());
        st.setString(++i, object.getNumberOfCashBill());
        st.setString(++i, object.getCurrency());
        st.setString(++i, object.getCountry());
        st.setDouble(++i, object.getAdvancePayAmount());
        st.setLong(++i, Invoice.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    public boolean changeBuyer(String oid, String buyerOID, Connection conn) throws SQLException {
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_buyer_buyer_id=? "
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setLong(++i, BaseModel.getIdFromOid(buyerOID));
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        return st.executeUpdate() > 0;
    }

    @Override
    public Invoice getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Invoice object = new Invoice(resultSet.getLong(this.getPrimaryKey()));
        object.setType(Invoice.InvoiceType.valueOf(resultSet.getString(this.getTableName() + "_type")));
        object.setNumber(resultSet.getString(this.getTableName() + "_number_sign"));
        object.setDateOfCreate(resultSet.getDate(this.getTableName() + "_date_of_create").toLocalDate());
        object.setDateOfTurnover(resultSet.getDate(this.getTableName() + "_date_of_turnover").toLocalDate());
        object.setDateOfMaturity(resultSet.getDate(this.getTableName() + "_date_of_maturity").toLocalDate());
        object.setPlaceOfIssue(resultSet.getString(this.getTableName() + "_place_of_issue"));
        object.setMethodOfPayment(resultSet.getString(this.getTableName() + "_method_of_payment"));
        object.setComment(resultSet.getString(this.getTableName() + "_comment"));
        object.setNetAmount(resultSet.getDouble(this.getTableName() + "_net_amount"));
        object.setVatRate(resultSet.getDouble(this.getTableName() + "_vat_rate"));
        object.setVatAmount(resultSet.getDouble(this.getTableName() + "_vat_amount"));
        object.setGrossAmount(resultSet.getDouble(this.getTableName() + "_gross_amount"));
        object.setNumberOfCashBill(resultSet.getString(this.getTableName() + "_number_of_cash_bill"));
        object.setCurrency(resultSet.getString(this.getTableName() + "_currency"));
        object.setCountry(resultSet.getString(this.getTableName() + "_country"));
        if (resultSet.getLong(this.getTableName() + "_advance_invoice_id") == 0) {
            object.setAdvanceInvoiceOid(null);
        } else {
            object.setAdvanceInvoiceOid(BaseModel.getOidFromId(object, resultSet.getLong(this.getTableName() + "_advance_invoice_id")));
        }
        object.setAdvancePayAmount(resultSet.getDouble(this.getTableName() + "_advance_pay_amount"));
        if (resultSet.getLong(this.getTableName() + "_pre_invoice_id") == 0) {
            object.setPreInvoiceOid(null);
        } else {
            object.setPreInvoiceOid(BaseModel.getOidFromId(object, resultSet.getLong(this.getTableName() + "_pre_invoice_id")));
        }
        object.setBuyer(new Buyer(resultSet.getLong(this.getTableName() + "_buyer_buyer_id")));
        return object;
    }

    public int getLastInvoiceNumber(Invoice.InvoiceType invoiceType, int year, Connection conn) throws SQLException, SException {
        int lastInvoiceNumber = 0;
        Statement st = conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + DATABASE_NAME + "." + this.tableName + " WHERE invoice_number=(SELECT MAX(invoice_number) FROM " + DATABASE_NAME + "." + this.tableName + " WHERE invoice_type='" + invoiceType + "'  AND year(invoice_date_of_create)=" + year + ") AND invoice_type='" + invoiceType + "'  AND year(invoice_date_of_create)=" + year);
        while (resultSet.next()) {
            lastInvoiceNumber = resultSet.getInt(this.getTableName() + "_number");
        }
        return lastInvoiceNumber;
    }

    private int getInvoiceNumberForInvoice(Invoice invoice) {
        String num = this.getNumeric(invoice.getNumber());
        if (num != null && num.length() > 0) {
            return Integer.valueOf(num);
        }
        return 0;
    }

    private String getNumeric(String str) {
        String response = "";
        for (char c : str.toCharArray()) {
            if (!Character.isDigit(c)) {
                break;
            } else {
                response += c;
            }
        }
        return response;
    }
}
