/* eslint-disable react/prop-types */
import { useState } from "react";

const ExportContact = ({ userContact }) => {
  const [, setData] = useState(null);

  const handleExport = () => {
    if (userContact) {
      setData(userContact);
      downloadJSON(userContact, "myData.json");
    }
  };

  const downloadJSON = (data, filename) => {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
    >
      Export Contacts
    </button>
  );
};

export default ExportContact;
