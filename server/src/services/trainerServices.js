import { connDB } from "../databases/connectDB.js";
import { ObjectId } from "mongodb";

/**
 * *PUT REPORT BY TRAINER
 */
export const putReportByTrainer = async (info) => {
  let db = await connDB();
  let collection = db.collection("reports");

  console.log(info);
  const filter = {
    _id: new ObjectId(info._id),
  };

  const update = {
    $set: {
      severity: info.severity,
      trainer: {
        _id: info.trainer._id,
        username: info.trainer.username,
      },
      support: {
        _id: info.support._id,
        username: info.support.username,
      },
    },
  };

  await collection.updateOne(filter, update);
  return;
};
