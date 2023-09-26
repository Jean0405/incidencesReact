import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { Navbar } from '../Navbar'
import { Cards } from '../Cards'

export const TrainerPage = () => {
  const location = useLocation();
  let user = location.state.user;

  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("Not solved")
  const [reports, setReports] = useState([])

  //FETCH REPORTS BY STATUS
  async function getIncidents() {
    const response = await (await fetch(`http://127.25.25.26:3300/v1/reports/status=${status.toLowerCase()}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("token")
      }
    })).json();
    setReports(response.data)
    return;
  }
  useEffect(() => {
    getIncidents()
  }, [status])

  //FETCH REPORTS BY USERNAME
  /* useEffect(async () => {
     
   }, [reports])*/

   const handleSubmit = async(event)=>{
    event.preventDefault();
      let res = await (await fetch(`http://127.25.25.26:3300/v1/reports/user=${username}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token")
        }
      })).json()
      console.log(res);
      setReports(res.data)
    }

  // EJEMPLO DE ARRAY
  return (
    <div className='h-screen bg-zinc-950'>
      <Navbar user={user} />
      <div>
        <h1 className="text-4xl font-bold text-center pt-4">Welcome <span className="text-sky-500">{location.state.user.username}</span></h1>
      </div>
      {/* FILTERS */}
      <div className='flex justify-around items-center mt-5'>
        {/* STATUS FILTER */}
        <div className="menu w-40 bg-zinc-800 rounded-md">
          <section className="menu-section">
            <ul className="menu-items">
              <li>
                <input type="checkbox" id="menu-1" className="menu-toggle" />
                <label className="menu-item justify-between" htmlFor="menu-1">
                  <span>{status}</span>
                  <span className="menu-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-4 h-4 stroke-content3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </label>
                <div className="menu-item-collapse">
                  <div className="min-h-0">
                    <label className="menu-item" onClick={() => setStatus("Not solved")}>Not Solved</label>
                    <label className="menu-item" onClick={() => setStatus("In process")}>In process</label>
                    <label className="menu-item" onClick={() => setStatus("Solved")}>Solved</label>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
        {/* USERNAME FILTER */}
        <form className='flex gap-2' onSubmit={handleSubmit}>
          <input type='text' name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-solid" placeholder="Username" />
          <input type="submit" value="Search" className='btn btn-solid-primary' />
        </form>
      </div>
      <div className="mx-auto p-5 grid max-2xl gap-x-5 gap-y-5 md:grid-cols-2 sm:mx-0 lg:max-w-none lg:grid-cols-3">
        {/* CARDS */}
        {reports.map((report) => (
          <Cards key={report._id} reportData={report} />
        ))}
      </div>
    </div>
  )
}
