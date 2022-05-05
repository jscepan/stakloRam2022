package com.stakloram.backend.models;

public class Role extends BaseModel {

    private String name;

    public Role(String oid) {
        super(oid);
    }

    public Role(Long id) {
        super(id);
    }

    public Role(String name, String oid) {
        super(oid);
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Role{" + "name=" + name + '}';
    }
}
