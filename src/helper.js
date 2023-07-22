const EARTH_CIR_METERS = 40075016.686;

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth's radius in meters
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function latLngToBounds(lat, lng, zoom, width, height) {
  const metersPerPixelEW = haversine(lat, lng, lat, lng + 360 / Math.pow(2, zoom + 8));
  const metersPerPixelNS = haversine(lat, lng, lat + 360 / Math.pow(2, zoom + 8), lng);

  const shiftMetersEW = (width / 2) * metersPerPixelEW;
  const shiftMetersNS = (height / 2) * metersPerPixelNS;

  const shiftDegreesEW = shiftMetersEW * 360 / EARTH_CIR_METERS;
  const shiftDegreesNS = shiftMetersNS * 360 / EARTH_CIR_METERS;

  return [
    [lat - shiftDegreesNS, lng - shiftDegreesEW],
    [lat + shiftDegreesNS, lng + shiftDegreesEW],
  ];
}

export function getDistance(point1, point2) {
  const earthRadius = 6371; // Earth's radius in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1 = (Math.PI / 180) * point1.latitude;
  const lon1 = (Math.PI / 180) * point1.longitude;
  const lat2 = (Math.PI / 180) * point2.latitude;
  const lon2 = (Math.PI / 180) * point2.longitude;

  // Haversine formula
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}