import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("enquiries");
    if (stored) {
      setEnquiries(JSON.parse(stored));
    }
  }, []);

  const updateLocalStorage = (updatedEnquiries) => {
    localStorage.setItem("enquiries", JSON.stringify(updatedEnquiries));
    setEnquiries(updatedEnquiries);
  };

  const handleMarkResolved = (index) => {
    const updated = [...enquiries];
    updated[index].status = "Resolved";
    updateLocalStorage(updated);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
    if (confirmDelete) {
      const updated = enquiries.filter((_, i) => i !== index);
      updateLocalStorage(updated);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border-t-4 border-green-600 p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Submitted Enquiries
        </h2>

        {enquiries.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No enquiries submitted yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-green-300 rounded-lg shadow">
              <thead className="bg-green-100 text-green-800 font-semibold">
                <tr>
                  <th className="border px-4 py-2">S.No</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry, index) => (
                  <tr key={index} className="odd:bg-green-50 even:bg-white">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2">{enquiry.name}</td>
                    <td className="border px-4 py-2">{enquiry.email}</td>
                    <td className="border px-4 py-2">{enquiry.subject}</td>
                    <td className="border px-4 py-2">{enquiry.message}</td>
                    <td className="border px-4 py-2 text-center">
                      {enquiry.status || "Pending"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex flex-col gap-2">
                        {enquiry.status !== "Resolved" && (
                          <button
                            onClick={() => handleMarkResolved(index)}
                            className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600 transition"
                          >
                            Mark Resolved
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            to="/admin-panel"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Back to Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnquiryList;