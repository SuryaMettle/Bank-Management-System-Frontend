import React, { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [accNum, setAccNum] = useState("");
  const [accType, setAccType] = useState("");
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState("ACTIVE");
  const [customerId, setCustomerId] = useState(1);
  const [branchId, setBranchId] = useState(1);

  useEffect(() => {
    API.get("/employee/accounts").then((res) => {setAccounts(res.data)
  console.log(res.data)}
  );
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
  };

  return (
    <div className="page">
      <h2>Employee Dashboard</h2>

      <h3>Create Account</h3>
      <input value={accNum} onChange={(e) => setAccNum(e.target.value)} placeholder="Account Number" />
      <input value={accType} onChange={(e) => setAccType(e.target.value)} placeholder="Account Type" />
      <input value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="Balance" />
      <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Customer Id" />
      <input value={branchId} onChange={(e) => setBranchId(e.target.value)} placeholder="Branch Id" />
      <button onClick={createAccount}>Create Account</button>

      <h3>Accounts List</h3>
      {accounts.map((a) => (
        <div className="card" key={a.id}>
          {a.id} - {a.accountNumber} - {a.accountType} - {a.balance}
        </div>
      ))}
    </div>
  );
}

export default EmployeeDashboard;
