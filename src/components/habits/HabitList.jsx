import { useState } from "react";
import { deleteHabit, updateHabit } from "../../services/api";

function HabitList({ habits, loading, onDeleted }) {
  if (loading) return <p>Loading Habits...</p>;
  if (!habits.length) return <p>No habits yet</p>;

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

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

  const startEditing = (habit) => {
    setEditingId(habit.id);
    setEditName(habit.name);
  };

  const saveEdit = async (id) => {
    await updateHabit(id, { name: editName });
    setEditingId(null);
    onDeleted();
  };

  return (
    <div className="habits">
      {habits.map((habit) => (
        <div key={habit.id} className="habit-card">
          {editingId === habit.id ? (
            <div>
              <input value={editName} onChange={(event) => setEditName(event.target.value)} />
              <button onClick={() => saveEdit(habit.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p> {habit.name}</p>
              <p>{habit.frequency_per_week} / 7</p>
              <button
                onClick={() => {
                  startEditing(habit);
                }}
              >
                Edit
              </button>
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
          )}
        </div>
      ))}
    </div>
  );
}

export default HabitList;
