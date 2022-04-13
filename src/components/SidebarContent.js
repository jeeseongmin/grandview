import Button from "@mui/material/Button";
import React from "react";

const SidebarContent = ({ mode, setMode, changeDrawing, movingMarker }) => {
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
          <h3>React Leaflet Project</h3>
          <h4 style={{ marginTop: "5px" }}>
            현 프로젝트는 <b>React-leaflet</b>이 지도 이외의 실제 이미지
            내에서도 적용할 수 있도록 테스트하는 샘플 페이지입니다.
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            이미지는 가상의 도면으로, 사무실 내 자리 배치 시스템으로
            가정하였습니다.
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            선택 가능한 이미지의 종류는 총 4개로, JPG, JPEG, SVG, PNG로 구성되어
            있습니다. 이미지 업로드 기능은 서버 구현 이후 적용 예정입니다.
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
          <h3>인원 추가</h3>
          <h4 style={{ marginTop: "5px" }}>
            <b>인원 추가하기</b> 버튼을 클릭한 후, 원하는 지점을 클릭하세요.
          </h4>
          <h4>해당 위치에 마커가 자동 생성됩니다.</h4>

          {mode !== "create" && (
            <Button
              onClick={() => changeMode("create")}
              style={{ width: "100%", height: "35px", marginTop: "10px" }}
              variant='outlined'>
              인원 추가하기
            </Button>
          )}

          <div
            style={
              mode === "create"
                ? { height: "100%", opacity: "1", animation: "bigger 1s" }
                : { height: "0", opacity: "0" }
            }>
            <div
              style={{
                paddingLeft: "16px",
                paddingRight: "16px",
              }}>
              <hr></hr>
            </div>
            <h4>
              <b>1. 원하는 곳 선택</b>
            </h4>
            <p style={{ marginTop: "5px" }}>
              원하는 지점을 마우스로 클릭하세요.
            </p>
            <h4 style={{ marginTop: "10px" }}>
              <b>2. 정보 입력하기</b>
            </h4>
            <p style={{ marginTop: "5px" }}>
              수정하기 기능을 사용하여 정보를 입력해주세요.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "4px",
              }}>
              <Button
                onClick={() => changeMode("view")}
                style={{ width: "100%", height: "35px", marginTop: "10px" }}
                variant='outlined'>
                취소하기
              </Button>
            </div>
          </div>
          <h3>마커 움직이기</h3>
          <h4 style={{ marginTop: "5px" }}>도면 이미지를 업로드 합니다.</h4>
          <h4>업로드된 이미지가 적용됩니다.</h4>
          <div class='movingMarkerBtnWrapper'>
            <Button onClick={movingMarker} variant='outlined' class='emptyBtn'>
              마커 움직이기
            </Button>
            <Button onMouseDown={() => movingMarker("top")} variant='outlined'>
              top
            </Button>
            <Button onClick={movingMarker} variant='outlined' class='emptyBtn'>
              마커 움직이기
            </Button>
            <Button onMouseDown={() => movingMarker("left")} variant='outlined'>
              left
            </Button>
            <Button
              onMouseDown={() => movingMarker("bottom")}
              variant='outlined'>
              bototm{" "}
            </Button>
            <Button
              onMouseDown={() => movingMarker("right")}
              variant='outlined'>
              right{" "}
            </Button>
          </div>
          {/* <Button
            onClick={movingMarker}
            style={{ width: "100%", height: "35px", marginTop: "10px" }}
            variant='outlined'>
            마커 움직이기
          </Button> */}
          <h3>이미지 선택하기</h3>
          <h4 style={{ marginTop: "5px" }}>도면 이미지를 선택합니다.</h4>
          <h4>선택한 이미지가 적용됩니다.</h4>
          <div class='circleImageWrapper'>
            <h4>
              <b>1번 (JPG)</b>
            </h4>
            <div
              class='circleImage img1'
              onClick={() => changeDrawing("/grandview/assets/image/img1.jpg")}>
              <img
                class='img'
                src='/grandview/assets/image/img1.jpg'
                alt='img'
              />
            </div>
            <div class='hr'></div>
            <h4>
              <b>2번 (JPEG)</b>
            </h4>{" "}
            <div
              class='circleImage img2'
              onClick={() =>
                changeDrawing("/grandview/assets/image/img2.jpeg")
              }>
              <img
                class='img'
                src='/grandview/assets/image/img2.jpeg'
                alt='img'
              />
            </div>
            <div class='hr'></div>
            <h4>
              <b>3번 (SVG)</b>
            </h4>{" "}
            <div
              class='circleImage img3'
              onClick={() => changeDrawing("/grandview/assets/image/img3.svg")}>
              <img
                class='img'
                src='/grandview/assets/image/img3.svg'
                alt='img'
              />
            </div>
            <div class='hr'></div>
            <h4>
              <b>4번 (PNG)</b>
            </h4>{" "}
            <div
              class='circleImage img4'
              onClick={() => changeDrawing("/grandview/assets/image/img4.png")}>
              <img
                class='img'
                src='/grandview/assets/image/img4.png'
                alt='img'
              />
            </div>
          </div>
          <Button
            onClick={() => changeDrawing("reset")}
            style={{ width: "100%", height: "35px", marginTop: "10px" }}
            variant='outlined'>
            초기 이미지로 리셋
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
