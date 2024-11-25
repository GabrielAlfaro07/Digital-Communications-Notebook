import React from "react";
import { Assignment } from "../../services/assignmentsService";

const FileList: React.FC<{ documents: Assignment["documents"] }> = ({
  documents,
}) => {
  if (!documents || documents.length === 0) {
    return <p className="text-gray-500">No associated files</p>;
  }

  return (
    <ul className="list-disc pl-6 space-y-2">
      {documents.map((doc) => (
        <li key={doc.document_id}>
          <a
            href={doc.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
            download
          >
            {doc.file_type} - Download
          </a>{" "}
          |{" "}
          <a
            href={doc.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            Preview
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
