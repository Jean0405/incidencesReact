import * as camperServices from "../services/camperServices.js";

/**
 * *CREATE NEW REPORT ABOUT AN INCIDENT
*/
export const postNewReport = async (req, res) => {
  try {
    let data = await camperServices.postNewReport(req.body);
    res.status(200).json({
      status: 200,
      message: "THE REPORT HAS BEEN SUCCESSFULLY REGISTERED",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: 500, errorInfo: error.message });
  }
};
