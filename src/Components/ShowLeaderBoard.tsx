import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./showLeaderBoard.module.css";

const ShowLeaderBoard: React.FC = () => {
  const navigate = useNavigate();
  const [leaderBoardData, setLeaderBoardData] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    async function fetchLeaderBoard() {
      try {
        const response = await fetch(
          "http://localhost:5000/expense_api/premiumDashboard"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        console.log("data", data);
        setLeaderBoardData(data.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }

    fetchLeaderBoard();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.leaderboardList}>
        {leaderBoardData?.map((item, index) => (
          <li key={index} className={styles.leaderboardItem}>
            <span className={styles.name}>{`UserName: ${item.name}`}</span>
            <span
              className={styles.expense}
            >{`Total Expense: ₹${item.totalExpense}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowLeaderBoard;
