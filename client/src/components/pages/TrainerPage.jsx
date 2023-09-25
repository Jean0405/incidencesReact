import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { Navbar } from '../Navbar'
import { Cards } from '../Cards'

export const TrainerPage = () => {
  const location = useLocation();
  let user = location.state.user;

  const [reports, setReports] = useState([])

  //FETCH REPORTS API
  async function getIncidents() {
    const response = await (await fetch(`http://127.25.25.26:3300/v1/reports/status=not solved`, {
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
  }, [])

  // EJEMPLO DE ARRAY
  return (
    <div className='h-screen bg-zinc-950'>
      <Navbar user={user} />
      <div className="mx-auto p-2 grid max-2xl gap-x-8 gap-y-8 md:grid-cols-2 sm:mx-0 lg:max-w-none lg:grid-cols-3">
        {/* CARDS */}
        {reports.map((report) => (
          <Cards key={report._id} reportData={report} />
        ))}
      </div>
    </div>
  )
}
