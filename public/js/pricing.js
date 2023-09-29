// Your API Key
// var apiKey = "AIzaSyDxdUBK4xhZyCWAZpkqATXkoX1B9Dx6bFU";
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();
