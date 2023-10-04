import { connDB } from "../databases/connectDB.js";
import { ObjectId } from "mongodb";

/**
 * *PUT REPORT BY SUPPORT
 */
export const putReportBySupport = async (info) => {
  let db = await connDB();
  let collection = db.collection("reports");

  const filter = {
    _id: new ObjectId(info._id),
  };

  const update = {
    $set: {
      state: info.status,
      "support.diagnosis": info.diagnosis,
    },
  };
  console.log(filter,update);

  let data = await collection.updateOne(filter, update);
  console.log(data);
  return;
};

/**
 * *GET ALL SUPPORTS
 */
export const getAllSupports = async () => {
  let db = await connDB();
  let collection = db.collection("users");
  let data = await collection.find({ role: "support" }).toArray();
  return data;
};
