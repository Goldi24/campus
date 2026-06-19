import { useState } from "react";
import Layout from "../components/Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setMessage("Email is required");
      return;
    }

    if (password === "") {
      setMessage("Password is required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log("TOKEN:", data.token);
        console.log("STORED:", localStorage.getItem("token"));

        setMessage(data.message);

        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server Error");
    }
  };

  return (
    <Layout>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </Layout>
  );
}

export default Login;