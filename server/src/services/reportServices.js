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
export const getReportById = async(reportId)=>{
    let db = await connDB();
    let collection = db.collection("reports");
    let data = await collection.find({_id: new ObjectId(reportId)}).toArray();

    return data;
}

/**
 * *PUT REPORT
 */
export const putReport = async(info)=>{
    let db = await connDB();
    let collection = db.collection("reports");

    const filter = {
        _id: new ObjectId(info._id)
    };

    const update = {
        $set:{
            severity: info.severity,
            trainer: {
                _id: info.trainer._id,
                username: info.trainer.username
            },
            support: {
                _id:info.support._id,
                username: info.support.username
            }
        }
    };  

    let data = await collection.updateOne(filter, update);
    return;
}
