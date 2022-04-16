import {
  sendRequest,
  getAllRequests,
  updateRequest,
  deleteRequest,
} from "../services/request.service";

class RequestController {
  async createRequest(req, res) {
    try {
      const data = {
        ...req.body,
        user: req.user._id,
        status: req.body.status.toLowerCase() || "pending",
      };
      const request = await sendRequest(data);
      return res.status(201).json({
        request,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while creating request",
        error: error.message,
      });
    }
  }

  async getAllRequests(req, res) {
    try {
      const requests = await getAllRequests(req.user);
      return res.status(200).json({
        requests,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while getting all requests",
        error: error.message,
      });
    }
  }

  async updateRequest(req, res) {
    try {
      const { id } = req.params;
      const request = await updateRequest(id, {
        startDate: req.body.startDate || req.request.startDate,
        returnDate: req.body.returnDate || req.request.returnDate,
        numberOfDays: req.body.numberOfDays || req.request.numberOfDays,
        type: req.body.type || req.request.type,
        reason: req.body.reason || req.request.reason,
      });
      return res.status(200).json({
        request,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating request",
        error: error.message,
      });
    }
  }

  async deleteRequest(req, res) {
    try {
      const { id } = req.params;
      const request = await deleteRequest(id);
      return res.status(200).json({
        message: "Request deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while deleting request",
        error: error.message,
      });
    }
  }
}

const requestController = new RequestController();
export default requestController;
