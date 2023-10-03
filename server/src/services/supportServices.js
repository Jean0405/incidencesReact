import { connDB } from "../databases/connectDB.js";
import { ObjectId } from "mongodb";

/**
 * *PUT REPORT BY SUPPORT
 */
export const putReportBySupport = async (info) => {
  console.log(info);
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

  await collection.updateOne(filter, update);
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
