onmessage = function (e) {
  const { lat, lng } = e.data;
  const result = `Ubicación recibida: lat ${lat.toFixed(4)}, lng ${lng.toFixed(4)}`;
  postMessage(result);
};