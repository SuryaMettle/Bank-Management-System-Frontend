import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

function AdminDashboard() {
  const [branches, setBranches] = useState([]);
  const [branchName, setBranchName] = useState("");
  const [location, setLocation] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("EMPLOYEE"); // default
  const [activeSection, setActiveSection] = useState(null);
  // null | "branch" | "user"
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    API.get("/admin/branches").then((res) => setBranches(res.data));
    API.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  const createBranch = async () => {
    await API.post("/admin/branches", { branchName, location });
    const res = await API.get("/admin/branches");
    setBranches(res.data);
    setBranchName("");
    setLocation("");
  };

  const createUser = async () => {
    try {
      await API.post("/admin/users", {
        email: userEmail,
        password: userPassword,
        role: userRole,
      });
      alert("User created successfully!");
      setUserEmail("");
      setUserPassword("");
      setUserRole("EMPLOYEE");
    } catch (err) {
      console.log(err.response || err);
      alert(err.response?.data || "User creation failed");
    }
  };

    const handleUserClick = async (id) => {
  try {
    const res = await API.get(`/admin/users/${id}`);
    setSelectedUser(res.data);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};



  return (
    <div className="admin-page">
  <h2>Admin Dashboard</h2>

  {/* ===== MENU ===== */}
  {!activeSection && (
    <div className="admin-menu">
      <div
        className="menu-card"
        onClick={() => setActiveSection("branch")}
      >
        <h3>🏢 Manage Branches</h3>
        <p>Create and view branches</p>
      </div>

      <div
        className="menu-card"
        onClick={() => setActiveSection("user")}
      >
        <h3>👤 Manage Users</h3>
        <p>Create users and assign roles</p>
      </div>
    </div>
  )}

  {/* ===== BRANCH SECTION ===== */}
  {activeSection === "branch" && (
    <>
      <button
        className="back-btn"
        onClick={() => setActiveSection(null)}
      >
        ← Back
      </button>

      <div className="group-container">
        <div className="section-flex">

          {/* CREATE BRANCH */}
          <div className="section-box">
            <h3>Create Branch</h3>
            <input
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Branch Name"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <button onClick={createBranch}>
              Create Branch
            </button>
          </div>

          {/* BRANCH LIST */}
          <div className="section-box">
            <h3>Branches List</h3>
            {branches.map((b) => (
              <div className="card" key={b.id}>
                {b.id} - {b.branchName} - {b.location}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )}

  {/* ===== USER SECTION ===== */}
{activeSection === "user" && (
  <>
    <button
      className="back-btn"
      onClick={() => setActiveSection(null)}
    >
      ← Back
    </button>

    <div className="group-container">
      <div className="section-flex">

        {/* CREATE USER */}
        <div className="section-box">
          <h3>Create User / Assign Role</h3>
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
          />
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
          <button onClick={createUser}>
            Create User
          </button>
        </div>

        {/* USER LIST */}
        <div className="section-box">
          <h3>Users List</h3>

          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="card"
                  onClick={() => handleUserClick(user.id)}
                  style={{ cursor: "pointer" }}
                >
                  {user.email} - {user.role}
                </div>
              ))}
            </>
          )}
        </div>
        {selectedUser && (
                <div className="profile-container">
                  <h3>User Profile</h3>
                  <p><strong>ID:</strong> {selectedUser.id}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p><strong>Status:</strong> {selectedUser.status}</p>
                </div>
              )}
      </div> {/* CLOSE section-flex */}
    </div>   {/* CLOSE group-container */}

  </>
)}

</div>


  );
}

export default AdminDashboard;
