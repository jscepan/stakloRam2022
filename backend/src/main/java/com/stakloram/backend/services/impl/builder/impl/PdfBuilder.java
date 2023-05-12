package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.PdfStore;
import com.stakloram.backend.models.Image;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.Settings;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.util.DataChecker;
import com.stakloram.backend.util.Helper;
import java.io.File;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PdfBuilder extends BaseBuilder {

    public PdfBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new PdfStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("pdf_url");
    }

    public static String generateHtmlForWorkOrder(WorkOrder wo) {
        SettingsBuilder settingsBuilder = new SettingsBuilder();
        Settings settings = settingsBuilder.getSettings();
        File fileLogo = new File("company_logo.PNG");
        String url = "";
        try {
            url = fileLogo.toURI().toURL().toString();
        } catch (MalformedURLException ex) {
            Logger.getLogger(PdfBuilder.class.getName()).log(Level.SEVERE, null, ex);
        }
        String html = "";
        html += ("<!DOCTYPE html><html lang=\"sr\">");
        html += ("<head>");
        html += ("<meta charset=\"UTF-8\" />");
        html += ("<style>");
        html += (" .container {\n"
                + "	 display: flex;\n"
                + "	 font-size: 12px;\n"
                + "	 flex-direction: column;\n"
                + "	 font-family: Verdana;\n"
                + "	 color: #434349;\n"
                + "	 width: 100%;\n"
                + "	 height: 100%;\n"
                + "}\n"
                + " .container .header {\n"
                + "	 display: flex;\n"
                + "	 flex-direction: row;\n"
                + "}\n"
                + " .container .header .logo {\n"
                + "	 display: flex;\n"
                + "	 align-items: center;\n"
                + "	 position: relative;\n"
                + "}\n"
                + " .container .header .logo img {\n"
                + "	 height: 80px;\n"
                + "	 width: 300px;\n"
                + "	 position: absolute;\n"
                + "}\n"
                + " .container .header .company-heading {\n"
                + "	 display: flex;\n"
                + "	 flex-direction: column;\n"
                + "	 font-weight: 600;\n"
                + "	 padding: 20px;\n"
                + "	 font-size: 1.14em;\n"
                + "	 margin-left: 300px;\n"
                + "}\n"
                + " .container .header .company-heading .company-heading-title {\n"
                + "	 text-transform: uppercase;\n"
                + "}\n"
                + " .container .header .company-heading .company-heading-email {\n"
                + "	 margin-top: 20px;\n"
                + "}\n"
                + " .container .company-description {\n"
                + "	 text-align: center;\n"
                + "	 font-size: 0.8em;\n"
                + "}\n"
                + " .container .body-content {\n"
                + "	 border-top: 1px solid #747474;\n"
                + "	 width: 100%;\n"
                + "}\n"
                + " .container .body-content .heading table {\n"
                + "	 font-weight: 700;\n"
                + "}\n"
                + " .container .body-content .heading table tr .column1 {\n"
                + "	 width: 130px;\n"
                + "}\n"
                + " .container .body-content .heading table tr .column2 {\n"
                + "	 width: 260px;\n"
                + "}\n"
                + " .container .body-content .heading table tr .column3 {\n"
                + "	 width: 70px;\n"
                + "}\n"
                + " .container .body-content .heading table tr .column4 {\n"
                + "	 width: 120px;\n"
                + "}\n"
                + " .container .body-content .table {\n"
                + "	 border-collapse: collapse;\n"
                + "	 color: #000;\n"
                + "	 font-size: 1.14em;\n"
                + "}\n"
                + " .container .body-content .table tr {\n"
                + "	 border: 1px solid #000;\n"
                + "	 background-color: #fff;\n"
                + "	 -webkit-print-color-adjust: exact;\n"
                + "}\n"
                + " .container .body-content .table tr th {\n"
                + "	 font-weight: 600;\n"
                + "	 border: 1px solid #000;\n"
                + "}\n"
                + " .container .body-content .table tr td {\n"
                + "	 border: 1px solid #000;\n"
                + "	 padding: 0.25rem;\n"
                + "}\n"
                + " .container .body-content .table tr:nth-child(even) {\n"
                + "	 background-color: #f1f2f7;\n"
                + "	 -webkit-print-color-adjust: exact;\n"
                + "}\n"
                + " .container .body-content .note {\n"
                + "	 display: flex;\n"
                + "	 flex-direction: column;\n"
                + "	 margin-top: 20px;\n"
                + "}\n"
                + " .container .body-content .note .title {\n"
                + "	 font-weight: 600;\n"
                + "	 text-transform: uppercase;\n"
                + "}\n"
                + " .container .body-content .note .description {\n"
                + "	 font-size: 0.9em;\n"
                + "}\n"
                + " .container .body-content .images {\n"
                + "	 display: flex;\n"
                + "	 flex-direction: row;\n"
                + "	 flex-wrap: wrap;\n"
                + "	 flex-grow: 1;\n"
                + "	 justify-content: space-between;\n"
                + "}\n"
                + " .container .body-content .images .image {\n"
                + "	 object-fit: contain;\n"
                + "	 width: 350px;\n"
                + "}\n"
                + " .container .body-content .signature {\n"
                + "	 display: flex;\n"
                + "	 width: 100%;\n"
                + "	 margin-top: 20px;\n"
                + "	 justify-content: space-between;\n"
                + "}\n"
                + " .container .body-content .signature .signature-container {\n"
                + "	 display: flex;\n"
                + "	 flex-direction: column;\n"
                + "}\n"
                + " .container .body-content .signature .signature-container .signature-title {\n"
                + "	 margin-bottom: 20px;\n"
                + "	 text-align: center;\n"
                + "}\n"
                + " .container .body-content .signature .signature-container .signature-description {\n"
                + "	 width: 150px;\n"
                + "	 border-bottom: 1px solid #fff;\n"
                + "}\n"
                + " .right {\n"
                + "	 text-align: right;\n"
                + "}\n"
                + " ");
        html += ("</style>");
        html += ("</head>");
        html += ("<body>");
        html += ("<div class='container'>");
        html += ("<div class='header'>");
        html += ("<div class='logo'>");
        html += ("<img src='" + url + "' />");
        html += ("</div>");
        html += ("<div class='company-heading'>");
        html += ("<div class='company-heading-title'>" + settings.getWorkOrderHeadingLine1());
        html += ("</div>");
        html += ("<div class='company-heading-title'>" + settings.getWorkOrderHeadingLine2());
        html += ("</div>");
        html += ("<div class='company-heading-title'>" + settings.getWorkOrderHeadingLine3());
        html += ("</div>");
        html += ("<div class='company-heading-email'>" + UserMessage.getLocalizedMessage("email") + ": " + settings.getCompanyEmail());
        html += ("</div>");
        html += ("</div>");
        html += ("</div>");
        html += ("<div class='company-description'>" + settings.getWorkOrderCompanyDescription());
        html += ("</div>");
        html += ("<div class='body-content'>");
        html += ("<div class='heading'>");

        html += ("<table>");
        html += ("<tr>");
        html += ("<td class='column1'>" + UserMessage.getLocalizedMessage("orderer") + ":</td>");
        html += ("<td class='column2'>" + wo.getBuyer().getName() + "</td>");
        html += ("<td class='column3'>" + UserMessage.getLocalizedMessage("place") + ":</td>");
        html += ("<td class='column4'>" + wo.getPlaceOfIssue() + "</td>");
        html += ("</tr>");
        html += ("<tr>");
        html += ("<td class='column1'>" + UserMessage.getLocalizedMessage("forNeedsOf") + ":</td>");
        html += ("<td class='column2'>" + wo.getForPerson() + "</td>");
        html += ("<td class='column3'>" + UserMessage.getLocalizedMessage("descriptionOfWork") + ":</td>");
        html += ("<td class='column4'>" + wo.getDescription() + "</td>");
        html += ("</tr>");
        html += ("<tr>");
        html += ("<td class='column1'>" + UserMessage.getLocalizedMessage("workOrderNr") + ":</td>");
        html += ("<td class='column2'>" + Helper.getDisplayValueForWorkOrderNumber(wo) + "</td>");
        html += ("<td class='column3'>" + UserMessage.getLocalizedMessage("date") + ":</td>");
        html += ("<td class='column4'>" + Helper.getDisplayValueForWorkOrderDate(wo) + "</td>");
        html += ("</tr>");
        html += ("</table>");

        html += ("</div>");
        html += ("<div class='table-wrapper'>");

        html += ("<table class='table' style='text-align: right;'>");
        html += ("<tr>");
        html += ("<th>" + UserMessage.getLocalizedMessage("num") + "</th>");
        html += ("<th>" + UserMessage.getLocalizedMessage("typeOfGlassOrService") + "</th>");
        html += ("<th>" + UserMessage.getLocalizedMessage("width") + "</th>");
        html += ("<th>" + UserMessage.getLocalizedMessage("height") + "</th>");
        html += ("<th>" + UserMessage.getLocalizedMessage("pcs") + "</th>");
        html += ("<th>" + UserMessage.getLocalizedMessage("mm2") + "</th>");
        html += ("<th>" + UserMessage.getLocalizedMessage("note") + "</th>");
        html += ("</tr>");
        List<CellRowspan> xxx = generateTableForWorkOrderItems(wo);
        for (int i = 1; i <= wo.getWorkOrderItems().size(); i++) {
            html += ("<tr>");
            html += ("<td>" + i + "</td>");
            if (xxx.get(i - 1).displayCell) {
                html += ("<td rowspan='" + xxx.get(i - 1).rowspan + "'>" + wo.getWorkOrderItems().get(i - 1).getDescription() + "</td>");
            }
            html += ("<td>" + DataChecker.roundNumberAndGetDisplayValue(wo.getWorkOrderItems().get(i - 1).getDimension1(), 2) + "</td>");
            html += ("<td>" + DataChecker.roundNumberAndGetDisplayValue(wo.getWorkOrderItems().get(i - 1).getDimension2(), 2) + "</td>");
            html += ("<td>" + DataChecker.roundNumberAndGetDisplayValue(wo.getWorkOrderItems().get(i - 1).getQuantity(), 2) + "</td>");
            html += ("<td>" + DataChecker.roundNumberAndGetDisplayValue(wo.getWorkOrderItems().get(i - 1).getSumQuantity(), 3) + "</td>");
            html += ("<td>" + wo.getWorkOrderItems().get(i - 1).getNote() + "</td>");
            html += ("</tr>");
        }
        html += ("</table>");

        html += ("</div>");
        html += ("<div class='note'>");
        html += ("<div class='title'>" + UserMessage.getLocalizedMessage("notes") + ":");
        html += ("</div>");
        html += ("<div class='description'>" + wo.getNote());
        html += ("</div>");
        html += ("</div>");
        html += ("<div class='images'>");
        for (Image image : wo.getImages()) {
            html += ("<div>");
            html += ("<p>" + image.getDescription() + "</p>");
            html += ("<img class='image' src='" + getWorkOrderImageUrl(image) + "' />");
            html += ("</div>");
        }
        html += ("</div>");
        html += ("<div style='width:100%;'>");
        html += ("<table style='width:100%;margin-top:20px;'>");
        html += ("<tr>");
        html += ("<td style='width:150px;'>" + UserMessage.getLocalizedMessage("goodsGiveBy") + ":</td>");
        html += ("<td></td>");
        html += ("<td style='width:150px;'>" + UserMessage.getLocalizedMessage("goodsTakenBy") + ":</td>");
        html += ("</tr>");
        html += ("<tr>");
        html += ("<td style='width:150px;height:30px;border-bottom: 1px solid #000000;'></td>");
        html += ("<td></td>");
        html += ("<td style='width:150px;height:30px;border-bottom: 1px solid #000000;'></td>");
        html += ("</tr>");
        html += ("</table>");

        html += ("</div>");
        html += ("</div>");
        html += ("</div>");

        html += ("</body>");
        html += ("</html>");
        return html;
    }

    public static String getCompanyLogoUrl() {
        return "D:\\company_logo.PNG";
    }

    public static String getWorkOrderImageUrl(Image image) {
        return image.getUrl();
    }

    private static List<CellRowspan> generateTableForWorkOrderItems(WorkOrder workOrder) {
        List<CellRowspan> cellRowspan = new ArrayList<>();
        int rowspanCounter = 1;
        int indexOfLastForDisplay = 0;
        CellRowspan yy = new CellRowspan(rowspanCounter == 1, rowspanCounter);
        cellRowspan.add(yy);
        for (int i = 1; i < workOrder.getWorkOrderItems().size(); i++) {
            if (workOrder.getWorkOrderItems().get(i).getDescription().trim().equalsIgnoreCase(workOrder.getWorkOrderItems().get(i - 1).getDescription())) {
                rowspanCounter++;
            } else {
                rowspanCounter = 1;
                indexOfLastForDisplay = i;
            }
            cellRowspan.add(new CellRowspan(rowspanCounter == 1, rowspanCounter));
            cellRowspan.get(indexOfLastForDisplay).rowspan = rowspanCounter;
        }
        return cellRowspan;
    }

    static class CellRowspan {

        boolean displayCell;
        int rowspan;

        public CellRowspan(boolean displayCell, int rowspan) {
            this.displayCell = displayCell;
            this.rowspan = rowspan;
        }

        @Override
        public String toString() {
            return "CellRowspan{" + "displayCell=" + displayCell + ", rowspan=" + rowspan + '}';
        }
    }
}
