package com.stakloram.backend.models;

public class WorkOrderItem extends BaseModel {

    private String description;
    private String uom;
    private double dimension1;
    private double dimension2;
    private double dimension3;
    private double quantity;
    private double sumQuantity;
    private String note;
    private boolean settled;

    public WorkOrderItem() {
    }

    public WorkOrderItem(String oid) {
        super(oid);
    }

    public WorkOrderItem(Long id) {
        super(id);
    }

    public WorkOrderItem(String description, String uom, double dimension1, double dimension2, double dimension3, double quantity, double sumQuantity, String note, boolean settled, String oid) {
        super(oid);
        this.description = description;
        this.uom = uom;
        this.dimension1 = dimension1;
        this.dimension2 = dimension2;
        this.dimension3 = dimension3;
        this.quantity = quantity;
        this.sumQuantity = sumQuantity;
        this.note = note;
        this.settled = settled;
    }

    public WorkOrderItem(String description, String uom, double dimension1, double dimension2, double dimension3, double quantity, double sumQuantity, String note, boolean settled, Long id) {
        super(id);
        this.description = description;
        this.uom = uom;
        this.dimension1 = dimension1;
        this.dimension2 = dimension2;
        this.dimension3 = dimension3;
        this.quantity = quantity;
        this.sumQuantity = sumQuantity;
        this.note = note;
        this.settled = settled;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
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

    public boolean isSettled() {
        return settled;
    }

    public void setSettled(boolean settled) {
        this.settled = settled;
    }

    @Override
    public String toString() {
        return "WorkOrderItem{" + "description=" + description + ", uom=" + uom + ", dimension1=" + dimension1 + ", dimension2=" + dimension2 + ", dimension3=" + dimension3 + ", quantity=" + quantity + ", sumQuantity=" + sumQuantity + ", note=" + note + ", settled=" + settled + '}';
    }
}
