function calculateDistance() {
    var pickupAddress = document.getElementById('pickupAddress').value;
    var pickupCity = document.getElementById('pickupCity').value;
    var pickupState = document.getElementById('pickupState').value;
    var pickupZip = document.getElementById('pickupZip').value;

    var dropoffAddress = document.getElementById('dropoffAddress').value;
    var dropoffCity = document.getElementById('dropoffCity').value;
    var dropoffState = document.getElementById('dropoffState').value;
    var dropoffZip = document.getElementById('dropoffZip').value;

    var pickup = pickupAddress + ", " + pickupCity + ", " + pickupState + ", " + pickupZip;
    var dropoff = dropoffAddress + ", " + dropoffCity + ", " + dropoffState + ", " + dropoffZip;

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
                        unitSystem: google.maps.UnitSystem.IMPERIAL // Change to miles
                    }, function(response, status) {
                        if (status == 'OK') {
                            var distanceInKm = response.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
                            var distanceInMiles = distanceInKm / 1.60934; // Convert kilometers to miles
                            console.log(distanceInMiles);

                            document.getElementById('distance').textContent = distanceInMiles.toFixed(2); // Display with 2 decimal places
                            document.getElementById('estimatePrice').textContent = (distanceInMiles * 4.89).toFixed(2); // Multiply by 4.89

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
