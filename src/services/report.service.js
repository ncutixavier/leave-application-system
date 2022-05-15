import Report from "../models/Report.js";

export const createReport = async (report) => {
  const reportCreated = await Report(report);
  reportCreated.save();
  return reportCreated;
};

export const getReport = async (userId) => { 
  const report = await Report.findOne({ user: userId });
  return report;
}

export const updateReport = async (reportId, report) => {
  const reportUpdated = await Report.findOneAndUpdate({ _id: reportId }, report, { new: true });
  return reportUpdated;
}
