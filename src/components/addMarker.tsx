import { readUrlParams } from "./readUrlParams";
import L from "leaflet";

export const addMarker = (
  lat: number,
  lng: number,
  map: L.Map,
  customIcon: L.Icon,
  input?: boolean,
  title?: any,
  description?: any,
  time?: any
) => {
  if (readUrlParams! === null)
    input === true
      ? L.marker([lat, lng], { icon: customIcon })
          .bindPopup(
            `<b>Title:</b>${title}<br><b>Description:</b> ${description}<br><b>Time:</b> ${time}<br>`
          )
          .addTo(map)
      : L.marker([lat, lng], { icon: customIcon }).addTo(map);
};
