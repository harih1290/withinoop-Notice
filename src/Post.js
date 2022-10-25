import axios from "axios";
import React from "react";
//import ReactDOM from "react-dom";
function post() {
  function handleClick() {
    // Send data to the backend via POST
    const article = { title: "React Hooks POST Request Example" };
    axios
      .get("http://localhost:8081/user/generateToken", article)
      .then((response) => console.log(response));
  }

  return (
    <div className="form">
      <form onSubmit={handleClick}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
    // <div
    //   onClick={handleClick}
    //   style={{
    //     textAlign: "center",
    //     width: "100px",
    //     border: "1px solid gray",
    //     borderRadius: "5px",
    //   }}
    // >
    //   Send data to backend
    // </div>
  );
}

export default post;
