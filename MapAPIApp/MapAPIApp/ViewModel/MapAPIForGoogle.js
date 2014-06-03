

var geocoder;
var map;
geocoder = new google.maps.Geocoder();

function GetMapAddress() {
    var addresstxt = document.getElementById('txtAddress').value;
    var addresstxt2 = document.getElementById('txtAddress2').value;   
    ForDistanceCalculation(addresstxt, addresstxt2);
}

function MapviewForAddress(AdrressfromParam) {
    geocoder.geocode({ 'address': AdrressfromParam }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myOptions = {
                zoom: 5,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function ForDistanceCalculation(FirstAddress,SecondAddress) {
    var glatlng1, glatlng2;
    geocoder.geocode({ 'address': FirstAddress }, function (results, status) {        
        if (status == google.maps.GeocoderStatus.OK) {            
            try {
                location1 = { lat: results[0].geometry.location.A, lon: results[0].geometry.location.k, address: results[0].formatted_address };
                document.getElementById('txtlat').value = location1.lat;
                document.getElementById('txtlon').value = location1.lon;
                glatlng1 = new google.maps.LatLng(location1.lat, location1.lon);
            }
            catch (error) {
                alert(error);
            }
            var myOptions = {
                zoom: 5,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: 'Latitude: ' + results[0].geometry.location.Ya + ' Longitude :' + results[0].geometry.location.Za
            });
        }
    });

    geocoder.geocode({ 'address': SecondAddress }, function (results, status) {       
        if (status == google.maps.GeocoderStatus.OK) {            
            try {
                location2 = { lat: results[0].geometry.location.A, lon: results[0].geometry.location.k, address: results[0].formatted_address };
                document.getElementById('txtlat2').value = location2.lat;
                document.getElementById('txtlon2').value = location2.lon;
                glatlng2 = new google.maps.LatLng(location2.lat, location2.lon);
                }
            catch (error) {
                alert(error);
            }
            var marker2 = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            var marker2 = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: 'Latitude: ' + results[0].geometry.location.Ya + ' Longitude :' + results[0].geometry.location.Za
            });
            var miledistance = glatlng1.distanceFromAPIV3(glatlng2, 3959).toFixed(1);
            var kmdistance = (miledistance * 1.609344).toFixed(1);
            document.getElementById('results').innerHTML=  '<strong>Address 1: </strong>' + location1.address + '<br /><strong>Address 2: </strong>' + location2.address + '<br /><strong>Distance: </strong>' + miledistance + ' miles (or ' + kmdistance + ' kilometers)';

        }
    });
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




//navigator.geolocation.getCurrentPosition(GetLocation); //To get current position
function GetLocation(location) {
    document.getElementById('txtlat').value = location.coords.latitude;
    document.getElementById('txtlon').value = location.coords.longitude;
    //alert(location.coords.accuracy);
}
