/* eslint-disable react/prop-types */
import * as XLSX from "xlsx";
import { getLocalStorage } from "../utils/manageStorage";
import { toast } from "react-toastify";

const ExportContact = ({ userID }) => {
    const handleExport = () => {
      
      const storedContacts = getLocalStorage("contacts");
      const filteredContacts = storedContacts.filter(
        (contact) => contact.refId === userID
      );

      if (filteredContacts.length > 0) {
        downloadExcel(filteredContacts, "Contacts.xlsx");
      } else {
        toast.error("No contacts available to export.");
      }
    };

    const downloadExcel = (data, filename) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
      XLSX.writeFile(workbook, filename);
    };

  return (
    <button
      onClick={handleExport}

    >
      Export Contacts
    </button>
  );
};

export default ExportContact;
