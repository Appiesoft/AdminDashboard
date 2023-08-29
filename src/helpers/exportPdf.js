import React, { useRef } from 'react';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
const exportPdf = (dataLists, headers, title) => {
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    let temArry = [];
    let pdfDataArry = [];

    for (let dataList of dataLists) {
        for (let header of headers) {
            temArry.push(dataList[header['key']])
        }
        pdfDataArry.push(temArry)
        temArry = [];
    }

    let content = {
        startY: 50,
        head: [headers.map(elt => elt.label)],
        body: pdfDataArry
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
}

export { exportPdf }
