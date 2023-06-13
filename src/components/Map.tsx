import React, { useEffect, useRef, useState } from "react";
import L, { LeafletMouseEvent } from "leaflet";
import { addMarker } from "./addMarker";
import { readUrlParams } from "./readUrlParams";
import MainModal from "./MainModal";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Map = () => {
  const [pickedEvents, setPickedEvents] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const draggedMarkerDataRef = useRef({ lat: 0, lng: 0 });
  const formDataRef = useRef({
    title: "",
    description: "",
    date: "",
    time: "",
    publishClicked: false,
  });

  const handleGenerateUrl = (
    updatedPickedEvents: any,
    lat: number,
    lng: number
  ) => {
    const queryParams = new URLSearchParams({
      events: updatedPickedEvents.join(","),
      lat: String(lat),
      lng: String(lng),
    }).toString();
    toast.success(`CLICK ON ME TO COPY THE URL👉👉`, {
      onClick: () => {
        navigator.clipboard.writeText(
          `${window.location.origin}${window.location.pathname}?${queryParams}`
        );
      },
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return `${window.location.origin}${window.location.pathname}?${queryParams}`;
  };

  const formatDate = (date: string): string => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedDate = `${day.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year}`;

    return formattedDate;
  };
  const latString = readUrlParams()?.lat;
  const lngString = readUrlParams()?.lng;
  const urlTitle = readUrlParams()?.title;
  const urlDescription = readUrlParams()?.description;
  const urlTime = readUrlParams()?.time;
  const urlLat = Number(latString);
  const urlLng = Number(lngString);
  const urlDate = readUrlParams()?.date;
  const resolution = window.innerWidth;

  const generateGoogleMapsLink = (latitude: number, longitude: number) => {
    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    console.log(mapsLink);
    return mapsLink;
  };

  const handleResolution = () => {
    if (resolution < 1280 && resolution > 981) {
      return 24;
    } else if (resolution === 980) {
      return 64;
    } else if (resolution > 980 && resolution < 1280) {
      return 64;
    } else {
      return 28; // Default value for resolutions greater than 1280 or undefined resolution
    }
  };

  const handleFormSubmit = (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    publishClicked: boolean;
  }) => {
    console.log("Title:", data.title);
    console.log("Description:", data.description);
    console.log("Date:", data.date);
    console.log("Time:", data.time);

    formDataRef.current = data;
  };

  const customIcon = L.icon({
    iconUrl: require("../assets/markerl.png"),
    iconSize: [handleResolution(), handleResolution()],
    iconAnchor: [handleResolution() / 2, handleResolution() / 2],
  });

  useEffect(() => {
    const map = L.map("map").setView([0, 0], 12);

    const handleBackgroundMap = () => {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map);
    };
    handleBackgroundMap();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map.setView([latitude, longitude], 12);

          L.marker([latitude, longitude], { icon: customIcon })
            .bindPopup(
              `FBI thinks that you are probably around here somewhere...🕵️`
            )
            .addTo(map);
        },
        (error) => {
          console.error("Error getting the user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const urlMarker = addMarker(
      urlLat,
      urlLng,
      map,
      customIcon,
      urlTitle,
      urlDescription,
      urlTime,
      urlDate
    );

    if (!urlTitle)
      toast.info(
        "Embark on an adventure! Click on the map or me to unveil the details of your extraordinary event! 👉🗺️",
        {
          icon: "🚀",
          position: "top-center",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    setTimeout(() => {
      if (!formDataRef.current.publishClicked) {
        toast.info("You have to click on the map you know... 👉🗺️", {
          icon: "😒",
          position: "top-center",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }, 10000);

    const onMapClick = (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;

      if (!urlTitle) {
        if (formDataRef.current.title === "") {
          setModalVisible(true);
        } else {
          setModalVisible(false);
        }

        const { title, description, date, time, publishClicked } =
          formDataRef.current;
        const eventString = `${title}|${description}|${time}|${date}`;
        const updatedPickedEvents = [...pickedEvents, eventString];

        setPickedEvents(updatedPickedEvents);

        if (publishClicked && !modalVisible) {
          const marker = L.marker([lat, lng], {
            icon: customIcon,
            draggable: true,
          }).addTo(map);

          toast.info("You can drag the marker as you like 🤏", {
            position: "top-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          marker.bindPopup(
            `<b>Title:</b> ${title}<br><b>Description:</b> ${description}<br><br><b>Date:</b> ${formatDate(
              date
            )}<br><b>Time:</b> ${time}<br><b>Google Maps link:</b> <a href="${generateGoogleMapsLink(
              lat,
              lng
            )}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a><br> <b>Url:</b> ${handleGenerateUrl(
              updatedPickedEvents,
              lat,
              lng
            )}<br>`
          );
          marker.on("dragend", (event) => {
            const marker = event.target;
            const position = marker.getLatLng();
            draggedMarkerDataRef.current = position;

            marker.bindPopup(
              `<b>Title:</b> ${title}<br><b>Description:</b> ${description}<br><br><b>Date:</b> ${formatDate(
                date
              )}<br><b>Time:</b> ${time}<br><b>Google Maps link:</b> <a href="${generateGoogleMapsLink(
                draggedMarkerDataRef.current.lat,
                draggedMarkerDataRef.current.lng
              )}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a><br> <b>Url:</b> ${handleGenerateUrl(
                updatedPickedEvents,
                draggedMarkerDataRef.current.lat,
                draggedMarkerDataRef.current.lng
              )}<br>`
            );
          });

          if (formDataRef.current.title) {
            map.off("click", onMapClick);
          } else {
            map.on("click", onMapClick);
          }

          if (urlTitle !== "" && urlMarker) {
            map.removeLayer(urlMarker);
          }
        }
      }
    };

    map.on("click", onMapClick);
    return () => {
      map.on("click", onMapClick);
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ height: "100vh" }}>
      <div
        className={classNames(
          `${modalVisible ? "visible" : "invisible"}  absolute inset-0 `
        )}
        style={{ zIndex: 999 }}
      >
        <MainModal handleFormSubmit={handleFormSubmit} />
      </div>
      <ToastContainer
        position="top-left"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
