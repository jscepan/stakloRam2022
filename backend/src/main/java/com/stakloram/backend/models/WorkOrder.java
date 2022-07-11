package com.stakloram.backend.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class WorkOrder extends BaseModel {

    private int number;
    private LocalDate dateOfCreate;
    private String placeOfIssue;
    private String forPerson;
    private String description;
    private String note;
    private Buyer buyer;
    private List<WorkOrderItem> workOrderItems = new ArrayList<>();

    public WorkOrder() {
    }

    public WorkOrder(int number, LocalDate dateOfCreate, String placeOfIssue, String forPerson, String description, String note, Buyer buyer, String oid) {
        super(oid);
        this.number = number;
        this.dateOfCreate = dateOfCreate;
        this.placeOfIssue = placeOfIssue;
        this.forPerson = forPerson;
        this.description = description;
        this.note = note;
        this.buyer = buyer;
    }

    public WorkOrder(int number, LocalDate dateOfCreate, String placeOfIssue, String forPerson, String description, String note, Buyer buyer, Long id) {
        super(id);
        this.number = number;
        this.dateOfCreate = dateOfCreate;
        this.placeOfIssue = placeOfIssue;
        this.forPerson = forPerson;
        this.description = description;
        this.note = note;
        this.buyer = buyer;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public LocalDate getDateOfCreate() {
        return dateOfCreate;
    }

    public void setDateOfCreate(LocalDate dateOfCreate) {
        this.dateOfCreate = dateOfCreate;
    }

    public String getPlaceOfIssue() {
        return placeOfIssue;
    }

    public void setPlaceOfIssue(String placeOfIssue) {
        this.placeOfIssue = placeOfIssue;
    }

    public String getForPerson() {
        return forPerson;
    }

    public void setForPerson(String forPerson) {
        this.forPerson = forPerson;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    public List<WorkOrderItem> getWorkOrderItems() {
        return workOrderItems;
    }

    public void setWorkOrderItems(List<WorkOrderItem> workOrderItems) {
        this.workOrderItems = workOrderItems;
    }

    @Override
    public String toString() {
        return "WorkOrder{" + "number=" + number + ", dateOfCreate=" + dateOfCreate + ", placeOfIssue=" + placeOfIssue + ", forPerson=" + forPerson + ", description=" + description + ", note=" + note + ", buyer=" + buyer + '}';
    }
}
