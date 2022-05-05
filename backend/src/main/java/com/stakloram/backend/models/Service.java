package com.stakloram.backend.models;

import java.time.LocalDate;
import java.util.List;

public class Service extends BaseModel {

    private ServiceType type;
    private Long number;
    private LocalDate dateOfCreate;
    private ServiceStatus status;
    private String title;
    private String description;
    private Buyer buyer;
    private User currentUser;
    private String parentOid;
    private List<Service> descedants;
    private String invoiceItemOid;

    public Service(String oid) {
        super(oid);
    }

    public Service(Long id) {
        super(id);
    }

    public Service(ServiceType type, Long number, LocalDate dateOfCreate, ServiceStatus status, String title, String description, Buyer buyer, User currentUser, String parentOid, List<Service> descedants, String invoiceItemOid, String oid) {
        super(oid);
        this.type = type;
        this.number = number;
        this.dateOfCreate = dateOfCreate;
        this.status = status;
        this.title = title;
        this.description = description;
        this.buyer = buyer;
        this.currentUser = currentUser;
        this.parentOid = parentOid;
        this.descedants = descedants;
        this.invoiceItemOid = invoiceItemOid;
    }

    public ServiceType getType() {
        return type;
    }

    public void setType(ServiceType type) {
        this.type = type;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public LocalDate getDateOfCreate() {
        return dateOfCreate;
    }

    public void setDateOfCreate(LocalDate dateOfCreate) {
        this.dateOfCreate = dateOfCreate;
    }

    public ServiceStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceStatus status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        this.currentUser = currentUser;
    }

    public String getParentOid() {
        return parentOid;
    }

    public void setParentOid(String parentOid) {
        this.parentOid = parentOid;
    }

    public List<Service> getDescedants() {
        return descedants;
    }

    public void setDescedants(List<Service> descedants) {
        this.descedants = descedants;
    }

    public String getInvoiceItemOid() {
        return invoiceItemOid;
    }

    public void setInvoiceItemOid(String invoiceItemOid) {
        this.invoiceItemOid = invoiceItemOid;
    }

    @Override
    public String toString() {
        return "Service{" + "type=" + type + ", number=" + number + ", dateOfCreate=" + dateOfCreate + ", status=" + status + ", title=" + title + ", description=" + description + ", buyer=" + buyer + ", currentUser=" + currentUser + ", parentOid=" + parentOid + ", descedants=" + descedants + ", invoiceItemOid=" + invoiceItemOid + '}';
    }

    public enum ServiceStatus {
        OPEN, IN_PROGRESS, RESOLVED, CANCELED
    }

    public enum ServiceType {
        CASE, TASK, SUBTASK
    }
}
