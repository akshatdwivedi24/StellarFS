import React, { useEffect, useState } from "react";
import axios from "axios";
import FileItem from "./FileItem";
import "./FileList.css";

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("http://localhost:8080/files");
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div className="file-list">
            <h2>Uploaded Files</h2>
            {files.length > 0 ? (
                files.map((file) => <FileItem key={file.fileName} file={file} />)
            ) : (
                <p>No files uploaded yet.</p>
            )}
        </div>
    );
};

export default FileList;
