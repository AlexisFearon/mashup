var mapOptions = {
    
    center: new google.maps.LatLng(40.7122, -74.0081),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.HYBRID
};

var map = new google.maps.Map(document.getElementById('map'),mapOptions);

var create_marker = function (tweet) {
    
    var markerOptions = {
        position: new google.maps.LatLng(tweet.geo.coordinates[0],tweet.geo.coordinates[1])
    };
    
    var marker = new google.maps.Marker(markerOptions);
    
    marker.setMap(map);
    
    var infoWindowOptions ={
        
        content: tweet.text + ' - ' + tweet.username
        
    };
    
    var infoWindow = new google.maps.InfoWindow (infoWindowOptions);
    
    google.maps.event.addListener(marker,'click',function(e){
        
        infoWindow.open(map,marker);
        
    });
    
    function toggleBounce(){
        if (marker.getAnimation() !=null) {
            marker.setAnimation(null);
        } 
      else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    google.maps.event.addListener(marker,'click',toggleBounce);
};

$.ajax({
    type: 'GET',
    dataType: "jsonp",
    url: "http://ga-twitter-map.herokuapp.com/search",
    data:{
        'lat': 40.7122,
        'lng': -74.0081,
        'distance': '10mi'
    },
    success: function(data){
        var $tweets = $('.tweets');
        for(var i=0; i<data.tweets.length; i+=1) {
            var tweet = data.tweets[i];
            create_marker(tweet);
        }
    }
});
