const convertTime = (event) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const startDate = new Date(event.start_time);
  const endDate = new Date(event.end_time);

  const startMonth = months[startDate.getMonth()];
  const endMonth = months[endDate.getMonth()];
  const startDay = startDate.getDay();
  const endDay = endDate.getDay();
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  return `${startMonth} ${startDay}, ${startYear} to ${endMonth} ${endDay}, ${endYear}`;
};

export { convertTime };
