package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.Income;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.util.Helper;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class IncomeStore extends ObjectStore {

    public IncomeStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        this.tableName = "income";
    }

    @Override
    public Income createNewObjectToDatabase(BaseModel model) throws SQLException {
        Income object = (Income) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDate()));
        st.setDouble(++i, object.getAmount());
        st.setString(++i, object.getComment());
        st.setString(++i, object.getBankStatementNumber());
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
    public Income modifyObject(String oid, BaseModel model) throws SQLException {
        Income object = (Income) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_date=?,"
                + this.getTableName() + "_amount=?,"
                + this.getTableName() + "_comment=?,"
                + this.getTableName() + "_bank_statement_number=?,"
                + this.getTableName() + "_buyer_buyer_id=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setDate(++i, java.sql.Date.valueOf(object.getDate()));
        st.setDouble(++i, object.getAmount());
        st.setString(++i, object.getComment());
        st.setString(++i, object.getBankStatementNumber());
        st.setLong(++i, object.getBuyer().getId());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public Income getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Income object = new Income(resultSet.getLong(this.getPrimaryKey()));
        object.setDate(resultSet.getDate(this.getTableName() + "_date").toLocalDate());
        object.setAmount(resultSet.getDouble(this.getTableName() + "_amount"));
        object.setComment(resultSet.getString(this.getTableName() + "_comment"));
        object.setBankStatementNumber(resultSet.getString(this.getTableName() + "_bank_statement_number"));
        object.setBuyer(new Buyer(resultSet.getLong(this.getTableName() + "_buyer_buyer_id")));
        return object;
    }
}
