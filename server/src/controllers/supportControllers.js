import * as supportServices from "../services/supportServices.js";

/**
 * *PUT REPORT BY SUPPORT
 */
export const putReportBySupport = async (req, res) => {
  try {
    await supportServices.putReportBySupport({
      _id: req.params.id,
      status: req.body.status,
      diagnosis: req.body.diagnosis,
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

/**
 * *GET ALL SUPPORTS
 */
export const getAllSupports = async (req, res) => {
  try {
    let data = await supportServices.getAllSupports();
    res.status(200).json({
      status: 200,
      message: "REPORT SUCCESSFULLY OBTAINED",
      user: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "ERROR GETTING THE REPORTS",
      errorInfo: error.message,
    });
  }
};
