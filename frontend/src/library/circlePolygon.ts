export function generateCircularPolygon(
  lat: number,
  lon: number,
  radius: number,
  numPoints: number,
) {
  var coordinates = [];
  for (var i = 0; i < numPoints; i++) {
    var angle = (2 * Math.PI * i) / numPoints;
    var dlat = (radius * Math.cos(angle)) / 6371.0;
    var dlon = (radius * Math.sin(angle)) / (6371.0 * Math.cos(degToRad(lat)));
    var latNew = lat + radToDeg(dlat);
    var lonNew = lon + radToDeg(dlon);
    coordinates.push([lonNew, latNew]);
  }
  return [coordinates];
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad: number) {
  return (rad * 180) / Math.PI;
}
