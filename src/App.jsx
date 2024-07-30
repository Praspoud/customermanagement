import { useEffect, useState } from "react";
import {
  fetchCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "./customerapi";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    contactNo: "",
    address: "",
  });
  const [editCustomer, setEditCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getCustomers = async () => {
      const data = await fetchCustomer();
      if (Array.isArray(data)) {
        setCustomers(data);
      }
    };
    getCustomers();
  }, []);

  const handleAddCustomer = async () => {
    if (
      !newCustomer.fullName ||
      !newCustomer.contactNo ||
      !newCustomer.address
    ) {
      console.error("All fields are required.");
      return;
    }

    try {
      await addCustomer(newCustomer);
      const updatedCustomers = await fetchCustomer();
      setCustomers(updatedCustomers);
      setNewCustomer({ fullName: "", contactNo: "", address: "" });
    } catch (error) {
      console.error(
        "Error Adding Customer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleUpdateCustomer = async (id) => {
    if (
      !editCustomer.fullName ||
      !editCustomer.contactNo ||
      !editCustomer.address
    ) {
      console.error("All fields are required.");
      return;
    }

    try {
      await updateCustomer(id, editCustomer);
      const updatedCustomers = await fetchCustomer();
      setCustomers(updatedCustomers);
      setEditCustomer(null);
    } catch (error) {
      console.error(
        "Error Updating Customer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      const updatedCustomers = await fetchCustomer();
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error(
        "Error Deleting Customer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-primary-text mb-8 text-center">
        Customer Data
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Add New Customer
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          value={newCustomer.fullName}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, fullName: e.target.value })
          }
          className="mb-2 p-2 border border-gray-300 rounded mr-4 mt-4"
        />
        <input
          type="text"
          placeholder="Contact No"
          value={newCustomer.contactNo}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, contactNo: e.target.value })
          }
          className="mb-2 p-2 border border-gray-300 rounded mr-4"
        />
        <input
          type="text"
          placeholder="Address"
          value={newCustomer.address}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, address: e.target.value })
          }
          className="mb-2 p-2 border border-gray-300 rounded mr-4"
        />
        <button
          onClick={handleAddCustomer}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Customer
        </button>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {filteredCustomers.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-300">
            <thead className="bg-gray-200 text-gray-800 uppercase text-sm font-semibold">
              <tr>
                <th className="py-4 px-6 border-b border-gray-300 text-left">
                  ID
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-left">
                  Full Name
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-left">
                  Contact No
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-left">
                  Address
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="py-3 px-6 border-b border-gray-300 text-sm">
                    {customer.id}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-300 text-sm">
                    {customer.fullName}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-300 text-sm">
                    {customer.contactNo}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-300 text-sm">
                    {customer.address}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-300 text-sm">
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setEditCustomer(customer)}
                      className="ml-4 text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No customer data available</p>
      )}

      {editCustomer && (
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Edit Customer
          </h2>
          <input
            type="text"
            placeholder="Full Name"
            value={editCustomer.fullName}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, fullName: e.target.value })
            }
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Contact No"
            value={editCustomer.contactNo}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, contactNo: e.target.value })
            }
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={editCustomer.address}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, address: e.target.value })
            }
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => handleUpdateCustomer(editCustomer.id)}
            className="bg-green-500 text-white p-2 rounded"
          >
            Update
          </button>
          <button
            onClick={() => setEditCustomer(null)}
            className="ml-4 bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
