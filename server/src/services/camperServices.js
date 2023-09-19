import { connDB } from "../databases/connectDB.js";
import { DateTime } from "luxon"; // it's a library that can help us with dates and times 

/**
 * *CREATE NEW REPORT ABOUT AN INCIDENT
 */
export const postNewReport = async (info) =>{
  let db = await connDB();
  let collection = db.collection("reports");

  //using luxon, we assign the date with our local time zone
  const currentDate = DateTime.now().setZone('America/Bogota'); 

  //we create the structure with which we will save the new report
  const newReport = {
    ...info,
    date: currentDate.toJSDate()
  }
  
  //Insert new report to Database
  collection.insertOne(newReport); 
  return newReport
}
