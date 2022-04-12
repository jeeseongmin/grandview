import React from "react";
import SidebarContent from "./SidebarContent";

const Sidebar = ({ mode, setMode }) => {
  const clickButton = (text) => {
    if (text === "home") {
      const homeTarget = document.querySelector("#homeBtn");
      const settingTarget = document.querySelector("#settingBtn");
      const sidebarTarget = document.querySelector(".sidebar");
      const home = document.querySelector("#home");
      const setting = document.querySelector("#setting");

      if (homeTarget.classList.value === "active") {
        homeTarget.classList.remove("active");
        home.classList.remove("active");

        sidebarTarget.classList.add("collapsed");
      } else {
        homeTarget.classList.add("active");
        home.classList.add("active");
        setting.classList.remove("active");
        settingTarget.classList.remove("active");
        sidebarTarget.classList.remove("collapsed");
      }
    } else if (text === "setting") {
      const homeTarget = document.querySelector("#homeBtn");
      const settingTarget = document.querySelector("#settingBtn");
      const sidebarTarget = document.querySelector(".sidebar");
      const home = document.querySelector("#home");
      const setting = document.querySelector("#setting");

      if (settingTarget.classList.value === "active") {
        settingTarget.classList.remove("active");
        setting.classList.remove("active");

        sidebarTarget.classList.add("collapsed");
      } else {
        homeTarget.classList.remove("active");
        setting.classList.add("active");
        home.classList.remove("active");

        settingTarget.classList.add("active");
        sidebarTarget.classList.remove("collapsed");
      }
    }
  };

  return (
    <div class='sidebar-tabs sidebar leaflet-touch '>
      <div class='sidebar-tabs'>
        <ul role='tablist'>
          <li class='' id='homeBtn'>
            <button
              class='sidebar-tab-button'
              role='tab'
              onClick={(e) => clickButton("home")}>
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
                <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
                <polyline points='9 22 9 12 15 12 15 22'></polyline>
              </svg>
            </button>
          </li>
          <li class='active' id='settingBtn'>
            <button
              class='sidebar-tab-button'
              role='tab'
              onClick={(e) => clickButton("setting")}>
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
                <circle cx='12' cy='12' r='3'></circle>
                <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
              </svg>
            </button>
          </li>{" "}
        </ul>
      </div>
      <SidebarContent mode={mode} setMode={setMode} />
    </div>
  );
};

export default Sidebar;
