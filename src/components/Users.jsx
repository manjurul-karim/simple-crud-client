import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (_id) => {
    console.log("delete", _id);
    fetch(`http://localhost:5000/Users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Deleted Sucessfully");
          const remaining = users.filter(user => user._id !== _id) 
          setUsers(remaining);
        }
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
        // Handle any error that occurred during deletion
      });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>{users.length}</h2>
      {users.map((user) => (
        <p key={user._id}>
          {" "}
          {user.name} : {user.email} -# {user._id}
          <Link style={{marginLeft:'15px '}} to={`/update/${user._id}`}><button>Updated</button></Link>
          <button onClick={() => handleDelete(user._id)}>X</button>
        </p>
      ))}
    </div>
  );
};

export default Users;
