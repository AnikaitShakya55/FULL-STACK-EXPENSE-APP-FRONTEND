import React, { useState, useEffect } from "react";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch(
          "http://localhost:5000/expense_api/createExpense"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.description} - ${expense.amount} - {expense.date}
          <button onClick={() => handleDelete(expense.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
