import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/users", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      setTasks(
        tasks.map((task) =>
          task._id === id
            ? { ...task, status: "Completed" }
            : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2>Dashboard</h2>

      <h3>Registered Users</h3>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {users
        .filter(
          (user) =>
            user.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            user.email
              .toLowerCase()
              .includes(search.toLowerCase())
        )
        .map((user) => (
          <div key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <hr />
          </div>
        ))}

      <h3>Tasks</h3>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <br />
      <br />

      {tasks
        .filter((task) => {
          if (filter === "All") return true;
          return task.status === filter;
        })
        .map((task) => (
          <div key={task._id}>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>

            <button
              onClick={() =>
                updateTaskStatus(task._id)
              }
            >
              Mark Complete
            </button>

            <button
              onClick={() =>
                deleteTask(task._id)
              }
            >
              Delete
            </button>

            <hr />
          </div>
        ))}
    </Layout>
  );
}

export default Dashboard;