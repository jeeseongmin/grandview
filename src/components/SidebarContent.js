import Button from "@mui/material/Button";
import React from "react";
import { FiSettings } from "react-icons/fi";

const SidebarContent = ({ mode, setMode }) => {
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

  const refreshStorage = () => {};

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
            <b>LocalStorage</b>를 사용하여 데이터를 관리하며, 간단한{" "}
            <b>marker</b> 사용 및 테스트를 진행할 수 있습니다.
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            또한 우측 하단 버튼을 통해 모드 변경이 가능합니다. <br></br>
            (USER, ADMIN)
          </h4>

          <h3>USER mode</h3>
          <h4 style={{ marginTop: "5px" }}>
            유저 모드에서는 자리 별 배치와 <b>marker</b> 클릭 이벤트를 통한 정보
            확인이 가능합니다.
          </h4>

          <h3>ADMIN mode</h3>
          <h4 style={{ marginTop: "5px" }}>
            관리자 모드로 전환 시 좌측 메뉴바에 있는{" "}
            <FiSettings size={16} style={{ marginBottom: "-2px" }} /> 아이콘이
            활성화됩니다.
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            관리자는 다음과 같은 기능을 수행할 수 있습니다.
          </h4>
          <h4 style={{ marginTop: "20px" }}>
            <b>1. 인원 추가</b>
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            - 추가 버튼 클릭 후 도면 상 원하는 지점 선택
            <br></br>- 마커 자동 생성
            <br></br>- 관련 정보는 수정하기에서 수정
          </h4>
          <h4 style={{ marginTop: "10px" }}>
            <b>2. 마커 위치 변경</b>
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            - 마커 드래그 시 자동으로 해당 마커 위치 변경
          </h4>
          <h4 style={{ marginTop: "10px" }}>
            <b>3. 수정하기</b>
          </h4>
          <h4 style={{ marginTop: "5px" }}>
            - 관리자 권한으로 마커 클릭 시 팝업 창 로드
            <br></br>- 삭제하기 기능
            <br></br>- 내용 수정하기 기능
          </h4>
        </div>
      </div>
      <div id='setting' class='sidebar-pane active'>
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
          <h3>이미지 업로드</h3>
          <h4 style={{ marginTop: "5px" }}>도면 이미지를 업로드 합니다.</h4>
          <h4>업로드된 이미지가 적용됩니다.</h4>
          <Button
            onClick={refreshStorage}
            style={{ width: "100%", height: "35px", marginTop: "10px" }}
            variant='outlined'>
            이미지 업로드
          </Button>
          <h3>이미지 선택하기</h3>
          <h4 style={{ marginTop: "5px" }}>도면 이미지를 선택합니다.</h4>
          <h4>선택한 이미지가 적용됩니다.</h4>
          <div class='circleImageWrapper'>
            <h4>1번</h4>
            <div class='circleImage img1'>
              <img class='img' src='/assets/image/img1.jpg' alt='img' />
            </div>
            <h4>2번</h4>
            <div class='circleImage img2'>
              <img class='img' src='/assets/image/img2.jpg' alt='img' />
            </div>
            <h4>3번</h4>
            <div class='circleImage img3'>
              <img class='img' src='/assets/image/img3.svg' alt='img' />
            </div>
            <h4>4번</h4>
            <div class='circleImage img4'>
              <img class='img' src='/assets/image/img4.jpeg' alt='img' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
