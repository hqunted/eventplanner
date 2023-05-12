export const readUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const readParams = urlParams.get("events");
  const lat = urlParams.get("lat");
  const lng = urlParams.get("lng");


  if (readParams) {
    const events = readParams.split("|");


    return { events, lng, lat };
  }
};
