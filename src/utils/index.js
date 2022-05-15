export const addDays = (startDate, days) => {
  let dt = new Date(startDate);
  let returnDate = new Date(dt.setDate(dt.getDate() + days));
  return returnDate;
};

export const getReturnDate = (start, days) => {
  let startDate = new Date(`${start}`);
  let returnDate = new Date(startDate.setDate(startDate.getDate() + days));
  let index = new Date(start);
  while (index < returnDate) {
    const dayOfWeek = index.getDay();
    if (dayOfWeek == 6 || dayOfWeek == 0) {
      returnDate = addDays(returnDate, 1);
    }
    index = addDays(index, 1);
  }
  return returnDate;
};
