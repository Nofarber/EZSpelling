import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import NameForm from "./NameForm";
import MyDocument from "./MyDocument";

const PDF = ({info}) => {
  const [ggg, setPdfData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewButtonClick = () => {
    setShowPreview(true);
  };

  return (
    <div dir="rtl" style={{ margin: "20px" }}>
      <button onClick={()=>console.log(info)}>log</button>
      {info && !showPreview && (
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
            <MyDocument formData={info} />
          </PDFViewer>
          <p></p>
          <PDFDownloadLink
            document={<MyDocument formData={info} />}
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
