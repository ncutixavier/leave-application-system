import Report from "../models/Report";
import { getReport } from "../services/report.service";

class ReportController {
  async getUserReport(req, res) {
    try {
      const report = await getReport(req.user._id);
      return res.status(200).json({
        report,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while getting user report",
        error: error.message,
      });
    }
  }
}

const reportController = new ReportController();
export default reportController;
