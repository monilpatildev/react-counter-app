/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

function ImportContact({ onImport }) {
  const inputRef = useRef();

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let parsedData;

          if (fileExtension === "json") {
            parsedData = JSON.parse(e.target.result);
          } else if (fileExtension === "xlsx" || fileExtension === "xls") {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            parsedData = XLSX.utils.sheet_to_json(sheet);
          } else {
            throw new Error("Unsupported file type");
          }

          if (onImport) {
            onImport(parsedData);
          }
          toast.success("File imported successfully!");
        } catch (error) {
          toast.error(
            "Invalid file format! Please upload a valid JSON or Excel file."
          );
        }
      };

      if (fileExtension === "json") {
        reader.readAsText(selectedFile);
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        reader.readAsArrayBuffer(selectedFile);
      }

      event.target.value = "";
    } else {
      toast.error("No file selected!");
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <button
        onClick={handleClick}
      >
        Import Data
      <input
        type="file"
        accept=".json, .xlsx, .xls"
        ref={inputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
      </button>
    </div>
  );
}

export default ImportContact;
