import { useState, useEffect } from "react";
import { getHabits } from "../../services/api";
import { useAuth } from "../context/AuthContext";

function HabitList() {
  const { user, loading: authLoading } = useAuth();
  const [habits, setHabits] = useState([]);
  const [habitsLoading, setHabitsLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchHabits = async () => {
      try {
        const result = await getHabits();

        if (!result.error) {
          setHabits(result.data);
        }
      } finally {
        setHabitsLoading(false);
      }
    };
    fetchHabits();
  }, [authLoading, user]);

  return habitsLoading ? (
    <div>
      <p>Loading Habits...</p>
    </div>
  ) : (
    <div className="habits">
      {habits.map((habit) => (
        <div key={habit.id} className="habit-card">
          <p>{habit.name}</p>
          <p>{habit.frequency_per_week} / 7</p>
        </div>
      ))}
    </div>
  );
}

export default HabitList;
