const formatDate = (date) => {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var formatedDate =
    date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
  console.log(formatedDate);
  return formatedDate;
};
export { formatDate };
