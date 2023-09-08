/* eslint-disable react/prop-types */
import jsPDF from "jspdf";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { FaFilePdf, FaFileCsv, FaRegFileExcel } from "react-icons/fa";
import { CSVLink } from "react-csv";

const ExportFile = ({ dataExport, fileName }) => {
  const Export2Pdf = () => {
    const doc = new jsPDF("landscape");
    let yOffset = 20;
    let pageNow = 1;

    doc.setFontSize(11);

    // Judul Kolom
    doc.text("No", 10, 10);
    doc.text("Username", 20, 10);
    doc.text("Transaksi", 70, 10);
    doc.text("Saldo", 120, 10);
    doc.text("Kategori", 140, 10);
    doc.text("Tipe", 160, 10);
    doc.text("Status", 200, 10);
    doc.text("No Ref", 218, 10);
    // Garis Horizontal
    doc.line(5, yOffset - 17, 300, yOffset - 17);
    doc.line(5, yOffset - 7, 300, yOffset - 7);
    // Tambahkan garis vertikal
    doc.line(5, yOffset - 17, 5, yOffset - 17 + 10);
    doc.line(17, yOffset - 17, 17, yOffset - 17 + 10);
    doc.line(67, yOffset - 17, 67, yOffset - 17 + 10);
    doc.line(118, yOffset - 17, 118, yOffset - 17 + 10);
    doc.line(137, yOffset - 17, 137, yOffset - 17 + 10);
    doc.line(197, yOffset - 17, 197, yOffset - 17 + 10);
    doc.line(215, yOffset - 17, 215, yOffset - 17 + 10);

    dataExport.forEach((item, index) => {
      let number = index + 1;
      // ukuran halaman atau elemen yang sesuai
      const elementHeight = 20; // Misalnya, setinggi 20 unit
      const nextPageOffset = yOffset + elementHeight;

      if (nextPageOffset > doc.internal.pageSize.height) {
        doc.setPage(pageNow);
        doc.text(
          `Page ${pageNow}`,
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 10
        );
        doc.addPage();
        // Judul Kolom
        doc.text("No", 10, 10);
        doc.text("Username", 20, 10);
        doc.text("Transaksi", 70, 10);
        doc.text("Saldo", 120, 10);
        doc.text("Kategori", 140, 10);
        doc.text("Tipe", 170, 10);
        doc.text("Status", 200, 10);
        doc.text("No Ref", 230, 10);
        // Garis Horizontal
        doc.line(5, elementHeight - 7, 300, elementHeight - 7);
        doc.line(5, elementHeight - 17, 300, elementHeight - 17);
        // Tambahkan garis vertikal
        doc.line(5, elementHeight - 17, 5, elementHeight - 17 + 10);
        doc.line(17, elementHeight - 17, 17, elementHeight - 17 + 10);
        doc.line(67, elementHeight - 17, 67, elementHeight - 17 + 10);
        doc.line(118, elementHeight - 17, 118, elementHeight - 17 + 10);
        doc.line(137, elementHeight - 17, 137, elementHeight - 17 + 10);
        doc.line(197, elementHeight - 17, 197, elementHeight - 17 + 10);
        doc.line(215, elementHeight - 17, 215, elementHeight - 17 + 10);
        yOffset = 20;
        pageNow++;
      }

      doc.text(number.toString(), 10, yOffset);
      doc.text(item.user.name, 20, yOffset);
      doc.text(
        item.transaction_name === "MOBILE LEGENDS BANG BANG 5 DIAMONDS"
          ? "MLBB 5D"
          : item.transaction_name === "MOBILE LEGENDS BANG BANG 12 DIAMONDS"
          ? "MLBB 12D"
          : item.transaction_name,
        70,
        yOffset
      );
      doc.text(item.amount.toString(), 120, yOffset);
      doc.text(item.category, 140, yOffset);
      doc.text(
        item.type === 1
          ? "TopUp & Tarik Saldo"
          : item.type === 2
          ? "Transfer Saldo"
          : item.type === 3
          ? "Terima Pembayaran"
          : item.type === 4
          ? "IRS(Pulsa)"
          : item.type === 5
          ? "IRS(PLN)"
          : item.type === 6
          ? "IRS(E-Wallet)"
          : item.type === 7
          ? "IRS(Voucer Game)"
          : item.type === 8
          ? "Bayar Kuliah"
          : "Tipe Tidak Dikenali",
        160,
        yOffset
      );
      doc.text(
        item.status === "1"
          ? "Success"
          : item.status === "2"
          ? "Pending"
          : "Failed",
        199,
        yOffset
      );
      doc.text(item.no_ref, 218, yOffset);
      // Garis horizontal
      doc.line(5, yOffset + 3, 300, yOffset + 3);

      // Garis vertikal
      doc.line(5, yOffset - 7, 5, yOffset - 7 + 10);
      doc.line(17, yOffset - 7, 17, yOffset - 7 + 10);
      doc.line(67, yOffset - 7, 67, yOffset - 7 + 10);
      doc.line(118, yOffset - 7, 118, yOffset - 7 + 10);
      doc.line(137, yOffset - 7, 137, yOffset - 7 + 10);
      doc.line(197, yOffset - 7, 197, yOffset - 7 + 10);
      doc.line(215, yOffset - 7, 215, yOffset - 7 + 10);
      yOffset += 10;
    });

    doc.setPage(pageNow);
    doc.text(
      `Page ${pageNow}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 10
    );

    doc.save(`Data ${fileName}.pdf`);
  };

  const Export2Excel = () => {
    const ws = XLSX.utils.json_to_sheet(dataExport);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, `Data ${fileName}` + ".xlsx");
  };

  return (
    <div className="flex gap-1">
      <button
        className="btn btn-sm btn-error text-white shadow-md"
        onClick={Export2Pdf}>
        <FaFilePdf />
        PDF
      </button>
      <CSVLink data={dataExport} filename={`Data ${fileName}.csv`}>
        <button className="btn btn-sm btn-info text-white shadow-md">
          <FaFileCsv />
          CSV
        </button>
      </CSVLink>
      <button
        className="btn btn-sm btn-success text-white shadow-md"
        onClick={Export2Excel}>
        <FaRegFileExcel />
        Excel
      </button>
    </div>
  );
};

export default ExportFile;
