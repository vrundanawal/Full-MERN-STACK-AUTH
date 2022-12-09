import { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handleRegisterUser
  async function handleRegisterUser(e) {
    e.preventDefault();
    if (name && email && password) {
      const response = await fetch("http://localhost:1337/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.status === "ok") {
        history.push("/login");
      }

      // setName("");
      // setEmail("");
      // setPassword("");
    } else {
      alert("please fill the all field");
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegisterUser}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <br />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
