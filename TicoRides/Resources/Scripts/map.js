const mapToken = 'pk.eyJ1Ijoic2FsYXphcm13IiwiYSI6ImNseWJwOHJ5ajFjamkya285djlldXRvdmMifQ.NUQDfmxil9ITseNsuOvqOg';

document.addEventListener('DOMContentLoaded', () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-84.392142, 10.184906], // Coordenadas de Zarcero, Alajuela, Costa Rica
    zoom: 12,
    accessToken: mapToken
  });
  const marker = new mapboxgl.Marker()
   .setLngLat([-84.392142, 10.184906])
   .setPopup(new mapboxgl.Popup().setHTML('<h3>Zarcero, Alajuela, Costa Rica</h3>'))
   .addTo(map);
});