

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

