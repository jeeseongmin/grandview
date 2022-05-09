import React, { useEffect } from "react";

const TestScreen = () => {
  useEffect(() => {
    drawCanvas();
  }, []);
  const drawCanvas = () => {
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d");

    make_base();

    function make_base() {
      let base_image = new Image();
      base_image.addEventListener(
        "load",
        function () {
          var ctx = document.getElementById("canvas").getContext("2d");
          ctx.drawImage(base_image, 0, 0, 200, 200);
        },
        false
      );
      base_image.src = "https://i.imgur.com/Ion6X7C.jpg";
      //   base_image.src = "https://i.imgur.com/Ion6X7C.jpg";

      //   base_image.onload = function () {
      //     context.imageSmoothingEnabled = false;
      //     context.mozImageSmoothingEnabled = false;
      //     context.webkitImageSmoothingEnabled = false;
      //     context.msImageSmoothingEnabled = false;

      //     context.drawImage(base_image, 0, 0, 256, 256);
      //   };
    }
  };
  return (
    <div>
      {/* <canvas id='canvas' height='200' width='200'></canvas> */}
      <img src='https://i.imgur.com/Ion6X7C.jpg' alt='123' />
    </div>
  );
};

export default TestScreen;
