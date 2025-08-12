import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/name");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !file) {
      alert("Please enter name and choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/name/image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Uploaded successfully!");
      setName("");
      setFile(null);
      fetchUsers();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ color: "red", textAlign: "center" }}>🚀 Upload Name + Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginBottom: "10px",
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: dragActive ? "2px dashed #ff4d4d" : "2px dashed #ccc",
            padding: "30px",
            marginBottom: "10px",
            textAlign: "center",
            borderRadius: "10px",
            backgroundColor: dragActive ? "#ffe6e6" : "#fafafa",
            cursor: "pointer",
            boxShadow: dragActive
              ? "0px 0px 10px rgba(255,0,0,0.4)"
              : "0px 0px 5px rgba(0,0,0,0.1)",
            transition: "0.3s",
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {file ? (
            <p style={{ color: "#ff4d4d" }}>📂 {file.name}</p>
          ) : (
            <p style={{ color: dragActive ? "#ff4d4d" : "#666" }}>
              Drag & drop an image here, or click to select
            </p>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            backgroundColor: loading ? "#ff9999" : "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          disabled={loading}
        >
          {loading ? "⏳ Uploading..." : "📤 Upload"}
        </button>
      </form>

      {loading && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          Please wait, uploading...
        </p>
      )}

      <hr />

      <h3 style={{ color: "red" }}>Uploaded Users</h3>
      {users.length === 0 ? (
        <p>No users uploaded yet.</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #eee",
              borderRadius: "8px",
              backgroundColor: "#fff8f8",
            }}
          >
            <strong style={{ color: "#ff4d4d" }}>{user.name}</strong>
            <br />
            <img
              src={user.imageUrl}
              alt={user.name}
              style={{
                width: "100px",
                borderRadius: "8px",
                marginTop: "5px",
                border: "2px solid #ff4d4d",
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default UploadForm;
