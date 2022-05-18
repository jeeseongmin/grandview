const targetLon = 37.48637957308459; //인천의 위도
const radiusOfEarth = 6371.009; //지구 반지름(km)
const circumferenceOfEarth = 2 * Math.PI * radiusOfEarth; //지구 둘레
const distancePerLat = circumferenceOfEarth / 360; //경도당 거리(km)
const distancePerLon =
  (Math.cos((targetLon * Math.PI) / 180) * circumferenceOfEarth) / 360; //위도당 거리(km)

export const CommonUtil = {
  /**
   * 입력된 경도를 위도로 단위를 변경한다.
   * @param {number} lonValue 경도
   */
  convertUnitToLat: (LonValue) => {
    return (LonValue * distancePerLon) / distancePerLat;
  },
  /**
   * 입력된 위도를 경도로 단위를 변경한다.
   * @param {number} LatValue 위도
   */

  convertUnitToLon: (LatValue) => {
    return (LatValue * distancePerLat) / distancePerLon;
  },
  /**
   * 원점과 y값이 같은 임의의 점을 잇는 선분과, 원점과 지정한 점을 잇는 선분이 이루는 각도
   *
   * The angle between the line connecting the origin and any point with the same y value and the line connecting the origin and the specified point.
   * @param {number} origin_x
   * @param {number} origin_y
   * @param {number} x
   * @param {number} y
   * @param {boolean} is_rad 리턴받을 각도가 Rad 여부
   */
  calTheta: (origin_x, origin_y, x, y, is_rad) => {
    const a = y - origin_y;
    const b = x - origin_x;
    const theta = Math.atan(a / b);

    if (is_rad) {
      return theta;
    } else {
      return theta * (180 / Math.PI);
    }
  },

  /**
   * 원점에서 떨어진 임의의 점을 지정한 각도만큼 회전했을 때 좌표
   *
   * Coordinates when rotated by the specified angle
   * @param {number} origin_x
   * @param {number} origin_y
   * @param {number} x
   * @param {number} y
   * @param {number} theta
   * @param {boolean} is_rad 입력한 각도가 Rad 여부
   */
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
  /**
   * 평면위에 점 (origin_x,origin_y) 와 (to_x, to_y) 를 지나는 직선의 기울기와 절편을 계산하여 방정식을 만든다.
   *
   * The slope and intercept of the line passing through the point (origin_x, origin_y) and (to_x, to_y)
   * @param {number} origin_x
   * @param {number} origin_y
   * @param {number} to_x
   * @param {number} to_y
   */

  makeLinearEquation: (origin_x, origin_y, to_x, to_y) => {
    const x_variation = to_x - origin_x;
    const y_variation = to_y - origin_y;
    const slope = y_variation / x_variation;

    const intercept = origin_y - slope * origin_x;

    return { slope: slope, intercept: intercept };
  },
};
