import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getHabits } from "../services/api";
import HabitList from "../components/habits/HabitList";
import CreateHabit from "../components/habits/CreateHabit";

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);
  const [habitsLoading, setHabitsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  const loadHabits = async () => {
    setHabitsLoading(true);
    const result = await getHabits();
    if (!result.error) {
      setHabits(result.data || []);
    }
    setHabitsLoading(false);
  };

  useEffect(() => {
    if (authLoading || !user) return;
    loadHabits();
  }, [authLoading, user]);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user) return null;

  return (
    <div className="dashboard">
      <h2>Habit Tracker</h2>
      <p className="user-email">Logged in as: {user.email}</p>
      <CreateHabit onCreated={loadHabits} />
      <HabitList habits={habits} loading={habitsLoading} />
    </div>
  );
}

export default Dashboard;
