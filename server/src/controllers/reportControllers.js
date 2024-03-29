import * as reportServices from "../services/reportServices.js";

/**
 * *GET REPORTS
 */
export const getAllReports = async (req, res) => {
  try {
    let data = await reportServices.getAllReports();
    res.status(200).json({
      status: 200,
      message: "REPORT SUCCESSFULLY OBTAINED",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "ERROR GETTING THE REPORTS",
      errorInfo: error.message,
    });
  }
};


/**
 * *GET REPORT BY ID
 */
export const getReportById = async (req, res) => {
  try {
    let data = await reportServices.getReportById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "REPORT SUCCESSFULLY OBTAINED",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "ERROR GETTING THE REPORT",
      errorInfo: error.message,
    });
  }
};


/**
 * *GET REPORT BY STATUS
 */
export const getReportByStatus = async (req, res) => {
  try {
    let data = await reportServices.getReportsByStatus(req.params.status);
    res.status(200).json({
      status: 200,
      message: "REPORTS SUCCESSFULLY OBTAINED",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "ERROR GETTING REPORTS",
    });
  }
};

/**
 * *GET REPORT BY SEVERITY
 */
export const getReportBySeverity = async (req, res) => {
  try {
    let data = await reportServices.getReportsBySeverity(req.params.severity);
    res.status(200).json({
      status: 200,
      message: "REPORTS SUCCESSFULLY OBTAINED",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "ERROR GETTING REPORTS",
      errorInfo: error.message,
    });
  }
};

/**
 * *GET REPORT BY USERNAME
 */
export const getReportByUsername = async (req, res) => {
  try {
    let data = await reportServices.getReportsByUsername(req.params.username);

    if (data.length == 0)
      res.status(404).json({
        status: 404,
        message: "THE USER HAS NOT REPORTS",
        data: data
      });
    else
      res.status(200).json({
        status: 200,
        message: "REPORTS SUCCESSFULLY OBTAINED",
        data: data,
      });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "ERROR GETTING REPORTS",
      errorInfo: error.message,
    });
  }
};

/**
 * *DELETE REPORT BY ID
 */
export const deleteReportById = async (req, res) => {
  try {
    let data = await reportServices.deleteReportById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "REPORT SUCCESFULLY DELETED",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "ERROR DELETING THE REPORT",
      errorInfo: error.message,
    });
  }
};
