import { readUrlParams } from "./readUrlParams";
import L from "leaflet";

const generateGoogleMapsLink = (latitude: number, longitude: number) => {
  const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  console.log(mapsLink);
  return mapsLink;
};
export const addMarker = (
  lat: number,
  lng: number,
  map: L.Map,
  customIcon: L.Icon,
  title?: any,
  description?: any,
  time?: any,
  date?: any
) => {
  if (readUrlParams()) {
    const marker = L.marker([lat, lng], { icon: customIcon })
      .bindPopup(
        `<b>Title:</b> ${title}<br><b>Description:</b> ${description}<br><br><b>Date:</b> ${date}<br><b>Time:</b> ${time}<br><b>Google Maps link:</b> <a href="${generateGoogleMapsLink(
          lat,
          lng
        )}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a><br>`
      )
      .addTo(map);

    return marker; // Return the marker object
  }
};
