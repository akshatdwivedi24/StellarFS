import axios from "axios";

const API_URL = "http://localhost:8080/files"; // Backend URL

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(API_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const getFiles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching files:", error);
        throw error;
    }
};

export const deleteFile = async (fileName) => {
    try {
        const response = await axios.delete(`${API_URL}/${fileName}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
};
