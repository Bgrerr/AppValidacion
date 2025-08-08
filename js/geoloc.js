const locationBtn = document.getElementById('getLocation');
const locationDiv = document.getElementById('locationResult');

const worker = new Worker('worker.js');
worker.onmessage = function (e) {
  locationDiv.innerText = `Resultado del Worker: ${e.data}`;
};

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      worker.postMessage(coords);
    });
  } else {
    locationDiv.innerText = 'Geolocalización no soportada';
  }
});