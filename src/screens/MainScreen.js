import Sidebar from "components/Sidebar";
import L, { CRS } from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "react-leaflet";
import { CommonUtil } from "utils/calc";
import { v4 as uuidv4 } from "uuid";
const MainScreen = () => {
  var sampleMap,
    realMap,
    newMarker,
    markerLocation,
    image,
    marker,
    _marker,
    onLocationfound,
    orangeMarker,
    redMarker,
    greenMarker,
    blackMarker,
    _blackMarker;
  var greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  var redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  var orangeIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  var blackIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var slideToUntil = performance.now();
  const sampleMapRef = useRef(null);
  const realMapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState("view");
  const [allData, setAllData] = useState([]);
  const [drawing, setDrawing] = useState("https://i.imgur.com/Ion6X7C.jpg");

  const changeDrawing = async (url) => {
    sampleMap.removeLayer(marker);
    sampleMap.removeLayer(image);
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
    sampleMap = sampleMapRef.current.leafletElement;
    const bounds = [
      [(size.height / 2) * -1, (size.width / 4) * -1],
      [size.height / 2, size.width / 2],
    ];
    image = L.imageOverlay(drawing, bounds).addTo(sampleMap);
    sampleMap.on("click", addMarker);

    sampleMap.on("locationfound", onLocationfound);

    sampleMap.fitBounds(image.getBounds());

    var latlngbounds = new L.latLngBounds();
    const mapWidth = sampleMap._container.offsetWidth;
    const mapHeight = sampleMap._container.offsetHeight;
    greenMarker = L.marker([165.36328125, 259.6568341251992], {
      icon: greenIcon,
    }).addTo(sampleMap);
    redMarker = L.marker(L.latLng(size.height / 2, size.width / 2), {
      icon: redIcon,
    }).addTo(sampleMap);
    orangeMarker = L.marker(L.latLng(size.height / 2, 0), {
      icon: orangeIcon,
    }).addTo(sampleMap);

    sampleMap.on("click", function (e) {
      console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
    });

    // var marker2 = L.marker(L.latLng((size.height / 2) * -1, size.width / 2)).addTo(sampleMap);
    // var marker3 = L.marker(L.latLng(450, 500)).addTo(sampleMap);
    // var marker4 = L.marker(L.latLng(-450, 500)).addTo(sampleMap);
  }, [drawing]);

  function calcScreenCoordinates(
    data,
    theta,
    lat,
    lon,
    lonQuation,
    latQuation
  ) {
    // console.log(data, theta, lat, lon, lonQuation, latQuation);
    let tempCoordi = CommonUtil.calcCoordinatesAfterRotation(
      CommonUtil.convertUnitToLat(data[0].lng),
      data[0].lat,
      CommonUtil.convertUnitToLat(lon),
      lat,
      theta,
      true
    );
    tempCoordi.x = CommonUtil.convertUnitToLon(tempCoordi.x);
    console.log(tempCoordi.x, tempCoordi.y);
    let x = lonQuation.slope * tempCoordi.x + lonQuation.intercept;
    let y = latQuation.slope * tempCoordi.y + latQuation.intercept;

    if (blackMarker) sampleMap.removeLayer(blackMarker);
    // 처음에 x, y 그대로 들어가서 이상했는데 조금 수정하니까 잘 됨.
    blackMarker = L.marker(L.latLng(y, x), {
      icon: blackIcon,
    }).addTo(sampleMap);

    return { x: x, y: y };
  }

  const getTheta = (target) => {
    const data = new Array();
    // orange
    data.push(L.latLng(37.48565384720195, 127.20249854002395));
    // red
    data.push(L.latLng(37.482029980369944, 127.21579990202908));
    // green
    data.push(L.latLng(37.48168344105817, 127.20274269022445));

    data[0].x = orangeMarker._latlng.lat;
    data[0].y = orangeMarker._latlng.lng;
    data[1].x = redMarker._latlng.lat;
    data[1].y = redMarker._latlng.lng;
    data[2].x = greenMarker._latlng.lat;
    data[2].y = greenMarker._latlng.lng;
    console.log("data", data);
    const theta =
      CommonUtil.calTheta(
        CommonUtil.convertUnitToLat(data[0].lng),
        data[0].lat,
        CommonUtil.convertUnitToLat(data[1].lng),
        data[1].lat,
        true
      ) * -1;

    // 두 번째 입력한 위치 회전변환
    let tempCoordi = CommonUtil.calcCoordinatesAfterRotation(
      CommonUtil.convertUnitToLat(data[0].lng),
      data[0].lat,
      CommonUtil.convertUnitToLat(data[1].lng),
      data[1].lat,
      theta,
      true
    );
    tempCoordi.x = CommonUtil.convertUnitToLon(tempCoordi.x);
    data[1].lon_rotated = tempCoordi.x;
    data[1].lat_rotated = tempCoordi.y;

    // 세 번째 입력한 위치 회전변환
    let tempCoordi2 = CommonUtil.calcCoordinatesAfterRotation(
      CommonUtil.convertUnitToLat(data[0].lng),
      data[0].lat,
      CommonUtil.convertUnitToLat(data[2].lng),
      data[2].lat,
      theta,
      true
    );
    tempCoordi2.x = CommonUtil.convertUnitToLon(tempCoordi2.x);
    data[2].lon_rotated = tempCoordi2.x;
    data[2].lat_rotated = tempCoordi2.y;

    // 위도, 경도 방정식 만들기
    let lonQuation = CommonUtil.makeLinearEquation(
      data[0].lng,
      data[0].y,
      data[1].lon_rotated,
      data[1].y
    );
    let latQuation = CommonUtil.makeLinearEquation(
      data[0].lat,
      data[0].x,
      data[2].lat_rotated,
      data[2].x
    );
    console.log("slope, intercept", lonQuation, latQuation);
    // let lat =
    console.log(
      "newX, newY : ",
      calcScreenCoordinates(
        data,
        theta,
        target.lat,
        target.lng,
        lonQuation,
        latQuation
      )
    );
  };

  const mapping = () => {
    getTheta();
  };

  useEffect(() => {
    // realMap = realMapRef.current.leafletElement;
    var greenIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    var redIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    var orangeIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    var blackIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    realMap = L.map("realMap", {
      center: [37.484220390901115, 127.20952549438583],
      zoom: 15,
    });
    realMap.on("click", function (e) {
      // console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      // setTarget(L.latLng(e.latlng));
      if (_blackMarker) realMap.removeLayer(_blackMarker);
      _blackMarker = L.marker(L.latLng(e.latlng), {
        icon: blackIcon,
      }).addTo(realMap);
      getTheta(e.latlng);
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(realMap);

    var _orangeMarker = L.marker(
      L.latLng(37.48565384720195, 127.20249854002395),
      {
        icon: orangeIcon,
      }
    ).addTo(realMap);
    var _greenMarker = L.marker(
      L.latLng(37.48168344105817, 127.20274269022445),
      {
        icon: greenIcon,
      }
    ).addTo(realMap);
    var _redMarker = L.marker(
      L.latLng(37.482029980369944, 127.21579990202908),
      {
        icon: redIcon,
      }
    ).addTo(realMap);

    var _marker5 = L.marker(
      L.latLng(37.48565384720195, 127.21656195758096)
    ).addTo(realMap);
    var _marker6 = L.marker(
      L.latLng(37.48196149849642, 127.20435407528535)
    ).addTo(realMap);
  }, []);

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
      .addTo(sampleMap)
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
          <div class='mapLeft'>
            <Map
              ref={sampleMapRef}
              zoom={1}
              // maxZoom={5}
              crs={CRS.Simple}
              maxBoundsViscosity={1.0}
              // boundsOptions={{ padding: [50, 50] }}
              style={{ height: "100vh" }}
            />
          </div>
          <div>
            <button>Click</button>
          </div>
          <div class='mapRight'>
            {/* <Map
              ref={realMapRef}
              // id={realMap}
              crs={CRS.Simple}
              boundsOptions={{ padding: [50, 50] }}
              style={{ height: "100vh" }}
            /> */}
            <div id='realMap' style={{ width: "100%", height: "100vh" }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
