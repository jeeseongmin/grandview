import Sidebar from "components/Sidebar";
import L, { CRS } from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";

const MainScreen = () => {
  var map, newMarker, markerLocation, image, marker, onLocationfound;
  var slideToUntil = performance.now();
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

    map.on("locationfound", onLocationfound);

    map.fitBounds(image.getBounds());
    var latlngbounds = new L.latLngBounds();
    const mapWidth = map._container.offsetWidth;
    const mapHeight = map._container.offsetHeight;
    marker = L.marker([0, 0]).addTo(map);
    var marker1 = L.marker(L.latLng(size.height / 2, size.width / 2)).addTo(
      map
    );
    var marker2 = L.marker(
      L.latLng((size.height / 2) * -1, size.width / 2)
    ).addTo(map);
    var marker3 = L.marker(L.latLng(450, 500)).addTo(map);
    var marker4 = L.marker(L.latLng(-450, 500)).addTo(map);
  }, [drawing]);

  /**
   * Marker의 위치를 업데이트하는 함수
   */
  onLocationfound = async function (e) {
    await marker.setLatLng(e.latlng);
  };

  /**
   * 마커를 움직이는 함수
   *
   * startPoint와 endPoint의 GeoJson을 입력받으면 그곳에서부터 출발하게된다.
   * params()
   */

  /**
   * 마커를 움직이는 함수
   * @param {*} startJson
   * @param {*} endJson
   */
  const movingMarker = async (startPoint, endPoint, speed) => {
    // 아래와 같이 geoJson읇 받았다고 가정.
    /**
     * GeoJson에서는 coordinates의 첫 번째 요소가 latitude, 두 번째 요소가 longitude이다.
     */
    const geoJson_start = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [startPoint.longitude * 1, startPoint.latitude * 1],
          },
        },
      ],
    };
    const geoJson_end = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [endPoint.longitude * 1, endPoint.latitude * 1],
          },
        },
      ],
    };

    const startP = {
      latitude: Number(geoJson_start.features[0].geometry.coordinates[1]),
      longitude: Number(geoJson_start.features[0].geometry.coordinates[0]),
    };
    const endP = {
      latitude: Number(geoJson_end.features[0].geometry.coordinates[1]),
      longitude: Number(geoJson_end.features[0].geometry.coordinates[0]),
    };

    /**
     * start point로 마커 세팅
     */
    await onLocationfound({
      latlng: L.latLng(startP.latitude, startP.longitude),
    });

    console.log("move start");
    var curx = Number(startP.latitude);

    const _slideTo = async () => {
      if (startP.latitude < endP.latitude) {
        if (curx >= endP.latitude) {
          console.log("move end");
          return;
        }
      } else {
        if (curx <= endP.latitude) {
          console.log("move end");
          return;
        }
      }
      curx += speed * 1 * (startP.latitude < endP.latitude ? 1 : -1);
      // console.log(startP, endP);
      /**
       * 직선의 방정식에 의해 구한 식
       *
       * y = (y2-y1) / (x2-x1) * (x - x1) + y1;
       *
       * 0번째 인덱스는 latitude(위도), 1번째 인덱스는 longitude(경도))
       *
       * 두 점이 주어졌을 때에 직선의 방정식이 나오게 되는데, 이때 이 직선의 방정식을 따라 움직여야하므로 위도가 달라짐에 따라 직선 범위 내에 해당하는 경도가 나타난다.
       */
      const curPoint = [
        curx,
        ((endP.longitude - startP.longitude) /
          (endP.latitude - startP.latitude)) *
          (curx - startP.longitude) +
          startP.longitude,
      ];
      // console.log("curPoint : ", curPoint, curx);
      await onLocationfound({
        latlng: L.latLng(curPoint[0], curPoint[1]),
      });

      L.Util.requestAnimFrame(_slideTo, this);
    };

    _slideTo();
    // return this;
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
