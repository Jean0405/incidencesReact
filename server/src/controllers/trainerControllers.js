import * as trainerServices from "../services/trainerServices.js";

/**
 * *PUT REPORT BY TRAINER
 */
export const putReportByTrainer = async (req, res) => {
  try {
    await trainerServices.putReportByTrainer({
      _id: req.params.id,
      severity: req.body.severity,
      trainer: {
        _id: req.body.trainer._id,
        username: req.body.trainer.username,
      },
      support: {
        _id: req.body.support._id,
        username: req.body.support.username,
      },
    });
    res
      .status(200)
      .json({ status: 200, message: "REPORT SUCCESSFULLY UPDATED" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "ERROR UPDATING THE REPORT",
      errorInfo: error.message,
    });
  }
};
