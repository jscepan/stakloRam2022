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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

        StringBuffer html = new StringBuffer();
        html.append("<!DOCTYPE html><html lang=\"sr\">");
        html.append("<head>");
        html.append("<style>");
        html.append(".container {\n"
                + "	 font-size: 14px;"
                + "	 font-family: \"Open Sans\", sans-serif;"
                + "	 color: #434349;"
                + "	 display: flex;\n"
                + "	 flex-direction: column;\n"
                + "	 width: 100%;\n"
                + "	 height: 100%;\n"
                + "}\n"
                + " .container .header {\n"
                + "	 display: flex;\n"
                + "}\n"
                + " .container .header .logo {\n"
                + "	 display: flex;\n"
                + "	 align-items: center;\n"
                + "	 height: 100%;\n"
                + "}\n"
                + " .container .header .logo img {\n"
                + "	 height: 80px;\n"
                + "	 width: 300px;\n"
                + "}\n"
                + " .container .header .heading {\n"
                + "	 display: flex;\n"
                + "	 flex-direction: column;\n"
                + "	 font-weight: 600;\n"
                + "	 padding: 20px;\n"
                + "	 font-size: 1.14em;\n"
                + "}\n"
                + " .container .header .heading .title {\n"
                + "	 text-transform: uppercase;\n"
                + "}\n"
                + " .container .header .heading .email {\n"
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
                + "	 font-size: 16px;\n"
                + "}\n"
                + " .container .body-content .table tr {\n"
                + "	 border: 1px solid #000;\n"
                + "	 background-color: #fff;\n"
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
                + " .container .body-content .signature .signature-container .title {\n"
                + "	 margin-bottom: 20px;\n"
                + "	 text-align: center;\n"
                + "}\n"
                + " .container .body-content .signature .signature-container .description {\n"
                + "	 width: 150px;\n"
                + "	 border-bottom: 1px solid #000;\n"
                + "}\n");
        html.append("</style>");
        html.append("</head>");
        html.append("<body>");
        html.append("<div class='container'>");
        html.append("<div class='header'>");
        html.append("<div class='logo'>");
        html.append("<img src='" + getCompanyLogoUrl() + "' />");
        html.append("</div>");
        html.append("<div class='heading'>");
        html.append("<div class='title'>" + settings.getWorkOrderHeadingLine1());
        html.append("</div>");
        html.append("<div class='title'>" + settings.getWorkOrderHeadingLine2());
        html.append("</div>");
        html.append("<div class='title'>" + settings.getWorkOrderHeadingLine3());
        html.append("</div>");
        html.append("<div class='email'>" + UserMessage.getLocalizedMessage("place") + ": " + settings.getCompanyEmail());
        html.append("</div>");
        html.append("</div>");
        html.append("</div>");
        html.append("<div class='company-description'>" + settings.getWorkOrderCompanyDescription());
        html.append("</div>");
        html.append("<div class='body-content'>");
        html.append("<div class='heading'>");

        html.append("<table>");
        html.append("<tr>");
        html.append("<td>" + UserMessage.getLocalizedMessage("orderer") + ":</td>");
        html.append("<td>" + wo.getBuyer().getName() + "</td>");
        html.append("<td>" + UserMessage.getLocalizedMessage("place") + ":</td>");
        html.append("<td>" + wo.getPlaceOfIssue() + "</td>");
        html.append("</tr>");
        html.append("<tr>");
        html.append("<td>" + UserMessage.getLocalizedMessage("forNeedsOf") + ":</td>");
        html.append("<td>" + wo.getForPerson() + "</td>");
        html.append("<td>" + UserMessage.getLocalizedMessage("descriptionOfWork") + ":</td>");
        html.append("<td>" + wo.getDescription() + "</td>");
        html.append("</tr>");
        html.append("<tr>");
        html.append("<td>" + UserMessage.getLocalizedMessage("workOrderNr") + ":</td>");
        html.append("<td>" + Helper.getDisplayValueForWorkOrderNumber(wo) + "</td>");
        html.append("<td>" + UserMessage.getLocalizedMessage("date") + ":</td>");
        html.append("<td>" + Helper.getDisplayValueForWorkOrderDate(wo) + "</td>");
        html.append("</tr>");
        html.append("</table>");

        html.append("</div>");
        html.append("<div class='table-wrapper'>");

        html.append("<table class='table' style='text-align: end;'>");
        html.append("<tr>");
        html.append("<th>" + UserMessage.getLocalizedMessage("num") + "</th>");
        html.append("<th>" + UserMessage.getLocalizedMessage("typeOfGlassOrService") + "</th>");
        html.append("<th>" + UserMessage.getLocalizedMessage("width") + "</th>");
        html.append("<th>" + UserMessage.getLocalizedMessage("height") + "</th>");
        html.append("<th>" + UserMessage.getLocalizedMessage("pcs") + "</th>");
        html.append("<th>" + UserMessage.getLocalizedMessage("mm2") + "</th>");
        html.append("<th>" + UserMessage.getLocalizedMessage("note") + "</th>");
        html.append("</tr>");
        List<CellRowspan> xxx = generateTableForWorkOrderItems(wo);
        for (int i = 1; i <= wo.getWorkOrderItems().size(); i++) {
            html.append("<tr>");
            html.append("<td style='text-align: end;'>" + i + "</td>");
            if (xxx.get(i - 1).displayCell) {
                html.append("<td style='text-align: end;' rowspan='" + xxx.get(i - 1).rowspan + "'>" + wo.getWorkOrderItems().get(i - 1).getDescription() + "</td>");
            }
            html.append("<td style='text-align: end;'>" + DataChecker.roundNumberAndGetDisplayValue(wo.getWorkOrderItems().get(i - 1).getDimension1(), 2) + "</td>");
            html.append("<td style='text-align: end;'>" + DataChecker.roundNumberAndGetDisplayValue(wo.getWorkOrderItems().get(i - 1).getDimension2(), 2) + "</td>");
            html.append("<td style='text-align: end;'>" + DataChecker.roundNumberAndGetDisplayValue(wo.getWorkOrderItems().get(i - 1).getQuantity(), 2) + "</td>");
            html.append("<td style='text-align: end;'>" + DataChecker.roundNumberAndGetDisplayValue(wo.getWorkOrderItems().get(i - 1).getSumQuantity(), 3) + "</td>");
            html.append("<td style='text-align: end;'>" + wo.getWorkOrderItems().get(i - 1).getNote() + "</td>");
            html.append("</tr>");
        }
        html.append("</table>");

        html.append("</div>");
        html.append("<div class='note'>");
        html.append("<div class='title'>" + UserMessage.getLocalizedMessage("notes") + ":");
        html.append("</div>");
        html.append("<div class='description'>" + wo.getNote());
        html.append("</div>");
        html.append("</div>");
        html.append("<div class='images'>");
        for (Image image : wo.getImages()) {
            html.append("<div>");
            html.append("<p>" + image.getDescription() + "</p>");
            html.append("<img class='image' src='" + getWorkOrderImageUrl(image) + "' />");
            html.append("</div>");
        }
        html.append("</div>");
        html.append("<div style='width:100%;'>");
        html.append("<table style='width:100%;margin-top:20px;'>");
        html.append("<tr>");
        html.append("<td style='width:150px;'>" + UserMessage.getLocalizedMessage("goodsGiveBy") + ":</td>");
        html.append("<td></td>");
        html.append("<td style='width:150px;'>" + UserMessage.getLocalizedMessage("goodsTakenBy") + ":</td>");
        html.append("</tr>");
        html.append("<tr>");
        html.append("<td style='width:150px;height:30px;border-bottom: 1px solid #000000;'></td>");
        html.append("<td></td>");
        html.append("<td style='width:150px;height:30px;border-bottom: 1px solid #000000;'></td>");
        html.append("</tr>");
        html.append("</table>");

        html.append("</div>");
        html.append("</div>");
        html.append("</div>");

        html.append("</body>");
        html.append("</html>");
        return html.toString();
    }

    public static String getCompanyLogoUrl() {
        return "";// "D:\\StakloRam\\stakloRam2022\\backend\\company_logo.PNG";
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
            return "Xxxx{" + "displayCell=" + displayCell + ", rowspan=" + rowspan + '}';
        }
    }
}
