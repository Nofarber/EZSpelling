import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import NameForm from "./NameForm";
import MyDocument from "./MyDocument";

const PDF = () => {
  const [pdfData, setPdfData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (data) => {
    setPdfData(data);
    setShowPreview(false);
  };

  const handlePreviewButtonClick = () => {
    setShowPreview(true);
  };

  return (
    <div dir="rtl" style={{ margin: "20px" }}>
      <NameForm onSubmit={handleFormSubmit} />
      {pdfData && !showPreview && (
        <button
          style={{ marginTop: "20px" }}
          onClick={handlePreviewButtonClick}
        >
          הצג מסמך
        </button>
      )}
      {showPreview && (
        <div
          style={{
            border: "1px solid black",
            margin: "20px",
            padding: "20px",
          }}
        >
          <h2>PDF תצוגת</h2>
          <PDFViewer width="500" height="400">
            <MyDocument formData={pdfData} />
          </PDFViewer>
          <p></p>
          <PDFDownloadLink
            document={<MyDocument formData={pdfData} />}
            fileName="מחוייבות_אישית.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "...טוען" : "הורד מסמך"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default PDF;
