import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ExpenseForm from "./Components/ExpenseForm.tsx";
import ExpenseList from "./Components/ExpenseList.tsx";
import Login from "./Components/Login.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-expense" element={<ExpenseForm />} />
      <Route path="/expenses" element={<ExpenseList />} />
    </Routes>
  );
};

export default App;
