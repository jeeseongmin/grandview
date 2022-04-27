const targetLon = 37.4; //인천의 위도
const radiusOfEarth = 6371.009; //지구 반지름(km)
const circumferenceOfEarth = 2 * Math.PI * radiusOfEarth; //지구 둘레
const distancePerLat = circumferenceOfEarth / 360; //경도당 거리(km)
const distancePerLon =
  (Math.cos((targetLon * Math.PI) / 180) * circumferenceOfEarth) / 360; //위도당 거리(km)

export const CommonUtil = {
  convertUnitToLon: (LonValue) => {
    return (LonValue * distancePerLon) / distancePerLat;
  },
  convertUnitToLat: (LatValue) => {
    return (LatValue * distancePerLat) / distancePerLon;
  },
  calTheta: (data) => {
    // console.log(data);
    const _calcTheta = (origin_x, origin_y, x, y, is_rad) => {
      const a = y - origin_y;
      const b = x - origin_x;
      const theta = Math.atan(a / b);

      if (is_rad) {
        return theta;
      } else {
        return theta * (180 / Math.PI);
      }
    };
    let converted1 = (data[0].lng * distancePerLat) / distancePerLon;
    let converted2 = (data[1].lng * distancePerLat) / distancePerLon;

    let theta =
      _calcTheta(converted1, data[0].lat, converted2, data[1].lat, false) * -1;

    return theta;
  },

  myTheta: (main, left, top) => {
    console.log(main, left, top);
    const bottomLength = Math.sqrt(
      Math.pow(main.lat.toFixed(5) - left.lat.toFixed(5)) +
        Math.pow(main.lng.toFixed(5) - left.lng.toFixed(5))
    );
    const rightLength = Math.sqrt(
      Math.pow(main.lat.toFixed(5) - top.lat.toFixed(5)) +
        Math.pow(main.lng.toFixed(5) - top.lng.toFixed(5))
    );
    console.log(bottomLength, rightLength);

    return Math.atan(rightLength / bottomLength);
  },
  calcCoordinatesAfterRotation: (origin_x, origin_y, x, y, theta, is_rad) => {
    const rebased_x = x - origin_x;
    const rebased_y = y - origin_y;

    let rad_theta;

    if (is_rad) {
      rad_theta = theta;
    } else {
      rad_theta = theta * (Math.PI / 180);
    }

    const rotatedX =
      rebased_x * Math.cos(rad_theta) - rebased_y * Math.sin(rad_theta);
    const rotatedY =
      rebased_x * Math.sin(rad_theta) + rebased_y * Math.cos(rad_theta);

    const xx = rotatedX + origin_x;
    const yy = rotatedY + origin_y;

    return { x: xx, y: yy };
  },
  makeLinearEquation: (origin_x, origin_y, to_x, to_y) => {
    const x_variation = to_x - origin_x;
    const y_variation = to_y - origin_y;
    const slope = y_variation / x_variation;

    const intercept = origin_y - slope * origin_x;

    return { slope: slope, intercept: intercept };
  },
  akeLinearEquation: (origin_x, origin_y, to_x, to_y) => {
    const x_variation = to_x - origin_x;
    const y_variation = to_y - origin_y;
    const slope = y_variation / x_variation;

    const intercept = origin_y - slope * origin_x;

    return { slope: slope, intercept: intercept };
  },
};
