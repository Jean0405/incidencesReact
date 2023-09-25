import { connDB } from "../databases/connectDB.js";

/**
 * *CREATE NEW REPORT ABOUT AN INCIDENT
 */
export const postNewReport = async (info) => {
  let db = await connDB();
  let collection = db.collection("reports");

  const currentDate = new Date();

  //we create the structure with which we will save the new report
  const newReport = {
    date: currentDate,
    severity: "mild",
    state: "not solved",
    ...info,
  };

  //Insert new report to Database
  await collection.insertOne(newReport);

  return newReport;
};
