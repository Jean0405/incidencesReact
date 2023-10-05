import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from "../Navbar";

import LottieAnimation from "lottie-react";
import astronautAnimation from "../../assets/animation_ln37lp2p.json"
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import { Footer } from "../Footer";
import parseDate from "../libs/parseDate";


export const CamperPage = () => {
  const location = useLocation();
  let user = location.state.user;

  const [ubication, setUbication] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [reports, setReports] = useState([])


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
    let response = await (await fetch("http://192.168.129.72:5176/v1/campers/newReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
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

  const getReportsByUsername = async () => {
    let response = await (await fetch(`http://192.168.129.72:5176/v1/reports/user=${user.username}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })).json();
    console.log(response.data);
    setReports(response.data)
  }
  useEffect(() => {
    getReportsByUsername()
  }, []);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function borderState(state) {
    if (state == "solved") {
      return "grid bg-zinc-950 p-5 border-t-8 border-green-500"
    } else if (state == "not solved") {
      return "grid bg-zinc-950 p-5 border-t-8 border-red-500"
    } else {
      return "grid bg-zinc-950 p-5 border-t-8 border-blue-500"
    }
  }

  return (
    <div className="h-full">
      {/* NAVBAR */}
      <Navbar user={user} />
      {/* USER WELCOME */}
      <div className="pt-10">
        <h1 className="text-4xl font-bold text-center">Welcome <span className="text-sky-500">{location.state.user.username}</span></h1>
      </div>

      <div className={!visibility ? "grid place-items-center animate__animated animate__zoomIn" : "hidden"}>
        <LottieAnimation
          animationData={astronautAnimation}
          loop={true}
          width="100%"
          height="100%"
        />
      </div>
      {/* FORM */}
      <button className='btn btn-success dark:btn-solid-success fixed bottom-4 right-4 p-6 z-50' onClick={() => setVisibility(!visibility)}><FontAwesomeIcon icon={faPlus} /></button>
      <div className={visibility ? "mx-5 animate__animated animate__zoomIn" : "mx-5 hidden"}>
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
      <h1 className="text-center text-4xl font-bold py-5">Reports <span className="text-sky-500">you made</span></h1>
      <div className="grid gap-5 md:gap-9 md:grid-cols-2 lg:grid-cols-3 px-5 pb-8">
        {
          reports.map((report, index) => (
            <div key={index} className={borderState(report.state)}>
              <span className="text-end text-sm text-zinc-500 font-bold pb-2">{parseDate(report.date)}</span>
              <span className="text-center text-blue-500 font-bold">{report.title.toUpperCase()}</span>
              <span className="text-center text-sm text-white pt-2">{report.description}</span>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}