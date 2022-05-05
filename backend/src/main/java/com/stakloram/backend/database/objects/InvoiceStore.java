package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.util.Helper;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;

public class InvoiceStore extends ObjectStore {

    public InvoiceStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        this.tableName = "invoice";
    }

    @Override
    public Invoice createNewObjectToDatabase(BaseModel model) throws SQLException {
        Invoice object = (Invoice) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getType().name());
        st.setInt(++i, this.getInvoiceNumberForInvoice(object));
        st.setString(++i, object.getNumber());
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfCreate()));
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfTurnover()));
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfMaturity()));
        st.setString(++i, object.getPlaceOfIssue());
        st.setDouble(++i, object.getNetAmount());
        st.setDouble(++i, object.getVatAmount());
        st.setDouble(++i, object.getGrossAmount());
        st.setString(++i, object.getNumberOfCashBill());
        st.setString(++i, object.getCurrency());
        st.setString(++i, object.getCountry());
        st.setString(++i, object.getComment());
        st.setBoolean(++i, object.isDisabled());
        if (BaseModel.getIdFromOid(object.getAdvanceInvoiceOid()) == null) {
            st.setNull(++i, Types.INTEGER);
        } else {
            st.setLong(++i, BaseModel.getIdFromOid(object.getAdvanceInvoiceOid()));
        }
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
    public Invoice modifyObject(String oid, BaseModel model) throws SQLException {
        Invoice object = (Invoice) model;
        object.setOid(oid);
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_type=?,"
                + this.getTableName() + "_number=?,"
                + this.getTableName() + "_number_sign=?,"
                + this.getTableName() + "_date_of_create=?,"
                + this.getTableName() + "_date_of_turnover=?,"
                + this.getTableName() + "_date_of_maturity=?,"
                + this.getTableName() + "_place_of_issue=?,"
                + this.getTableName() + "_net_amount=?,"
                + this.getTableName() + "_vat_amount=?,"
                + this.getTableName() + "_gross_amount=?,"
                + this.getTableName() + "_number_of_cash_bill=?,"
                + this.getTableName() + "_currency=?,"
                + this.getTableName() + "_country=?,"
                + this.getTableName() + "_comment=?,"
                + this.getTableName() + "_disabled=?,"
                + this.getTableName() + "_advance_invoice_id=?,"
                + this.getTableName() + "_pre_invoice_id=?,"
                + this.getTableName() + "_buyer_buyer_id=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getType().name());
        st.setInt(++i, this.getInvoiceNumberForInvoice(object));
        st.setString(++i, object.getNumber());
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfCreate()));
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfTurnover()));
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfMaturity()));
        st.setString(++i, object.getPlaceOfIssue());
        st.setDouble(++i, object.getNetAmount());
        st.setDouble(++i, object.getVatAmount());
        st.setDouble(++i, object.getGrossAmount());
        st.setString(++i, object.getNumberOfCashBill());
        st.setString(++i, object.getCurrency());
        st.setString(++i, object.getCountry());
        st.setString(++i, object.getComment());
        st.setBoolean(++i, object.isDisabled());
        if (Invoice.getIdFromOid(object.getAdvanceInvoiceOid()) == null) {
            st.setNull(++i, Types.INTEGER);
        } else {
            st.setLong(++i, Invoice.getIdFromOid(object.getAdvanceInvoiceOid()));
        }
        if (Invoice.getIdFromOid(object.getPreInvoiceOid()) == null) {
            st.setNull(++i, Types.INTEGER);
        } else {
            st.setLong(++i, Invoice.getIdFromOid(object.getPreInvoiceOid()));
        }
        st.setLong(++i, object.getBuyer().getId());
        st.setLong(++i, Invoice.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
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
        object.setNetAmount(resultSet.getDouble(this.getTableName() + "_net_amount"));
        object.setVatAmount(resultSet.getDouble(this.getTableName() + "_vat_amount"));
        object.setGrossAmount(resultSet.getDouble(this.getTableName() + "_gross_amount"));
        object.setNumberOfCashBill(resultSet.getString(this.getTableName() + "_number_of_cash_bill"));
        object.setCurrency(resultSet.getString(this.getTableName() + "_currency"));
        object.setCountry(resultSet.getString(this.getTableName() + "_country"));
        object.setComment(resultSet.getString(this.getTableName() + "_comment"));
        object.setDisabled(resultSet.getBoolean(this.getTableName() + "_disabled"));
        if (resultSet.getLong(this.getTableName() + "_advance_invoice_id") == 0) {
            object.setAdvanceInvoiceOid(null);
        } else {
            object.setAdvanceInvoiceOid(BaseModel.getOidFromId(object, resultSet.getLong(this.getTableName() + "_advance_invoice_id")));
        }
        if (resultSet.getLong(this.getTableName() + "_pre_invoice_id") == 0) {
            object.setPreInvoiceOid(null);
        } else {
            object.setPreInvoiceOid(BaseModel.getOidFromId(object, resultSet.getLong(this.getTableName() + "_pre_invoice_id")));
        }
        object.setBuyer(new Buyer(resultSet.getLong(this.getTableName() + "_buyer_buyer_id")));
        return object;
    }

    public int getLastInvoiceNumber(Invoice.InvoiceType invoiceType, int year) throws SQLException {
        int lastInvoiceNumber = 0;
        Statement st = this.getConn().createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + ConnectionToDatabase.DATABASE_NAME + "." + this.tableName + " WHERE " + this.getPrimaryKey() + "=(SELECT MAX(invoice_number) FROM " + ConnectionToDatabase.DATABASE_NAME + "." + this.tableName + " WHERE invoice_type='" + invoiceType + "'  AND year(invoice_date_of_create)=" + year + ")");
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
