import { useState } from "react";

function ImportContact() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImportClick = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const parsedData = JSON.parse(e.target.result);
        setData(parsedData);
        localStorage.setItem("importedData", JSON.stringify(parsedData));
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleImportClick}
        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Import Data
      </button>
      {/* Display imported data (if available) */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default ImportContact;
