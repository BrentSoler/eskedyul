// @ts-nocheck
import jsPDF from "jspdf";
import "jspdf-autotable";
export default function exportPDF({ data }) {

    const userData = data.map((user) => ({
        "ID": user.id,
        "ROLE": user.role,
        "FIRST NAME": user.fname,
        "MIDDLE NAME": user.mname,
        "LAST NAME": user.lname,
        "SUFFIX": user.suffix,
        "SEX": user.sex,
        "MOBILE NO.": user.mobileNo,
        "PRESENT ADDRESS": user.presAdd,
        "PERMANENT ADDRESS": user.permAdd,
        "BRGY ID": user.brgyId,
        "ID TYPE": user.idType,
        "ID NO": user.idNo,
        "EMAIL": user.email
    }));

    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "USERS";
    const headers = [Object.keys(userData[0])];
    const tableData = userData.map(users => Object.values(users));

    let content = {
        startY: 50,
        horizontalPageBreak: true,
        horizontalPageBreakRepeat: 0,
        head: headers,
        body: tableData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Users Report.pdf")
}