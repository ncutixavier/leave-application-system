import Request from "../models/Request";

export const getAllRequests = async (user) => {
  const role = ["admin", "manager"];
  if (user.role.includes(role)) {
    const requests = await Request.find().sort([["startDate", "descending"]]);
    return requests;
  } else {
    const requests = await Request.find({ user: user._id }).sort([
      ["startDate", "descending"],
    ]);
    return requests;
  }
};

export const sendRequest = async (request) => {
  const requestCreated = await Request.create(request);
  return requestCreated;
};

export const updateRequest = async (id, request) => {
  const requestUpdated = await Request.findByIdAndUpdate(id, request, {
    new: true,
  });
  return requestUpdated;
};

export const deleteRequest = async (id) => { 
  const requestDeleted = await Request.findByIdAndDelete(id);
  return requestDeleted;
}
