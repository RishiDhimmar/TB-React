import jsPDF from "jspdf";

const handleDownloadPDF = (startTime, movieName, seatData, theater) => {
  const date = new Date(startTime).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const seats = [];
  seatData?.seats.map((seat) => {
    seats.push(seat.row + seat.column);
  });
  const hours = new Date(startTime).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log("download");
  const doc = new jsPDF();
  doc.setFont("Helvetica");
  doc.setFontSize(20);
  doc.text("Ticket Information", 105, 40, { align: "center" });

  doc.setFontSize(14);
  doc.text("Movie Title", 30, 60);
  doc.text(movieName, 100, 60);
  doc.text("Date", 30, 70);
  doc.text(date, 100, 70);
  doc.text("Time", 30, 80);
  doc.text(hours, 100, 80);
  doc.text("Theater", 30, 90);
  doc.text(theater, 100, 90);
  doc.text("Seats", 30, 100);
  doc.text(seats.join(', '), 100, 100);

  doc.save();
};

export default handleDownloadPDF;
