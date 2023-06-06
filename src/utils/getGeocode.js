

const getGeocode = async (location) => {
  const coords =await window.ymaps.geocode(location);
  const coordinates = coords.geoObjects.get(0).geometry.getCoordinates();
  return coordinates;
};

export default getGeocode;
