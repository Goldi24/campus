import { useState } from "react";
import Layout from "../components/Layout";

function Task() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      const data = await response.json();

      setMessage(data.message);

      setTask({
        title: "",
        description: "",
      });
    } catch (error) {
      setMessage("Server Error");
    }
  };

  return (
    <Layout>
      <h2>Create Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Task
        </button>
      </form>

      {message && <p>{message}</p>}
    </Layout>
  );
}

export default Task;