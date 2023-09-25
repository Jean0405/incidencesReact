import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignIn = () => {
  let redirect = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //API REQUEST
  const signIn = async (event) => {
    event.preventDefault();

    let response = await (await fetch("http://127.25.25.26:3300/v1/auth/signIn", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })).json();
    if (response.status == 200) {
      localStorage.setItem("token", response.token)
      if (response.user[0].role == "camper") {
        redirect("/camperPage", {
          state: {
            user: response.user[0]
          }
        })
      } else if (response.user[0].role == "trainer") {
        redirect("/trainerPage", {
          state: {
            user: response.user[0]
          }
        })
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={signIn}
        id="formSignIn"
        className="h-screen flex flex-col justify-center items-center gap-3 p-2"
      >
        <h1 className="text-center font-bold pt-3">SIGN IN</h1>
        <input
          name="username"
          value={username}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="sm:w-1/2 md:w-1/2 lg:w-1/4 h-10 bg-gray-100 outline-none border-blue-700 border-l-4 p-2 text-sky-700"
        />
        <input
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="sm:w-1/2 md:w-1/2 lg:w-1/4 h-10 bg-gray-100 outline-none border-blue-700 border-l-4 p-2 text-sky-700"
        />
        <div className="grid place-items-center ">
          <input
            type="submit"
            className="w-40 rounded-none bg-blue-700 text-white font-bold hover:bg-blue-300 hover:text-blue-700  p-2"
          />

          <p className="mt-5 gap-x-2 text-center text-sm text-gray-500">
            Not a member?
            <Link to="/signUp" className="p-2 text-blue-400 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}