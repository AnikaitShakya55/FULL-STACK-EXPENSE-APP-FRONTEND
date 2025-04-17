import React, { useState, useEffect } from "react";
import styles from "./ExpenseList.module.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // import the plugin separately

function ExpenseList() {
  const navigate = useNavigate("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_Id = localStorage.getItem("user_id");
    if (!token) {
      navigate("/login");
    }

    async function fetchExpenses() {
      try {
        const response = await fetch(
          `http://localhost:5000/expense_api/getUserExpense/${user_Id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        console.log("data", data);
        setExpenses(data.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }

    fetchExpenses();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/expense_api/deleteExpense/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      } else {
        const data = await response.json();
        console.log("data", data);
      }

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const formatDate = (isoString) => new Date(isoString).toLocaleDateString();

  const downloadReportHandler = () => {
    const doc = new jsPDF();

    const tableColumn = ["Date", "Title", "Description", "Amount"];
    const tableRows = [];

    expenses.forEach((exp: any) => {
      const expenseData= [
        new Date(exp.date).toLocaleDateString(),
        exp.title,
        exp.description,
        exp.amount,
      ];
      tableRows.push(expenseData);
    });

    doc.text("Expense Report", 14, 10);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("expenses_report.pdf");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <button
          className={styles.downloadReport}
          onClick={downloadReportHandler}
        >
          Download Report
        </button>
        <h2 className={styles.heading}>Expense List</h2>

        <ul className={styles.list}>
          {expenses?.map((expense) => (
            <li key={expense.id} className={styles.listItem}>
              <span>{expense.title}</span>
              <span>{expense.description}</span>
              <span>${expense.amount}</span>
              <span>{formatDate(expense.date)}</span>
              <button
                onClick={() => handleDelete(expense.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {expenses.length === 0 && (
          <p className={styles.noExpense}>No Expenses</p>
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
