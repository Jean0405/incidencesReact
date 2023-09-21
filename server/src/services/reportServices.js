import { connDB } from "../databases/connectDB.js";
import { ObjectId } from "mongodb";

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

/**
 * *GET REPORT BY ID
 */
export const getReportById = async (reportId) => {
  let db = await connDB();
  let collection = db.collection("reports");
  let data = await collection.find({ _id: new ObjectId(reportId) }).toArray();

  return data;
};

/**
 * *GET REPORTS BY STATUS
 */
export const getReportsByStatus = async (status) => {
  let db = await connDB();
  let collection = db.collection("reports");

  let data = await collection.find({ state: status }).toArray();
  return data;
};

/**
 * *GET REPORTS BY SEVERITY
 */
export const getReportsBySeverity = async (severity) => {
  let db = await connDB();
  let collection = db.collection("reports");

  let data = await collection.find({ severity: severity }).toArray();
  return data;
};

/**
 * *GET REPORTS BY USERNAME
 */
export const getReportsByUsername = async (username) => {
  let db = await connDB();
  let collection = db.collection("reports");

  let camper = await collection.find({ "camper.username": username }).toArray();

  if (camper.length == 0) {
    let support = await collection
      .find({ "support.username": username })
      .toArray();
    return support;
  }
  return camper;
};

