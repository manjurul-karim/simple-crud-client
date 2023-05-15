import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POSt",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          alert("user added successfully");
          form.reset();
        }
      });
  };
  return (
    <>
      <h1>Simple CRUD</h1>
      <Link to="/users">Goto User Page</Link> <br /> <br />
      <form onSubmit={handleAddUser}>
        <input
          style={{ height: "30px" }}
          type="text"
          name="name"
          id=""
          placeholder="Name"
          defaultValue=""
          required
        />
        <br />
        <input
          style={{ height: "30px" }}
          type="email"
          name="email"
          id=""
          placeholder="Email"
          defaultValue=""
          required
        />
        <br />
        <input type="Submit" value="Add User" />
      </form>
    </>
  );
}

export default App;
