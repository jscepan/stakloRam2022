package com.stakloram.application.models;

public class Image extends BaseModel {

    private String url;
    private String description;

    public Image(String oid) {
        super(oid);
    }

    public Image(Long id) {
        super(id);
    }

    public Image(String url, String description, String oid) {
        super(oid);
        this.url = url;
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Image{" + "url=" + url + ", description=" + description + '}';
    }
}
