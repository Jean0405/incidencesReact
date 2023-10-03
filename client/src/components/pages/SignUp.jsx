import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LottieAnimation from "lottie-react";
import astronautAnimation from "../../assets/animation_ln37lp2p.json"

export const SignUp = () => {
  let redirect = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("")

  //API REQUEST
  const SignUp = async (event) => {
    event.preventDefault();

    let response = await (await fetch("http://127.25.25.26:3300/v1/auth/signUp", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: role
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
      } else {
        redirect("/supportPage", {
          state: {
            user: response.user[0]
          }
        })
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-zinc-900">
      <div className="md:col-span-1 hidden md:flex justify-center items-center">
        <LottieAnimation
          animationData={astronautAnimation}
          loop={true}
          width="100%"
          height="100%"
        />
      </div>
      <form
        onSubmit={SignUp}
        id="formSignIn"
        className="h-screen flex flex-col justify-center items-center gap-3 p-2"
      >
        <h1 className="text-center font-bold pt-3">SIGN UP</h1>
        <input
          name="username"
          value={username}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="sm:w-1/2 md:w-80 lg:w-1/2 h-10 bg-gray-100 outline-none border-blue-700 border-l-4 p-2 text-sky-700"
        />
        <input
          name="email"
          value={email}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="sm:w-1/2 md:w-80 lg:w-1/2 h-10 bg-gray-100 outline-none border-blue-700 border-l-4 p-2 text-sky-700"
        />
        <input
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="sm:w-1/2 md:w-80 lg:w-1/2 h-10 bg-gray-100 outline-none border-blue-700 border-l-4 p-2 text-sky-700"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="select select-solid-primary sm:w-1/2 md:w-80 lg:w-1/2 max-w-full mt-1 rounded-none" required>
          <option value="camper">Camper</option>
          <option value="support">Support</option>
          <option value="trainer">Trainer</option>
        </select>
        <div className="grid place-items-center ">
          <input
            type="submit"
            className="w-40 rounded-none bg-blue-700 text-white font-bold hover:bg-blue-300 hover:text-blue-700  p-2"
          />

          <p className="mt-5 gap-x-2 text-center text-sm text-gray-500">
            Not a member?
            <Link to="/" className="p-2 text-blue-400 font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}