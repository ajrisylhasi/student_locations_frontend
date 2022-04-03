function getDate(dateStr) {
  const date = new Date(dateStr);
  const formatted = `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()} ${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
  if (formatted === "NaN Invalid Date NaN") {
    return "";
  }
  return formatted;
}

export default getDate;
