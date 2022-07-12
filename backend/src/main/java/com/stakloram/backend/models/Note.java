package com.stakloram.backend.models;

public class Note extends BaseModel {

    private String name;
    private String description;

    public Note() {
    }

    public Note(String oid) {
        super(oid);
    }

    public Note(Long id) {
        super(id);
    }

    public Note(String name, String description, String oid) {
        super(oid);
        this.name = name;
        this.description = description;
    }

    public Note(String name, String description, Long id) {
        super(id);
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Note{" + "name=" + name + ", description=" + description + '}';
    }
}
