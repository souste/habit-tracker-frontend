import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Dashboard</h1>
      <p>Logged in as: {user.email}</p>
    </div>
  );
}

export default Dashboard;
