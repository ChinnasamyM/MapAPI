

$(document).ready(function () {
    initialize();
});

function initialize() {
    //debugger;

    

    var mapOptions = {
        center: new google.maps.LatLng(6.9167, 79.8473),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);
    // create a marker  
    var latlng = new google.maps.LatLng(6.9167, 79.8473);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'Resulting Place'
    });
    debugger;
    geocoder = new GClientGeocoder();

}




var geocoder;
var map;
function codeAddress(address) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
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
            // create a marker  
            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: 'Latitude: ' + results[0].geometry.location.Ya + ' Longitude :' + results[0].geometry.location.Za
            });
        }
    });
}


function GetMapAddress() {
    var addresstxt = document.getElementById('txtAddress').value;
    codeAddress(addresstxt);
    codeAddressgeo(addresstxt);
}

navigator.geolocation.getCurrentPosition(GetLocation);
function GetLocation(location) {
    document.getElementById('txtlat').value = location.coords.latitude;
    document.getElementById('txtlon').value = location.coords.longitude;
    //alert(location.coords.accuracy);
}

function codeAddressgeo(AdrressfromParam) {
    // debugger;
    var address = AdrressfromParam;// document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // debugger;
            var rsd = results;
            var geocodelat = results[0].geometry.location.A.toString();
            var geocodelon = results[0].geometry.location.k.toString();
            document.getElementById('txtlat').value = geocodelat;
            document.getElementById('txtlon').value = geocodelon;
            //alert(geocodeloc);
            //alert(geocodelocz);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function showLocation() {
    debugger;
    geocoder.getLocations(document.forms[0].address1.value, function (response) {
        debugger;
        if (!response || response.Status.code != 200) {
            alert("Sorry, we were unable to geocode the first address");
        }
        else {
            location1 = { lat: response.Placemark[0].Point.coordinates[1], lon: response.Placemark[0].Point.coordinates[0], address: response.Placemark[0].address };
            geocoder.getLocations(document.forms[0].address2.value, function (response) {
                if (!response || response.Status.code != 200) {
                    alert("Sorry, we were unable to geocode the second address");
                }
                else {
                    location2 = { lat: response.Placemark[0].Point.coordinates[1], lon: response.Placemark[0].Point.coordinates[0], address: response.Placemark[0].address };
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