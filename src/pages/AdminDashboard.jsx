import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [branches, setBranches] = useState([]);
  const [branchName, setBranchName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    API.get("/admin/branches").then((res) => setBranches(res.data));
  }, []);

  const createBranch = async () => {
    await API.post("/admin/branches", { branchName, location });
    const res = await API.get("/admin/branches");
    setBranches(res.data);
  };

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>

      <h3>Create Branch</h3>
      <input value={branchName} onChange={(e) => setBranchName(e.target.value)} placeholder="Branch Name" />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <button onClick={createBranch}>Create</button>

      <h3>Branches List</h3>
      {branches.map((b) => (
        <div className="card" key={b.id}>
          {b.id} - {b.branchName} - {b.location}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
