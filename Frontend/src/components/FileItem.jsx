import React from "react";
import axios from "axios";
import "./FileItem.css";

const FileItem = ({ file }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/files/${file.fileName}`);
            alert(`File deleted: ${file.fileName}`);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    return (
        <div className="file-item">
            <span>{file.fileName} ({(file.fileSize / 1024).toFixed(2)} KB)</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default FileItem;
