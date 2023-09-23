import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignIn = () => {
  let redirect = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  //API REQUEST
  const Fetch = async (event) => {
    event.preventDefault();

    try {
      let result = await (
        await fetch("http://192.168.129.72:5176/auth/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            username, password
          }
        })
      ).json();

      //IF USER NOT FOUND
      if (result.status == 200) {
        localStorage.setItem("token", result.token);
        redirect("/home", {
          state: {
            user: {
              username: result.data.username,
              email: result.data.email
            }
          }
        })
      } else {
        alert("User not found");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={Fetch}
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