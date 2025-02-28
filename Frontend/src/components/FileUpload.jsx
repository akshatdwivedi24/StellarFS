import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:8080/files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUploadStatus("✅ Upload successful!");
            alert(response.data);
            setSelectedFile(null);
        } catch (error) {
            console.error("Upload failed:", error);
            setUploadStatus("❌ Upload failed");
            alert("Failed to upload file");
        }
    };

    return (
        <div className="file-upload">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default FileUpload;
