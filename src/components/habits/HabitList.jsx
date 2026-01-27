function HabitList({ habits, loading }) {
  if (loading) return <p>Loading Habits...</p>;
  if (!habits.length) return <p>No habits yet</p>;

  return (
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
