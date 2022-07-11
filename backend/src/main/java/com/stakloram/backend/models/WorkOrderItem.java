package com.stakloram.backend.models;

public class WorkOrderItem extends BaseModel {

    private String description;
    private double dimension1;
    private double dimension2;
    private double dimension3;
    private double quantity;
    private double sumQuantity;
    private String note;
    private Product product;
    private boolean settled;

    public WorkOrderItem() {
    }

    public WorkOrderItem(String description, double dimension1, double dimension2, double dimension3, double quantity, double sumQuantity, String note, Product product, boolean settled, String oid) {
        super(oid);
        this.description = description;
        this.dimension1 = dimension1;
        this.dimension2 = dimension2;
        this.dimension3 = dimension3;
        this.quantity = quantity;
        this.sumQuantity = sumQuantity;
        this.note = note;
        this.product = product;
        this.settled = settled;
    }

    public WorkOrderItem(String description, double dimension1, double dimension2, double dimension3, double quantity, double sumQuantity, String note, Product product, boolean settled, Long id) {
        super(id);
        this.description = description;
        this.dimension1 = dimension1;
        this.dimension2 = dimension2;
        this.dimension3 = dimension3;
        this.quantity = quantity;
        this.sumQuantity = sumQuantity;
        this.note = note;
        this.product = product;
        this.settled = settled;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getDimension1() {
        return dimension1;
    }

    public void setDimension1(double dimension1) {
        this.dimension1 = dimension1;
    }

    public double getDimension2() {
        return dimension2;
    }

    public void setDimension2(double dimension2) {
        this.dimension2 = dimension2;
    }

    public double getDimension3() {
        return dimension3;
    }

    public void setDimension3(double dimension3) {
        this.dimension3 = dimension3;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public double getSumQuantity() {
        return sumQuantity;
    }

    public void setSumQuantity(double sumQuantity) {
        this.sumQuantity = sumQuantity;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public boolean isSettled() {
        return settled;
    }

    public void setSettled(boolean settled) {
        this.settled = settled;
    }

    @Override
    public String toString() {
        return "WorkOrderItem{" + "description=" + description + ", dimension1=" + dimension1 + ", dimension2=" + dimension2 + ", dimension3=" + dimension3 + ", quantity=" + quantity + ", sumQuantity=" + sumQuantity + ", note=" + note + ", product=" + product + ", settled=" + settled + '}';
    }
}
