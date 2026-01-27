import { deleteHabit } from "../../services/api";

function HabitList({ habits, loading, onDeleted }) {
  if (loading) return <p>Loading Habits...</p>;
  if (!habits.length) return <p>No habits yet</p>;

  const handleDelete = async (id) => {
    try {
      const result = await deleteHabit(id);
      if (!result.error && onDeleted) {
        onDeleted();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="habits">
      {habits.map((habit) => (
        <div key={habit.id} className="habit-card">
          <p>{habit.name}</p>
          <p>{habit.frequency_per_week} / 7</p>
          <button
            className="delete-btn"
            onClick={() => {
              if (window.confirm("Delete this habit?")) {
                handleDelete(habit.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default HabitList;
