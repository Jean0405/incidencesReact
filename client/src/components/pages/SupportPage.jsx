import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { useEffect, useState } from 'react';
import { CardsSupport } from '../CardsSupport';
import LottieAnimation from "lottie-react";
import astronautAnimation from "../../assets/animation_ln530tdm.json"

export const SupportPage = () => {
  const location = useLocation();
  let user = location.state.user;

  const [reportList, setReportList] = useState([])
  const [reportList2, setReportList2] = useState([])

  const getReportsBySupport = async () => {
    let response = await (await fetch(`http://192.168.129.72:5176/v1/reports/user=${user.username}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })).json();
    setReportList(response.data)
  }
  useEffect(() => {
    getReportsBySupport();
  }, [])

  useEffect(() => {
    getReportsBySupport();
  }, [reportList2])

  return (
    <div className=''>
      <Navbar user={user} />
      <div>
        <h1 className="text-4xl font-bold text-center pt-5">Welcome <span className="text-sky-500">{location.state.user.username}</span></h1>
      </div>
      <div className={reportList.length == 0 ? "mx-auto p-5 grid grid-cols-1 max-2xl gap-x-5 gap-y-5 sm:mx-0 lg:max-w-none" : "mx-auto p-5 grid max-2xl gap-x-5 gap-y-5 md:grid-cols-2 sm:mx-0 lg:max-w-none lg:grid-cols-3"}>
        {/* CARDS */}
        {reportList.length == 0 ? (
          <div className="grid place-items-center animate__animated animate__zoomIn">
            <LottieAnimation
              animationData={astronautAnimation}
              loop={true}
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          reportList.map((report) => (
            <CardsSupport key={report._id} reportData={report} setReports={setReportList2} user={user} />
          ))
        )}
      </div>
    </div>
  )
}
