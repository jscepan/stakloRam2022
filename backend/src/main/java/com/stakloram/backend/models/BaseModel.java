package com.stakloram.backend.models;

public abstract class BaseModel {

    private String oid;

    public BaseModel(String oid) {
        this.oid = oid;
    }

    public BaseModel(Long id) {
        this.oid = getOidFromId(this, id);
    }

    public String getOid() {
        return oid;
    }

    public Long getId() {
        return getIdFromOid(this.oid);
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    @Override
    public String toString() {
        return "BaseModel{" + "oid=" + oid + '}';
    }

    public static Long getIdFromOid(String oid) {
        if (oid == null || oid.isEmpty()) {
            return null;
        }
        String[] oids = oid.split(":");
        return Long.valueOf(oids[1]);
    }

    public static String getOidFromId(BaseModel object, Long id) {
        return object.getClass().getSimpleName().toLowerCase() + ":" + id;
    }

    public static String getOidFromId(Class T, Long id) {
        return T.getClass().getSimpleName().toLowerCase() + ":" + id;
    }
}
