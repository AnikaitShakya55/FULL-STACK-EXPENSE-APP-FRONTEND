import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newExpense = { title, description, amount: Number(amount), date };

    try {
      const response = await fetch(
        "http://localhost:5000/expense_api/createExpense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      setDescription("");
      setAmount("");
      setDate("");
    } catch (error) {
      setError(error.message);
      console.error("Error creating expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.title}>Add Expense</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </>
  );
};

export default ExpenseForm;
