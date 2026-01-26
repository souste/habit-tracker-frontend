import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import HabitList from "../components/habits/HabitList";
import CreateHabit from "../components/habits/CreateHabit";

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) return null;

  return (
    <div className="dashboard">
      <h2>Habit Tracker</h2>
      <p className="user-email">Logged in as: {user.email}</p>
      <CreateHabit />
      <HabitList />
    </div>
  );
}

export default Dashboard;
