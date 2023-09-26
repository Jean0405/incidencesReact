import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import { useState } from "react"

import { Navbar } from "../Navbar";

export const CamperPage = () => {
  const location = useLocation();
  let user = location.state.user;

  const [ubication, setUbication] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");


  let data = {
    title: title,
    ubication: ubication,
    category: category,
    description: description,
    camper: {
      _id: user._id,
      username: user.username
    }
  }

  const createReport = async (e) => {
    e.preventDefault()
    let response = await (await fetch("http://127.25.25.26:3300/v1/campers/newReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })).json();

    if (response.status == 200) {
      toast.success("All good!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTitle("");
      setDescription("");
      setUbication()
    } else {
      console.log(response);
    }
  }

  return (
    <div className="h-screen bg-zinc-950 pb-5">
      {/* NAVBAR */}
      <Navbar user={user} />
      {/* USER WELCOME */}
      <div>
        <h1 className="text-4xl font-bold text-center pt-3">Welcome <span className="text-sky-500">{location.state.user.username}</span></h1>
      </div>
      {/* FORM */}
      <div className="mx-5">
        <section className="bg-gray-2 m-auto rounded-x max-w-4xl mt-5 rounded-md">
          <div className="p-8 shadow-lg">
            <form className="space-y-4"
              onSubmit={createReport}>
              <div className="w-full">
                <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-solid max-w-full" placeholder="Title" type="text" required />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 max-w-full">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-sky-800">Ubication</p>
                  <select value={ubication} onChange={(e) => setUbication(e.target.value)} className="select select-solid-primary max-w-full mt-1" required>
                    <option value="sputnik">Sputnik</option>
                    <option value="apolo">Apolo</option>
                    <option value="artemis">Artemis</option>
                    <option value="review 1">Review 1</option>
                    <option value="review 2">Review 2</option>
                    <option value="hunters">Hunters</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="text-center font-bold my-2 text-sky-800">Category</p>
                <div id="group1" className="flex flex-row gap-3 justify-center items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="radio1">Digital</label>
                    <input name="category" value="digital" checked={category === "digital"} onChange={(e) => setCategory(e.target.value)} type="radio" className="radio radio-bordered-primary" />
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="radio1">Physical</label>
                    <input name="category" value="physical" checked={category === "physical"} onChange={(e) => setCategory(e.target.value)} type="radio" className="radio radio-bordered-primary" />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-solid max-w-full" placeholder="Description" rows="8" id="message" required></textarea>
              </div>

              <div className="mt-4">
                <button type="submit" className="rounded-lg btn btn-primary btn-block">Create Report</button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  )
}