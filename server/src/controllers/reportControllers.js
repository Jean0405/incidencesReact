import * as reportServices from "../services/reportServices.js"

/**
 * *CREATE NEW REPORT ABOUT AN INCIDENT
 */
export const getReportById = async (req, res)=>{
  try {
    let data = await reportServices.getReportById(req.params.id);
    res.status(200).json({status:200, message: "REPORT OBTAINED", datas: data})
  } catch (error) {
    res.status(500).json({status:500, message: "ERROR GETTING THE REPORT", errorInfo: error.message})
  }
}

/**
 * *GET REPORT BY ID
 */
export const postNewReport = async (req, res) => {
  try {
    let data = await reportServices.postNewReport(req.body);
    res
      .status(200)
      .json({
        status: 200,
        message: "THE REPORT HAS BEEN SUCCESSFULLY REGISTERED",
        data: data,
      });
  } catch (error) {
    res.status(500).json({ status: 500, errorInfo: error.message });
  }
};

/**
 * *PUT REPORT
 */
export const putReport = async (req, res)=>{
  try {
    await reportServices.putReport({
      _id: req.params.id,
      severity: req.body.severity,
      trainer:{
        _id:req.body.trainer._id,
        username: req.body.trainer.username
      },
      support:{
        _id:req.body.support._id,
        username: req.body.support.username
      }
    });
    res.status(200).json({status:200, message: "REPORT SUCCESSFULLY UPDATED"})
  } catch (error) {
    res.status(500).json({status:500, message: "ERROR UPDATING THE REPORT", errorInfo: error.message})
  }
}