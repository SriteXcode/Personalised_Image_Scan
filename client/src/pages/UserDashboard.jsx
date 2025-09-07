// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const UserDashboard = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(`${API_BASE}/orders/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(data);
//       } catch (err) {
//         console.error("Error fetching user orders:", err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">My Orders</h2>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">Category</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Files</th>
//             <th className="border p-2">Edited Files</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
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
//                 {order.editedFiles.length > 0 ? (
//                   order.editedFiles.map((f, i) => (
//                     <a
//                       key={i}
//                       href={f.fileUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-green-600 underline mr-2"
//                     >
//                       Edited {i + 1}
//                     </a>
//                   ))
//                 ) : (
//                   <span className="text-gray-500">Not uploaded</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserDashboard;




// import React from "react";
// import LogoutButton from "../components/LogoutButton";
// import Navbar from "../components/Navbar";

// const UserDashboard = () => {
//   return (
//     <div className="p-6">
//       <Navbar />
//       <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
//       <LogoutButton />
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Orders 📦</h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                <p>
                  <b>Category:</b> {order.category}
                </p>
                <p>
                  <b>Status:</b> {order.status}
                </p>

                {/* Uploaded Files */}
                <div className="mt-2">
                  <b>Files:</b>
                  <ul className="list-disc ml-6 flex gap-4 flex-wrap">
                    {order.files.map((f) => (
                      <li key={f._id} className="list-none">
                        {f.fileType === "image" ? (
                          <img
                            src={`http://localhost:5000${f.fileUrl}`}
                            alt="Uploaded"
                            className="w-32 h-32 object-cover rounded shadow"
                          />
                        ) : (
                          <video
                            src={`http://localhost:5000${f.fileUrl}`}
                            controls
                            className="w-48 rounded shadow"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Edited Files */}
                {order.editedFiles?.length > 0 && (
                  <div className="mt-2">
                    <b>Edited Files:</b>
                    <ul className="list-disc ml-6 flex gap-4 flex-wrap">
                      {order.editedFiles.map((ef) => (
                        <li key={ef._id} className="list-none">
                          {ef.fileUrl.endsWith(".mp4") ? (
                            <video
                              src={`http://localhost:5000${ef.fileUrl}`}
                              controls
                              className="w-48 rounded shadow"
                            />
                          ) : (
                            <img
                              src={`http://localhost:5000${ef.fileUrl}`}
                              alt="Edited"
                              className="w-32 h-32 object-cover rounded shadow"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
