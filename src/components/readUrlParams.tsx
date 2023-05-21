export const readUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const readParams = urlParams.get("events");
  const lat = urlParams.get("lat");
  const lng = urlParams.get("lng");

  if (readParams) {
    const events = readParams.split("|");
    const title = events[0];
    const description = events[1];
    const time = events[2];
    const date = events[3];

    return { title, description, time, lng, lat, date };
  }
};
