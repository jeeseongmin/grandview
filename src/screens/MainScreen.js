import Sidebar from "components/Sidebar";
import L, { CRS } from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "react-leaflet";
import { CommonUtil } from "utils/util";
import { v4 as uuidv4 } from "uuid";
const MainScreen = () => {
  var sampleMap,
    realMap,
    newMarker,
    markerLocation,
    image,
    marker,
    _marker,
    sampleOnLocationFound,
    sampleOrangeMarker,
    sampleRedMarker,
    sampleGreenMarker,
    sampleBlackMarker,
    realOnLocationFound,
    realRedMarker,
    realGreenMarker,
    realOrangeMarker,
    realBlackMarker;
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

  /**
   * 도면 화면에 대한 구현
   * 1. Map 생성 후 Map에 함수 매칭
   * 2. Marker 생성
   */
  useEffect(() => {
    sampleMap = sampleMapRef.current.leafletElement;

    // 비율에 따라 다르게 설정
    // 이후에 greenMarker position 재설정 필요
    // const bounds = [
    //   [-378, -630.5],
    //   [378, 630.5],
    // ];
    const bounds = [
      [-378 * 2, -630.5 * 2],
      [378 * 2, 630.5 * 2],
    ];
    image = L.imageOverlay(drawing, bounds).addTo(sampleMap);
    sampleMap.on("click", addMarker);

    sampleMap.on("locationfound", sampleOnLocationFound);

    sampleMap.fitBounds(image.getBounds());

    sampleGreenMarker = L.marker([162.90104153938591, 164.87130123190582], {
      icon: greenIcon,
    }).addTo(sampleMap);

    sampleRedMarker = L.marker(L.latLng(bounds[1][0], bounds[1][1]), {
      icon: redIcon,
    }).addTo(sampleMap);

    sampleOrangeMarker = L.marker(L.latLng(bounds[1][0], 0), {
      icon: orangeIcon,
    }).addTo(sampleMap);

    sampleMap.on("click", function (e) {
      console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
    });
  }, [drawing]);

  /**
   * 원하는 GPS 좌표를 실제 화면 좌표로 변환하는 방법.
   * @param {*} data
   * @param {*} theta
   * @param {*} lat
   * @param {*} lon
   * @param {*} lonQuation
   * @param {*} latQuation
   * @returns
   */
  function calcScreenCoordinates(
    data,
    theta,
    lat,
    lon,
    lonQuation,
    latQuation
  ) {
    let tempCoordi = CommonUtil.calcCoordinatesAfterRotation(
      CommonUtil.convertUnitToLat(data[0].lng),
      data[0].lat,
      CommonUtil.convertUnitToLat(lon),
      lat,
      theta,
      true
    );
    tempCoordi.x = CommonUtil.convertUnitToLon(tempCoordi.x);
    let y = latQuation.slope * tempCoordi.y + latQuation.intercept;
    let x = lonQuation.slope * tempCoordi.x + lonQuation.intercept;
    if (sampleBlackMarker) sampleMap.removeLayer(sampleBlackMarker);
    // 처음에 x, y 그대로 들어가서 이상했는데 조금 수정하니까 잘 됨.
    sampleBlackMarker = L.marker(L.latLng(y, x), {
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

    data[0].x = sampleOrangeMarker._latlng.lat;
    data[0].y = sampleOrangeMarker._latlng.lng;
    data[1].x = sampleRedMarker._latlng.lat;
    data[1].y = sampleRedMarker._latlng.lng;
    data[2].x = sampleGreenMarker._latlng.lat;
    data[2].y = sampleGreenMarker._latlng.lng;
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

    return calcScreenCoordinates(
      data,
      theta,
      target.lat,
      target.lng,
      lonQuation,
      latQuation
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
    realMap.on("locationfound", realOnLocationFound);

    realMap.on("click", function (e) {
      console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      // setTarget(L.latLng(e.latlng));
      if (realBlackMarker) realMap.removeLayer(realBlackMarker);
      realBlackMarker = L.marker(L.latLng(e.latlng), {
        icon: blackIcon,
      }).addTo(realMap);
      getTheta(e.latlng);
    });

    // 실제 지도 tileLayer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(realMap);

    realOrangeMarker = L.marker(
      L.latLng(37.48565384720195, 127.20249854002395),
      {
        icon: orangeIcon,
      }
    ).addTo(realMap);
    realGreenMarker = L.marker(
      L.latLng(37.48168344105817, 127.20274269022445),
      {
        icon: greenIcon,
      }
    ).addTo(realMap);
    realRedMarker = L.marker(L.latLng(37.482029980369944, 127.21579990202908), {
      icon: redIcon,
    }).addTo(realMap);

    // var _marker5 = L.marker(
    //   L.latLng(37.48565384720195, 127.21656195758096)
    // ).addTo(realMap);
    // var _marker6 = L.marker(
    //   L.latLng(37.48196149849642, 127.20435407528535)
    // ).addTo(realMap);
  }, []);

  /**
   * Marker의 위치를 업데이트하는 함수
   */
  sampleOnLocationFound = async function (e) {
    await sampleBlackMarker.setLatLng(e.latlng);
  };
  /**
   * Marker의 위치를 업데이트하는 함수
   */
  realOnLocationFound = async function (e) {
    await realBlackMarker.setLatLng(e.latlng);
  };

  /**
   * Moving Marker Test
   * @param {*} startPoint
   * @param {*} endPoint
   * @param {*} speed
   */
  const moveAtoA = async (_startPoint, _endPoint, speed) => {
    console.log("moveAtoA : ", _startPoint, _endPoint);
    console.log(
      "trans : ",
      getTheta({ lat: _startPoint[0], lng: _startPoint[1] }),
      getTheta({ lat: _endPoint[0], lng: _endPoint[1] })
    );

    let startPoint = getTheta({ lat: _startPoint[0], lng: _startPoint[1] });
    let endPoint = getTheta({ lat: _endPoint[0], lng: _endPoint[1] });

    await sampleOnLocationFound({
      latlng: L.latLng(startPoint[0], startPoint[1]),
    });

    console.log("move start");
    var curx = Number(startPoint[0]);
    var duration = 2000;
    var _slideToDuration = duration;
    var _slideToUntil = performance.now() + duration;
    const _slideTo = async () => {
      var remaining = _slideToUntil - performance.now();

      if (remaining < 0) {
        return;
      }
      var startP = sampleMap.latLngToContainerPoint({
        lat: startPoint[0],
        lng: startPoint[1],
      });
      var endP = sampleMap.latLngToContainerPoint({
        lat: endPoint[0],
        lng: endPoint[1],
      });
      var percentDone = (_slideToDuration - remaining) / _slideToDuration;

      var currPoint = endP
        .multiplyBy(percentDone)
        .add(startP.multiplyBy(1 - percentDone));
      var currLatLng = sampleMap.containerPointToLatLng(currPoint);
      await sampleOnLocationFound({
        latlng: currLatLng,
      });

      L.Util.requestAnimFrame(_slideTo, this);
    };

    await _slideTo().then(async () => {
      console.log("haha", getTheta({ lat: _endPoint[0], lng: _endPoint[1] }));
      await sampleOnLocationFound({
        latlng: L.latLng(endPoint[0], endPoint[1]),
      });
    });
  };
  /**
   * Moving Marker Test
   * @param {*} startPoint
   * @param {*} endPoint
   * @param {*} speed
   */
  const moveLine = async (geoLineData) => {
    const geoList = geoLineData.features[0].geometry.coordinates;

    // console.log("시작 : ", geoList);
    // const promises = geoList.map(async (data, index) => {
    //   if (index * 1 !== geoList.length - 1)
    //     return await moveAtoA(geoList[index], geoList[index + 1], 1).then(
    //       () => data
    //     );
    // });

    // const results = await Promise.all(promises);
    // results.forEach();

    const delay = () => console.log("haha");

    const result = async (list) => {
      for (const [index, value] of list.entries()) {
        if (index !== geoList.length - 1)
          await moveAtoA(geoList[index], geoList[index + 1], 1).then();
      }
    };

    var cnt = 0;
    setInterval(() => {
      console.log("start!");
      moveAtoA(geoList[cnt], geoList[cnt + 1], 1);
      cnt++;
      if (cnt === geoList.length) return;
    }, 2000);

    // result(geoList);

    console.log("끝");

    // 시나리오
  };

  /**
   * 마커 이동 함수 예시
   *
   * orange -> center -> red -> green -> center -> orange
   */

  const onStartMove = async () => {
    const geoData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              // orange
              [realOrangeMarker._latlng.lat, realOrangeMarker._latlng.lng],
              // center
              [37.48333816841429, 127.20819274185676],
              // red
              [realRedMarker._latlng.lat, realRedMarker._latlng.lng],
              // green
              [realGreenMarker._latlng.lat, realGreenMarker._latlng.lng],
              // center
              // [37.48333816841429, 127.20819274185676],
              // orange
              // [realOrangeMarker._latlng.lat, realOrangeMarker._latlng.lng],
            ],
          },
        },
      ],
    };
    await moveLine(geoData);
  };

  /**
   * * 마커 추가 함수
   */
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
            movingMarker={moveAtoA}
          />
        </div>
        <div class='mapWrapper'>
          <div class='mapLeft'>
            <Map
              ref={sampleMapRef}
              zoom={1}
              // maxZoom={5}
              crs={CRS.Simple}
              center={[520.97265625, 392.7849249198582]}
              style={{ height: "100vh" }}
            />
          </div>
          {/* <div>
            <button onClick={onStartMove}>start</button>
          </div> */}
          <div class='mapRight'>
            <div id='realMap' style={{ width: "100%", height: "100vh" }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
