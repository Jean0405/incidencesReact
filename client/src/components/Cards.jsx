import React, { useState } from 'react'

export const Cards = (props) => {

  let reports = props.reportData

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function badgeClass(state) {
    let badgeClass = "badge text-muted";

    if (reports.state === "not solved") {
      badgeClass = "badge badge-flat-error text-red-600";
    } else if (reports.state === "in process") {
      badgeClass = "badge badge-flat-primary text-blue-500";
    } else {
      badgeClass = "badge badge-flat-success text-green-500";
    }
    return (
      badgeClass
    );
  }

  return (
    <div id={reports._id} className="w-full rounded bg-zinc-200/10">
      <div className="card-body">
        <span className="text-blue-500">{reports.camper.username}</span>
        <h2 className="card-header">{reports.title.toUpperCase()}</h2>
        <h4 className='font-bold text-blue-500'>{capitalizeFirstLetter(reports.ubication)}</h4>
        <p className="text-content2">{reports.description}</p>
        <div className="w-full flex gap-2">
          <span className={badgeClass(reports.state)}>{reports.state}</span>
          <span className="badge text-light-700">PHP</span>
        </div>
      </div>
    </div>
  )
}
