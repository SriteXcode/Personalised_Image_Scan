import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speedKBs, setSpeedKBs] = useState(0);
  const [eta, setEta] = useState("Calculating...");
  const [indexFile, setIndexFile] = useState(null); // main image

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://personalised-image-scan.onrender.com/api/name");
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
    if (!name || files.length === 0) {
      alert("Please enter name and choose files");
      return;
    }
   
    setProgress(0);
    setSpeedKBs(0);
    setEta("Calculating...");
    setLoading(true);

    const totalBytes = files.reduce((acc, file) => acc + file.size, 0);
    let uploadedBytes = 0;
    const startTime = Date.now();

    try {
      await Promise.all(
        files.map((file) => {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("file", file);

          return axios.post(
            "https://personalised-image-scan.onrender.com/api/name/image",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: (progressEvent) => {
                uploadedBytes += progressEvent.loaded;
                const percent = Math.round((uploadedBytes * 100) / totalBytes);
                setProgress(percent);

                const elapsedTime = (Date.now() - startTime) / 1000;
                const speed = uploadedBytes / 1024 / elapsedTime;
                setSpeedKBs(speed.toFixed(2));

                const remainingBytes = totalBytes - uploadedBytes;
                const remainingSeconds = remainingBytes / (speed * 1024);
                setEta(
                  remainingSeconds > 60
                    ? `${Math.ceil(remainingSeconds / 60)} min`
                    : `${Math.ceil(remainingSeconds)} sec`
                );
              },
            }
          );
        })
      );

      alert("All uploads finished!");
      setName("");
      setFiles([]);
      setIndexFile(null);
      fetchUsers();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };

  const getProgressColor = (percent) => {
    const hue = percent * 1.2;
    return `hsl(${hue}, 100%, 40%)`;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ color: "red", textAlign: "center" }}>🚀 Upload Files</h2>
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
          }}
        />

        {/* Drag & Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            marginBottom: "10px",
            textAlign: "center",
            borderRadius: "10px",
            backgroundColor: "#fafafa",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {files.length > 0 ? (
            <p>{files.length} file(s) selected</p>
          ) : (
            <p>Drag & drop files here or click to select</p>
          )}
        </div>

        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Preview Section */}
        {files.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            {files.map((file) => (
              <div key={file.name} style={{ marginBottom: "10px" }}>
                {file.type.startsWith("image/") && (
                  <>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: "100px", borderRadius: "6px" }}
                    />

                  </>
                )}
                {file.type.startsWith("video/") && (
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    style={{ width: "200px", borderRadius: "6px" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            width: "100%",
            fontWeight: "bold",
          }}
          disabled={loading}
        >
          {loading ? "⏳ Uploading..." : "📤 Upload"}
        </button>
      </form>

      {/* Progress Display */}
      {loading && (
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              height: "20px",
              backgroundColor: "#ddd",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                backgroundColor: getProgressColor(progress),
                transition: "width 0.2s ease, background-color 0.2s ease",
              }}
            />
          </div>
          <p>
            {progress}% – {speedKBs} KB/s – ETA: {eta}
          </p>
        </div>
      )}

      <hr />
      <h3 style={{ color: "red" }}>Uploaded Users</h3>
      {users.length === 0 ? (
        <p>No users uploaded yet.</p>
      ) : (
        users.map((user) => (
          <div key={user._id} style={{ marginBottom: "15px" }}>
            <strong>{user.name}</strong>
            <br />
            <img src={user.imageUrl} alt={user.name} width="100" />
          </div>
        ))
      )}
    </div>
  );
};

export default UploadForm;
