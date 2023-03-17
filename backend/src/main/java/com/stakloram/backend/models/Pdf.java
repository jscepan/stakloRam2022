package com.stakloram.backend.models;

public class Pdf extends BaseModel {

    private String url;

    public Pdf() {
    }

    public Pdf(String oid) {
        super(oid);
    }

    public Pdf(Long id) {
        super(id);
    }

    public Pdf(String url, String oid) {
        super(oid);
        this.url = url;
    }

    public Pdf(String url, Long id) {
        super(id);
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Pdf{" + "url=" + url + '}';
    }

}
