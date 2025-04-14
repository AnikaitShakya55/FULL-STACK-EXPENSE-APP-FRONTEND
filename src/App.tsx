import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ExpenseForm from "./Components/ExpenseForm.tsx";
import ExpenseList from "./Components/ExpenseList.tsx";
import Login from "./Components/Login.tsx";
import Navbar from "./Components/NavBar.tsx";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenseForm" element={<ExpenseForm />} />
        <Route path="/expenses" element={<ExpenseList />} />
      </Routes>
    </>
  );
};

export default App;
