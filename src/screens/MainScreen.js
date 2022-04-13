import Sidebar from "components/Sidebar";
import L, { CRS } from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";

const MainScreen = () => {
  var map, newMarker, markerLocation, image, marker, onLocationfound;
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState("view");
  const [drawing, setDrawing] = useState("https://i.imgur.com/Ion6X7C.jpg");

  const changeDrawing = async (url) => {
    map.removeLayer(marker);
    map.removeLayer(image);
    if (url === "reset") setDrawing("https://i.imgur.com/Ion6X7C.jpg");
    else setDrawing(url);
  };
  const changeMode = (text) => {
    localStorage.setItem("mode", text);
    setMode(text);
  };

  useEffect(() => {
    localStorage.setItem("room", 1);
    changeMode("view");
    var size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight,
      offsetHeight: document.body.offsetHeight,
      offsetWidth: document.body.offsetWidth,
    };
    map = mapRef.current.leafletElement;
    const bounds = [
      [(size.height / 2) * -1, (size.width / 2) * -1],
      [size.height / 2, size.width / 2],
    ];
    image = L.imageOverlay(drawing, bounds).addTo(map);
    map.on("click", addMarker);
    onLocationfound = async function (e) {
      await marker.setLatLng(e.latlng);
      // await map.setView(marker.getLatLng(), map.getZoom());
    };

    map.on("locationfound", onLocationfound);

    map.fitBounds(image.getBounds());
    var latlngbounds = new L.latLngBounds();
    const mapWidth = map._container.offsetWidth;
    const mapHeight = map._container.offsetHeight;
    marker = L.marker([0, 0]).addTo(map);

    // .bindPopup(
    //   "<div name='removeClickM' class='popupWrapper' id=" +
    //     0 +
    //     "_" +
    //     0 +
    //     "><div class='popupDataWrapper'>직무 : 배정 요망</div><div class='popupDataWrapper'>위도(lat) : " +
    //     0 +
    //     "</div><div class='popupDataWrapper'>위도(lat) : " +
    //     0 +
    //     "</div></div>"
    // )
    // .openPopup();
    // var marker = L.marker([-50, -50]).addTo(map);
    // var marker = L.marker([20, 20]).addTo(map);
  }, [drawing]);

  const movingMarker = async (direction) => {
    if (direction === "top")
      onLocationfound({
        latlng: [marker._latlng.lat + 3, marker._latlng.lng],
      });
    else if (direction === "bottom")
      onLocationfound({
        latlng: [marker._latlng.lat - 3, marker._latlng.lng],
      });
    else if (direction === "left")
      onLocationfound({
        latlng: [marker._latlng.lat, marker._latlng.lng - 3],
      });
    else if (direction === "right")
      onLocationfound({
        latlng: [marker._latlng.lat, marker._latlng.lng + 3],
      });
  };

  const addMarker = useCallback(async (e) => {
    if (localStorage.getItem("mode") === "view") return;
    var marker = await new L.marker(e.latlng)
      .addTo(map)
      .bindPopup(
        "<div name='removeClickM' class='popupWrapper' id=" +
          e.latlng.lat +
          "_" +
          e.latlng.lng +
          "><div class='popupDataWrapper'>직무 : 배정 요망</div><div class='popupDataWrapper'>위도(lat) : " +
          e.latlng.lat +
          "</div><div class='popupDataWrapper'>위도(lat) : " +
          e.latlng.lng +
          "</div></div>"
      )
      .openPopup();
    await setMode("view");

    const newMarker = {
      id: uuidv4(),
      name: "anonymous",
      job: "배정 요망",
      latlng: e.latlng,
      image: "",
      room: localStorage.getItem("room"),
      isDraggable: false,
      isEdit: false,
      isDeleted: false,
    };
    const cp = [...markers];
    cp.push(newMarker);
    setMarkers(cp);
    changeMode("view");
  }, []);

  return (
    <>
      <div class='wrapper'>
        <div class='sidebarWrapper'>
          <Sidebar
            mode={mode}
            setMode={setMode}
            changeDrawing={changeDrawing}
            movingMarker={movingMarker}
          />
        </div>
        <div class='mapWrapper'>
          <Map
            ref={mapRef}
            // zoom={-1}
            maxZoom={5}
            crs={CRS.Simple}
            maxBoundsViscosity={1.0}
            // boundsOptions={{ padding: [50, 50] }}
            style={{ height: "100vh" }}
          />
        </div>
      </div>
    </>
  );
};

export default MainScreen;
