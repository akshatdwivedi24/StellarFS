import React from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

const Home = () => {
    return (
        <div className="home-container">
            <FileUpload />
            <FileList />
        </div>
    );
};

export default Home;
