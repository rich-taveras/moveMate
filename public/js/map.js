// map.js

// apiKey is now available globally
console.log(apiKey);


function calculateDistance() {
    var pickup = document.getElementById('pickup').value;
    var dropoff = document.getElementById('dropoff').value;

    var geocoder = new google.maps.Geocoder();
    var service = new google.maps.DistanceMatrixService();

    geocoder.geocode({ 'address': pickup }, function(resultsPickup, statusPickup) {
        if (statusPickup == 'OK') {
            var origin = resultsPickup[0].geometry.location;

            geocoder.geocode({ 'address': dropoff }, function(resultsDropoff, statusDropoff) {
                if (statusDropoff == 'OK') {
                    var destination = resultsDropoff[0].geometry.location;

                    service.getDistanceMatrix({
                        origins: [origin],
                        destinations: [destination],
                        travelMode: 'DRIVING',
                    }, function(response, status) {
                        if (status == 'OK') {
                            var distance = response.rows[0].elements[0].distance.text;
                            document.getElementById('distance').textContent = distance;

                            var map = new google.maps.Map(document.getElementById('map'), {
                                center: origin,
                                zoom: 10,
                            });

                            var directionsService = new google.maps.DirectionsService();
                            var directionsRenderer = new google.maps.DirectionsRenderer();
                            directionsRenderer.setMap(map);

                            var request = {
                                origin: origin,
                                destination: destination,
                                travelMode: 'DRIVING'
                            };

                            directionsService.route(request, function(result, status) {
                                if (status == 'OK') {
                                    directionsRenderer.setDirections(result);
                                }
                            });
                        }
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + statusDropoff);
                }
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + statusPickup);
        }
    });
}