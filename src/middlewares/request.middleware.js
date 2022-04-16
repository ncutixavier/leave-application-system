import Request from "../models/Request";

export const checkPreviousRequest = async (req, res, next) => {
  const request = await Request.find().sort({ _id: -1 }).limit(1);
  if (request.length > 0) {
    if (request[0].status === "pending") {
      return res.status(400).json({
        message: "You have a pending request",
      });
    }
  }
  next();
};

export const checkRequestExists = async (req, res, next) => {
  const request = await Request.findById(req.params.id);
  if (!request) {
    return res.status(404).json({
      message: "Request has not found",
    });
  }
  if (request.user != req.user._id && req.user.role != "admin") {
    return res.status(401).json({
      message: "Request does not belong to you",
    });
  }
  req.request = request;
  next();
};

export const checkPendingRequest = async (req, res, next) => {
  const request = await Request.findById(req.params.id);
  if (request.status.toLowerCase() !== "pending") {
    return res.status(400).json({
      message: "Request is being processed, please wait",
    });
  }
  next();
};
