var map, service, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10,
        styles: [{
            stylers: [{ visibilty: 'simplified' }]
        }, {
            elementType: 'labels',
            stylers: [{ visibilty: 'off' }]
        }]
    });
    infoWindow = new google.maps.InfoWindow;
    service = new google.maps.places.PlacesService(map);

    map.addListener('idle', performSearch);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You Are Here.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function performSearch() {
    var request = {
        bounds: map.getBounds(),
        keyword: 'chicken, tenders, fingers',
    };
    service.radarSearch(request, callback);
}

function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
    }
    for (var i = 0, result; result = results[i]; i++) {
        addMarker(result);
    }
}

function addMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: './chicken-icon.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(25, 25)
        }
    });

    google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
        });
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPostion(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation Service Failed' :
        'Error: Your Browser Doesn\'t Support Geolocation');
    infoWindow.open(map);
}