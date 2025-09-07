import { useState, useEffect } from "react";
import axios from "axios";

const AdminEditUpload = ({ orderId, onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing edited files
  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExistingFiles(data.editedFiles || []);
      } catch (error) {
        console.error("Failed to fetch existing files", error);
      }
    };

    fetchExisting();
  }, [orderId]);

  // Generate previews when new files selected
  useEffect(() => {
    if (!files || !files.length) {
      setPreviews([]);
      return;
    }

    const objectUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(objectUrls);

    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files.length) return alert("Select at least one file");

    const formData = new FormData();
    for (let file of files) {
      formData.append("editedFiles", file);
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/upload-edited`,
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Edited files uploaded successfully!");
      onUploadSuccess(data);
      setFiles([]);
      setExistingFiles(data.editedFiles); // update existing files
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-2">Upload Edited Files</h3>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="mb-2"
      />

      {/* New file previews */}
      {previews.length > 0 && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {previews.map((url, index) =>
            files[index]?.type?.startsWith("image") ? (
              <img
                key={index}
                src={url}
                alt={`preview-${index}`}
                className="w-24 h-24 object-cover border rounded"
              />
            ) : (
              <video
                key={index}
                src={url}
                className="w-32 h-24 border rounded"
                controls
              />
            )
          )}
        </div>
      )}

      {/* Existing edited files
      {existingFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Already Uploaded Files</h4>
          <div className="flex gap-2 flex-wrap">
            {existingFiles.map((file, index) =>
              file.fileUrl.endsWith(".mp4") ||
              file.fileUrl.endsWith(".mov") ? (
                <video
                  key={index}
                  src={file.fileUrl}
                  className="w-32 h-24 border rounded"
                  controls
                />
              ) : (
                <img
                  key={index}
                  src={file.fileUrl}
                  alt={`existing-${index}`}
                  className="w-24 h-24 object-cover border rounded"
                />
              )
            )} */}
          {/* </div> */}
        {/* </div> */}
      )

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default AdminEditUpload;
