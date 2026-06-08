import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  const API_URL = "/todos";

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
      setError("Konnte Todos nicht laden.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const payload = {
      title: newTitle, // Dein Schema TodoItemCreate (z. B. title + done)
      done: false,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNewTitle("");
        fetchTodos();
      } else {
        setError("Fehler beim Anlegen des Todos.");
      }
    } catch (err) {
      console.error(err);
      setError("Fehler beim Anlegen.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTodos(todos.filter((t) => t.id !== id));
      } else {
        setError("Fehler beim Löschen.");
      }
    } catch (err) {
      console.error(err);
      setError("Fehler beim Löschen.");
    }
  };

  return (
    <div style={{ margin: "2rem", fontFamily: "sans-serif" }}>
      <h1>FastAPI Todo App (React)</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={addTodo} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Neues Todo..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginRight: "1rem" }}
        />
        <button type="submit">Hinzufügen</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
            <span style={{ marginRight: "1rem" }}>
              {todo.title} {todo.done ? "✅" : ""}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️ Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
