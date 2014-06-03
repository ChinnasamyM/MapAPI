
$(document).ready(function () {
    initialize();
});

function initialize() {
    geocoder = new GClientGeocoder();
}


function showLocation() {
    
    geocoder.getLocations(document.getElementById('address1').value, function (response) {
        
        if (!response || response.Status.code != 200) {
            alert("Sorry, we were unable to geocode the first address");
        }
        else {
            location1 = { lat: response.Placemark[0].Point.coordinates[1], lon: response.Placemark[0].Point.coordinates[0], address: response.Placemark[0].address };
            geocoder.getLocations(document.getElementById('address2').value, function (response) {
                if (!response || response.Status.code != 200) {
                    alert("Sorry, we were unable to geocode the second address");
                }
                else {
                    location2 = { lat: response.Placemark[0].Point.coordinates[1], lon: response.Placemark[0].Point.coordinates[0], address: response.Placemark[0].address };
                    //
                    calculateDistanceAPIV3();
                    calculateDistance();
                }
            });
        }
    });
}

function calculateDistance() {
    try {
        var glatlng1 = new GLatLng(location1.lat, location1.lon);
        var glatlng2 = new GLatLng(location2.lat, location2.lon);
        var miledistance = glatlng1.distanceFrom(glatlng2, 3959).toFixed(1);
        var kmdistance = (miledistance * 1.609344).toFixed(1);
        debugger;
        document.getElementById('results').innerHTML = '<strong>Address 1: </strong>' + location1.address + '<br /><strong>Address 2: </strong>' + location2.address + '<br /><strong>Distance: </strong>' + miledistance + ' miles (or ' + kmdistance + ' kilometers)';
    }
    catch (error) {
        alert(error);
    }
}

function calculateDistanceAPIV3() {
    try {
        var glatlng1 = new GLatLng(location1.lat, location1.lon);
        var glatlng2 = new GLatLng(location2.lat, location2.lon);
        var miledistance = glatlng1.distanceFromAPIV3(glatlng2, 3959).toFixed(1);
        debugger;
        var kmdistance = (miledistance * 1.609344).toFixed(1);

        document.getElementById('results').innerHTML = '<strong>Address 1: </strong>' + location1.address + '<br /><strong>Address 2: </strong>' + location2.address + '<br /><strong>Distance: </strong>' + miledistance + ' miles (or ' + kmdistance + ' kilometers)';

    }
    catch(err){
        alert(err);
    }
}

google.maps.LatLng.prototype.distanceFromAPIV3 = function (newLatLng) {
    // setup our variables
    var lat1 = this.lat();
    var radianLat1 = lat1 * (Math.PI / 180);
    var lng1 = this.lng();
    var radianLng1 = lng1 * (Math.PI / 180);
    var lat2 = newLatLng.lat();
    var radianLat2 = lat2 * (Math.PI / 180);
    var lng2 = newLatLng.lng();
    var radianLng2 = lng2 * (Math.PI / 180);
    // sort out the radius, MILES or KM?
    var earth_radius = 3959; // (km = 6378.1) OR (miles = 3959) - radius of the earth

    // sort our the differences
    var diffLat = (radianLat1 - radianLat2);
    var diffLng = (radianLng1 - radianLng2);
    // put on a wave (hey the earth is round after all)
    var sinLat = Math.sin(diffLat / 2);
    var sinLng = Math.sin(diffLng / 2);

    // maths - borrowed from http://www.opensourceconnections.com/wp-content/uploads/2009/02/clientsidehaversinecalculation.html
    var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);

    // work out the distance
    var distance = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));

    // return the distance
    return distance;
}







// reference for
//http://studiowhiz.com/2010/10/02/google-maps-v3-distancefrom/