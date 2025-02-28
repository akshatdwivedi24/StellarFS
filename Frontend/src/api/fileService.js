import axios from "axios";

const API_URL = "http://localhost:8080/files";

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error.response?.data || error.message);
        throw error;
    }
};

