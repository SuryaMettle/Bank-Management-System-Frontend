import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./dashboard.css";

function EmployeeDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [accNum, setAccNum] = useState("");
  const [accType, setAccType] = useState("");
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [customerId, setCustomerId] = useState("");
  const [branchId, setBranchId] = useState("");

  useEffect(() => {
    API.get("/employee/accounts").then((res) => setAccounts(res.data));
  }, []);

  const createAccount = async () => {
    await API.post("/employee/accounts", {
      accountNumber: accNum,
      accountType: accType,
      balance,
      status,
      customerId,
      branchId,
    });

    const res = await API.get("/employee/accounts");
    setAccounts(res.data);
    setAccNum("");
    setAccType("");
    setBalance(0);
  };

  return (
    <div className="employee-page">
      <h2>Employee Dashboard</h2>
      <div className="employee-container">
      <div className="section-flex">
        <div className="section-box">
          <h3>Create Account</h3>
          <input
            value={accNum}
            onChange={(e) => setAccNum(e.target.value)}
            placeholder="Account Number"
          />
          <input
            value={accType}
            onChange={(e) => setAccType(e.target.value)}
            placeholder="Account Type"
          />
          <input
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Balance"
          />
          <input
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Customer Id"
          />
          <input
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            placeholder="Branch Id"
          />
          <button onClick={createAccount}>Create Account</button>
        </div>

        <div className="section-box">
          <h3>Accounts List</h3>
          {accounts.map((a) => (
            <div className="card" key={a.id}>
              {a.id} - {a.accountNumber} - {a.accountType} - {a.balance}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
