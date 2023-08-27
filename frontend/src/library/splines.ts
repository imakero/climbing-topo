export const calculateLinePath = (points: Point[]) => {
  const firstPoint = points[0] || undefined;

  if (!firstPoint || points.length <= 1) {
    return "";
  }
  let path = `M ${firstPoint.x} ${firstPoint.y}`;

  if (points.length == 2) {
    path += ` L ${points[1].x} ${points[1].y}`;
    return path;
  }

  // There are at least 3 points
  const controlPoints = getControlPoints(points);

  // Use the same control point twice for first endpoint
  let cx = controlPoints[0].x;
  let cy = controlPoints[0].y;
  path += ` C ${cx} ${cy} ${cx} ${cy} ${points[1].x} ${points[1].y}`;

  for (let i = 1; i < points.length - 2; i++) {
    const point = points[i + 1];
    let cx1 = controlPoints[2 * (i - 1) + 1].x;
    let cy1 = controlPoints[2 * (i - 1) + 1].y;
    let cx2 = controlPoints[2 * (i - 1) + 2].x;
    let cy2 = controlPoints[2 * (i - 1) + 2].y;

    path += ` C ${cx1} ${cy1} ${cx2} ${cy2} ${point.x} ${point.y}`;
  }

  // Use the same control point twice for last endpoint
  cx = controlPoints[controlPoints.length - 1].x;
  cy = controlPoints[controlPoints.length - 1].y;
  path += ` C ${cx} ${cy} ${cx} ${cy} ${points[points.length - 1].x} ${
    points[points.length - 1].y
  }`;

  return path;
};

const getControlPoints = (points: Point[], t = 0.5) => {
  const controlPoints: Point[] = [];

  for (let i = 0; i < points.length - 2; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const p2 = points[i + 2];

    const dx = p2.x - p0.x;
    const dy = p2.y - p0.y;

    const d01 = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
    const d12 = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

    controlPoints.push({
      x: p1.x - (dx * t * d01) / (d01 + d12),
      y: p1.y - (dy * t * d01) / (d01 + d12),
    });

    controlPoints.push({
      x: p1.x + (dx * t * d12) / (d01 + d12),
      y: p1.y + (dy * t * d12) / (d01 + d12),
    });
  }

  return controlPoints;
};
