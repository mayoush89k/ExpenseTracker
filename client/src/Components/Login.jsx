import React, { useState } from "react";

export default function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");
  return (
    <div>
      <h1 className="w-full h-[90vh] flex flex-col justify-start items-center">Login</h1>
      <form action="/login" method="post">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={PasswordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
