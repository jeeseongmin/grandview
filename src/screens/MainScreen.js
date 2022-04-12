import Sidebar from "components/Sidebar";
import L, { CRS } from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";

const MainScreen = () => {
  var map, newMarker, markerLocation;
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState("view");

  useEffect(() => {
    console.log("markers", markers);
  }, [markers]);

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

    const image = L.imageOverlay(
      "https://i.imgur.com/Ion6X7C.jpg",
      bounds
    ).addTo(map);
    map.on("click", addMarker);
    map.fitBounds(image.getBounds());
    var latlngbounds = new L.latLngBounds();
    const mapWidth = map._container.offsetWidth;
    const mapHeight = map._container.offsetHeight;
    // var marker = L.marker([-50, -50]).addTo(map);
    // var marker = L.marker([20, 20]).addTo(map);
  }, []);

  const addMarker = useCallback(async (e) => {
    console.log("addMarker mode : ", localStorage.getItem("mode"));
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
          "</div><button class='popupBtn'>삭제하기</button><button class='popupBtn'>내용 수정하기</button></div>"
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
          <Sidebar mode={mode} setMode={setMode} />
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
