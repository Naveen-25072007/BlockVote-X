import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ========================================
// Export Results to PDF
// ========================================
export const exportResultsPDF = (elections) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("BlockVote X", 14, 18);

  doc.setFontSize(14);
  doc.text("Election Results Report", 14, 28);

  let y = 40;

  elections.forEach((election) => {
    doc.setFontSize(16);
    doc.text(election.title, 14, y);

    y += 8;

    doc.setFontSize(11);
    doc.text(election.description || "", 14, y);

    y += 10;

    const tableData = election.candidates.map((candidate) => [
      candidate.name,
      candidate.party,
      candidate.votes,
    ]);

    autoTable(doc, {
      startY: y,
      head: [["Candidate", "Party", "Votes"]],
      body: tableData,
      theme: "grid",
      styles: {
        halign: "center",
      },
      headStyles: {
        fillColor: [6, 182, 212],
      },
    });

    y = doc.lastAutoTable.finalY + 18;
  });

  doc.save("BlockVoteX_Election_Results.pdf");
};

// ========================================
// Export Results to Excel
// ========================================
export const exportResultsExcel = (elections) => {

  const rows = [];

  elections.forEach((election) => {

    election.candidates.forEach((candidate) => {

      rows.push({
        Election: election.title,
        Candidate: candidate.name,
        Party: candidate.party,
        Votes: candidate.votes,
      });

    });

  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Election Results"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, "BlockVoteX_Election_Results.xlsx");
};