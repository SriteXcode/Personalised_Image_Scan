// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState({});

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(`${API_BASE}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(data);
//     } catch (err) {
//       console.error("Error fetching all orders:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${API_BASE}/orders/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchOrders();
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   const uploadEditedFiles = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       if (selectedFiles[id]) {
//         Array.from(selectedFiles[id]).forEach((file) =>
//           formData.append("editedFiles", file)
//         );
//       }
//       await axios.put(`${API_BASE}/orders/${id}/upload-edited`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       fetchOrders();
//     } catch (err) {
//       console.error("Error uploading edited files:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">User</th>
//             <th className="border p-2">Category</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Files</th>
//             <th className="border p-2">Edited Files</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td className="border p-2">{order.user?.name || "Unknown"}</td>
//               <td className="border p-2">{order.category}</td>
//               <td className="border p-2">{order.status}</td>
//               <td className="border p-2">
//                 {order.files.map((f, i) => (
//                   <a
//                     key={i}
//                     href={f.fileUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 underline mr-2"
//                   >
//                     File {i + 1}
//                   </a>
//                 ))}
//               </td>
//               <td className="border p-2">
//                 {order.editedFiles.map((f, i) => (
//                   <a
//                     key={i}
//                     href={f.fileUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-green-600 underline mr-2"
//                   >
//                     Edited {i + 1}
//                   </a>
//                 ))}
//               </td>
//               <td className="border p-2 space-y-2">
//                 {/* Status Buttons */}
//                 <div>
//                   <button
//                     onClick={() => updateStatus(order._id, "in_progress")}
//                     className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                   >
//                     In Progress
//                   </button>
//                   <button
//                     onClick={() => updateStatus(order._id, "completed")}
//                     className="bg-green-600 text-white px-2 py-1 rounded mr-2"
//                   >
//                     Complete
//                   </button>
//                   <button
//                     onClick={() => updateStatus(order._id, "rejected")}
//                     className="bg-red-600 text-white px-2 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 </div>

//                 {/* File Upload */}
//                 <div>
//                   <input
//                     type="file"
//                     multiple
//                     onChange={(e) =>
//                       setSelectedFiles({
//                         ...selectedFiles,
//                         [order._id]: e.target.files,
//                       })
//                     }
//                   />
//                   <button
//                     onClick={() => uploadEditedFiles(order._id)}
//                     className="bg-blue-600 text-white px-2 py-1 rounded mt-1"
//                   >
//                     Upload Edited
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React from "react";
// import LogoutButton from "../components/LogoutButton";
// import Navbar from "../components/Navbar";

// const AdminDashboard = () => {
//   return (
//     <div className="p-6">
//       <Navbar />
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <LogoutButton />
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import AdminEditUpload from "../components/AdminEditUpload";

// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/orders", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Error fetching admin orders:", err);
//       }
//     };
//     fetchOrders();
//   }, [token]);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/orders/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(orders.filter((o) => o._id !== id));
//     } catch (err) {
//       console.error("Error deleting order:", err);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:5000/api/orders/${id}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Update frontend instantly
//       setOrders((prev) =>
//         prev.map((o) => (o._id === id ? { ...o, status: data.status } : o))
//       );
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">All Orders (Admin) 🛠️</h2>

//         {orders.length === 0 ? (
//           <p className="text-gray-600">No orders available.</p>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="border p-4 rounded-lg shadow-md bg-white"
//               >
//                 <p>
//                   <b>User:</b>{" "}
//                   {order.user ? (
//                     <>
//                       {order.user.name}{" "}
//                       <span className="text-gray-500">
//                         ({order.user.email})
//                       </span>
//                     </>
//                   ) : (
//                     "Unknown User"
//                   )}
//                 </p>

//                 <p>
//                   <b>Category:</b> {order.category}
//                 </p>
//                 <p>
//                   <b>Status:</b>{" "}
//                   <span
//                     className={`px-2 py-1 rounded text-white ${
//                       order.status === "pending"
//                         ? "bg-yellow-500"
//                         : order.status === "completed"
//                         ? "bg-green-600"
//                         : order.status === "approved"
//                         ? "bg-blue-500"
//                         : "bg-red-500"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </p>

//                 {/* Files Section */}
//                 {order.files?.length > 0 && (
//                   <div className="mt-3">
//                     <b>Files:</b>
//                     <div className="flex flex-wrap gap-4 mt-2">
//                       {order.files.map((f) =>
//                         f.fileType === "image" ? (
//                           <img
//                             key={f._id}
//                             src={f.fileUrl}
//                             alt="Uploaded"
//                             className="w-28 h-28 object-cover rounded shadow"
//                           />
//                         ) : (
//                           <video
//                             key={f._id}
//                             src={f.fileUrl}
//                             controls
//                             className="w-40 rounded shadow"
//                           />
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Edited Files Section */}
//                 {order.editedFiles?.length > 0 && (
//                   <div className="mt-3">
//                     <b>Edited Files:</b>
//                     <div className="flex flex-wrap gap-4 mt-2">
//                       {order.editedFiles.map((ef) =>
//                         ef.fileUrl.endsWith(".mp4") ? (
//                           <video
//                             key={ef._id}
//                             src={ef.fileUrl}
//                             controls
//                             className="w-40 rounded shadow"
//                           />
//                         ) : (
//                           <img
//                             key={ef._id}
//                             src={ef.fileUrl}
//                             alt="Edited"
//                             className="w-28 h-28 object-cover rounded shadow"
//                           />
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload Edited File */}
//                 {order.status !== "completed" && (
//                   <AdminEditUpload
//                     orderId={order._id}
//                     onUploadSuccess={(updatedOrder) => {
//                       setOrders((prev) =>
//                         prev.map((o) =>
//                           o._id === updatedOrder._id ? updatedOrder : o
//                         )
//                       );
//                     }}
//                   />
//                 )}

//                 {/* Action Buttons */}
//                 <div className="mt-4 flex gap-3">
//                   {order.status === "pending" && (
//                     <>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "approved")}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "rejected")}
//                         className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                   <button
//                     onClick={() => handleDelete(order._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import API from "../Api";
// import Navbar from "../components/Navbar";
// import AdminEditUpload from "../components/AdminEditUpload";
// // import Socket from "../../Socket";
// import socket from "../../Socket";



// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 5; // adjust as needed

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await API.get("/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching admin orders:", error);
//       alert("Failed to fetch orders!");
//     } finally {
//       setLoading(false);
//     }
//   };

// //  useEffect(() => {
// //     fetchOrders();

// //     // Listen for new order
// //     socket.on("newOrder", (order) => {
// //       setOrders((prev) => [order, ...prev]);
// //     });

// //     // Listen for updated order
// //     socket.on("orderUpdated", (updatedOrder) => {
// //       setOrders((prev) =>
// //         prev.map((order) =>
// //           order._id === updatedOrder._id ? updatedOrder : order
// //         )
// //       );
// //     });

// //     return () => {
// //       socket.off("newOrder");
// //       socket.off("orderUpdated");
// //     };
// //   }, []);

// //  useEffect(() => {
// //     fetchOrders();
// //     // ✅ Connect only once
// //     socket.connect();

// //     // 🔥 Send test message only once
// //     socket.emit("pingFromClient", { msg: "Hello from AdminDashboard 🚀" });

// //     // Listen for socket events
// //     socket.on("newOrder", (order) => {
// //       console.log("📩 New Order:", order);
// //       setOrders((prev) => [order, ...prev]);
// //     });

// //     socket.on("orderStatusUpdated", (update) => {
// //       console.log("📩 Order Status Updated:", update);
// //       setOrders((prev) =>
// //         prev.map((o) =>
// //           o._id === update.orderId ? { ...o, status: update.status } : o
// //         )
// //       );
// //     });

// //     socket.on("filesUploaded", (update) => {
// //       console.log("📩 Files Uploaded:", update);
// //     });

// //     socket.on("orderDeleted", ({ orderId }) => {
// //       console.log("❌ Order Deleted:", orderId);
// //       setOrders((prev) => prev.filter((o) => o._id !== orderId));
// //     });

// //     // ✅ Cleanup to avoid multiple connections
// //     return () => {
// //       socket.off("newOrder");
// //       socket.off("orderStatusUpdated");
// //       socket.off("filesUploaded");
// //       socket.off("orderDeleted");
// //       socket.disconnect();
// //     };
// //   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await API.delete(`/orders/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders((prev) => prev.filter((o) => o._id !== id));
//     } catch (err) {
//       console.error("Error deleting order:", err);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await API.put(`/orders/${id}`, { status }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders((prev) =>
//         prev.map((o) => (o._id === id ? { ...o, status: data.status } : o))
//       );
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   const handleUploadSuccess = (updatedOrder) => {
//     setOrders((prev) =>
//       prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
//     );
//   };

  

//   // ---- Search + Filter ----
//   const filteredOrders = orders.filter((order) => {
//     const query = search.toLowerCase();
//     const matchesSearch =
//       order.user?.name?.toLowerCase().includes(query) ||
//       order.user?.email?.toLowerCase().includes(query) ||
//       order.category?.toLowerCase().includes(query) ||
//       order.status?.toLowerCase().includes(query);

//     const matchesStatus =
//       statusFilter === "all" || order.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   // ---- Pagination ----
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   if (loading) return <div className="p-6">Loading orders...</div>;

//   return (
//     <div>
//       <Navbar />
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-6">Admin Dashboard 🛠️</h1>

//         {/* Search + Filter Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by user, email, category, or status..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="flex-1 p-2 border rounded"
//           />

//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="p-2 border rounded"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="completed">Completed</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>

//         {currentOrders.length === 0 ? (
//           <p className="text-gray-600">No orders found.</p>
//         ) : (
//           <div className="space-y-6">
//             {currentOrders.map((order) => (
//               <div
//                 key={order._id}
//                 className="border p-4 rounded-lg shadow-md bg-white"
//               >
//                 <h2 className="text-lg font-semibold mb-2">
//                   Order: {order._id}
//                 </h2>

//                 {/* User Info */}
//                 <p>
//                   <strong>User:</strong>{" "}
//                   {order.user ? (
//                     <>
//                       {order.user.name}{" "}
//                       <span className="text-gray-500">
//                         ({order.user.email})
//                       </span>
//                     </>
//                   ) : (
//                     "Unknown User"
//                   )}
//                 </p>

//                 <p>
//                   <strong>Category:</strong> {order.category}
//                 </p>

//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`px-2 py-1 rounded text-white ${
//                       order.status === "pending"
//                         ? "bg-yellow-500"
//                         : order.status === "completed"
//                         ? "bg-green-600"
//                         : order.status === "approved"
//                         ? "bg-blue-500"
//                         : "bg-red-500"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </p>

//                 {order.userNote && (
//                   <p>
//                     <strong>User Note:</strong> {order.userNote}
//                   </p>
//                 )}
//                 {order.adminNote && (
//                   <p>
//                     <strong>Admin Note:</strong> {order.adminNote}
//                   </p>
//                 )}

//                 {/* Files Section */}
//                 {order.files?.length > 0 && (
//                   <div className="mt-3">
//                     <b>Files:</b>
//                     <div className="flex flex-wrap gap-4 mt-2">
//                       {order.files.map((f) =>
//                         f.fileType === "image" ? (
//                           <img
//                             key={f._id}
//                             src={f.fileUrl}
//                             alt="Uploaded"
//                             className="w-28 h-28 object-cover rounded shadow"
//                           />
//                         ) : (
//                           <video
//                             key={f._id}
//                             src={f.fileUrl}
//                             controls
//                             className="w-40 rounded shadow"
//                           />
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Edited Files Section */}
//                 {order.editedFiles?.length > 0 && (
//                   <div className="mt-3">
//                     <b>Edited Files:</b>
//                     <div className="flex flex-wrap gap-4 mt-2">
//                       {order.editedFiles.map((ef) =>
//                         ef.fileUrl.endsWith(".mp4") ? (
//                           <video
//                             key={ef._id}
//                             src={ef.fileUrl}
//                             controls
//                             className="w-40 rounded shadow"
//                           />
//                         ) : (
//                           <img
//                             key={ef._id}
//                             src={ef.fileUrl}
//                             alt="Edited"
//                             className="w-28 h-28 object-cover rounded shadow"
//                           />
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload Edited File */}
//                 {order.status !== "completed" && (
//                   <AdminEditUpload
//                     orderId={order._id}
//                     onUploadSuccess={handleUploadSuccess}
//                   />
//                 )}

//                 {/* Action Buttons */}
//                 <div className="mt-4 flex gap-3">
//                   {order.status === "pending" && (
//                     <>
//                       <button
//                         onClick={() =>
//                           handleStatusChange(order._id, "approved")
//                         }
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() =>
//                           handleStatusChange(order._id, "rejected")
//                         }
//                         className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                   <button
//                     onClick={() => handleDelete(order._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-6 space-x-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Prev
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 border rounded ${
//                   currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import API from "../Api";
import Navbar from "../components/Navbar";
import AdminEditUpload from "../components/AdminEditUpload";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // adjust as needed

  // ✅ Fetch orders (only API, no socket)
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      alert("Failed to fetch orders!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Delete order
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  // ✅ Update status
  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.put(
        `/orders/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: data.status } : o))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ✅ Update edited files
  const handleUploadSuccess = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
    );
  };

  // ---- Search + Filter ----
  const filteredOrders = orders.filter((order) => {
    const query = search.toLowerCase();
    const matchesSearch =
      order.user?.name?.toLowerCase().includes(query) ||
      order.user?.email?.toLowerCase().includes(query) ||
      order.category?.toLowerCase().includes(query) ||
      order.status?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ---- Pagination ----
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard 🛠️</h1>

        {/* Search + Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by user, email, category, or status..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 p-2 border rounded"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {currentOrders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {currentOrders.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                <h2 className="text-lg font-semibold mb-2">
                  Order: {order._id}
                </h2>

                {/* User Info */}
                <p>
                  <strong>User:</strong>{" "}
                  {order.user ? (
                    <>
                      {order.user.name}{" "}
                      <span className="text-gray-500">
                        ({order.user.email})
                      </span>
                    </>
                  ) : (
                    "Unknown User"
                  )}
                </p>

                <p>
                  <strong>Category:</strong> {order.category}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "completed"
                        ? "bg-green-600"
                        : order.status === "approved"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                {order.userNote && (
                  <p>
                    <strong>User Note:</strong> {order.userNote}
                  </p>
                )}
                {order.adminNote && (
                  <p>
                    <strong>Admin Note:</strong> {order.adminNote}
                  </p>
                )}

                {/* Files Section */}
                {order.files?.length > 0 && (
                  <div className="mt-3">
                    <b>Files:</b>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {order.files.map((f) =>
                        f.fileType === "image" ? (
                          <img
                            key={f._id}
                            src={f.fileUrl}
                            alt="Uploaded"
                            className="w-28 h-28 object-cover rounded shadow"
                          />
                        ) : (
                          <video
                            key={f._id}
                            src={f.fileUrl}
                            controls
                            className="w-40 rounded shadow"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Edited Files Section */}
                {order.editedFiles?.length > 0 && (
                  <div className="mt-3">
                    <b>Edited Files:</b>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {order.editedFiles.map((ef) =>
                        ef.fileUrl.endsWith(".mp4") ? (
                          <video
                            key={ef._id}
                            src={ef.fileUrl}
                            controls
                            className="w-40 rounded shadow"
                          />
                        ) : (
                          <img
                            key={ef._id}
                            src={ef.fileUrl}
                            alt="Edited"
                            className="w-28 h-28 object-cover rounded shadow"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Upload Edited File */}
                {order.status !== "completed" && (
                  <AdminEditUpload
                    orderId={order._id}
                    onUploadSuccess={handleUploadSuccess}
                  />
                )}

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                  {order.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "approved")
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "rejected")
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
