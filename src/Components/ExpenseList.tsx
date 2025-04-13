import React, { useState, useEffect } from "react";
import styles from "./ExpenseList.module.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch(
          "http://localhost:5000/expense_api/getExpenses"
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

  return (
    <div className={styles.container}>
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
      {expenses.length === 0 && <p className={styles.noExpense}>No Expenses</p>}
    </div>
  );
}

export default ExpenseList;
