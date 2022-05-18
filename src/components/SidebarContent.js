import React, { useState } from "react";

const SidebarContent = ({ mode, setMode, changeDrawing, movingMarker }) => {
  const [movingInfo, setMovingInfo] = useState({
    startLongitude: 0,
    endLongitude: 0,
    startLatitude: 0,
    endLatitude: 0,
    speed: 1,
  });
  const close = () => {
    const homeTarget = document.querySelector("#homeBtn");
    const settingTarget = document.querySelector("#settingBtn");
    const sidebarTarget = document.querySelector(".sidebar");
    const home = document.querySelector("#home");
    const setting = document.querySelector("#setting");

    homeTarget.classList.remove("active");
    home.classList.remove("active");
    setting.classList.remove("active");
    settingTarget.classList.remove("active");
    sidebarTarget.classList.add("collapsed");
  };

  const updateMode = () => {};

  const uploadImage = () => {
    alert("이미지 업로드 기능은 서버 구현된 후에 적용 예정입니다.");
  };

  const changeMode = async (text) => {
    await localStorage.setItem("mode", text);
    await setMode(text);
    console.log(text);
  };

  const changeInfo = (e, type) => {
    const cp = { ...movingInfo };
    cp[type] = e.target.value;
    setMovingInfo(cp);
  };

  const checkMove = async () => {
    if (movingInfo.speed <= 0) {
      alert("speed는 0보다 커야 합니다.");
      return;
    } else {
      const startPoint = {
        latitude: movingInfo.startLatitude,
        longitude: movingInfo.startLongitude,
      };
      const endPoint = {
        latitude: movingInfo.endLatitude,
        longitude: movingInfo.endLongitude,
      };
      await movingMarker(startPoint, endPoint, movingInfo.speed);
      resetInfo();
    }
  };

  const resetInfo = () => {
    const cp = {
      startLongitude: 0,
      endLongitude: 0,
      startLatitude: 0,
      endLatitude: 0,
      speed: 1,
    };
    setMovingInfo(cp);
  };

  return (
    <div class='sidebar-content'>
      <div id='home' class='sidebar-pane'>
        <h1 class='sidebar-header'>
          Home
          <div class='sidebar-close' role='btn' onClick={close}>
            <svg
              stroke='currentColor'
              fill='none'
              stroke-width='2'
              viewBox='0 0 24 24'
              stroke-linecap='round'
              stroke-linejoin='round'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <polyline points='15 18 9 12 15 6'></polyline>
            </svg>
          </div>
        </h1>
        <div>
          <h3>Grandvew Project</h3>
          <h4 style={{ marginTop: "5px" }}>
            현 프로젝트는 grandview 프로젝트에서 사용하게 될 실제 GPS를 화면
            좌표로 변환하는 것과 마커의 이동을 테스트해볼 수 있는 샘플
            페이지입니다.
          </h4>
        </div>
        <div>
          <h3>How to Test</h3>
          <h4 style={{ marginTop: "5px" }}>
            좌측 이미지는 업로드하게 될 도면 이미지, 우측 이미지는 실제 지도
            이미지입니다.
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            현재 좌/우측에 주황색, 녹색, 빨간색으로 나뉘어서 삼각형 형태로
            찍혀있는 마커들의 위치는 서로 같은 위치를 의미함을 가정하고
            있습니다. 이것이 의미하는 바는 도면 좌표 상의 위치가 실제 지도의
            특정 위치들을 의미한다는, 즉 실제 위치를 화면 좌표로 변환하였음을
            말합니다.
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            실제로 테스트를 해보면, 우측 세 마커 주위로 마우스 클릭을 하게 되면,
            검정색 마커가 나타나게 됩니다. 또한 좌측 도면 지도에도 검정색 마커가
            나타나게 되는데, 우측의 어떤 곳을 클릭하냐에 따라 좌측의 검정색 마커
            위치가 달라집니다. 정확한 비율도 일치하기 때문에 실제 위치가 도면
            화면 좌표로 정확하게 매핑되어 나타내어졌다는 것을 알 수 있습니다.
          </h4>
        </div>
      </div>
      <div id='setting' class='sidebar-pane'>
        <h1 class='sidebar-header'>
          Setting
          <div class='sidebar-close' role='btn' onClick={close}>
            <svg
              stroke='currentColor'
              fill='none'
              stroke-width='2'
              viewBox='0 0 24 24'
              stroke-linecap='round'
              stroke-linejoin='round'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <polyline points='15 18 9 12 15 6'></polyline>
            </svg>
          </div>
        </h1>
        <div>
          {/* <h3>마커 움직이기</h3>
          <h4 style={{ marginTop: "5px" }}>
            출발 위치와 도착 위치, 속도를 입력합니다.
          </h4>
          <h4>마커가 이동합니다.</h4>
          <h4>입력 시 GeoJson으로 변환된다고 가정.</h4>
          <div class='movingMarkerInputWrapper'>
            <div>
              <TextField
                id='standard-basic'
                label='출발 위도 (latitude)'
                variant='standard'
                type='number'
                value={movingInfo.startLatitude}
                onChange={(e) => changeInfo(e, "startLatitude")}
              />
              <TextField
                id='standard-basic'
                label='출발 경도 (longitude)'
                variant='standard'
                type='number'
                value={movingInfo.startLongitude}
                onChange={(e) => changeInfo(e, "startLongitude")}
              />
            </div>
            <div>
              <TextField
                id='standard-basic'
                label='도착 위도 (latitude)'
                variant='standard'
                type='number'
                value={movingInfo.endLatitude}
                onChange={(e) => changeInfo(e, "endLatitude")}
              />
              <TextField
                id='standard-basic'
                label='도착 경도 (longitude)'
                variant='standard'
                type='number'
                value={movingInfo.endLongitude}
                onChange={(e) => changeInfo(e, "endLongitude")}
              />
            </div>
            <div>
              <TextField
                id='standard-basic'
                label='속도 (기준 1)'
                variant='standard'
                type='number'
                value={movingInfo.speed}
                onChange={(e) => changeInfo(e, "speed")}
              />
            </div>{" "}
          </div>
          <div class='btnWrapper'>
            <Button
              onClick={checkMove}
              style={{ width: "100%", height: "35px" }}
              variant='outlined'>
              이동하기
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
