function initMap() { // automatically called by the Google Maps library

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 64.1156000, lng: -21.8969001},
        zoom: 16,
        mapTypeId: 'hybrid',
        tilt: 45
    });

    function esc(text) {
        function tr(character) {
            if (' ' == character )
                return '&nbsp;';
            else
                return '&#' + character.charCodeAt(0) + ';';
        }

        return text.replace(/[&<>"']/g, tr);
    }

    function annotate(map,marker,title,description) {

        var infoWindow = new google.maps.InfoWindow({
            content: "<h6>" + title + "</h6>" + description
        });

        marker.addListener('click', function(mouseEvent) {
            infoWindow.open(map, marker);
        });
    }

    function mark(map) {
        return function(house) {

            house.map = map;
 
            var marker = new google.maps.Marker(house);

            annotate(map, marker, house.title, house.content);

            return marker;
        }
    }

    var houses = [
        {
            title: "Lundur 20",
            position: {
                lat:  64.1157000,
                lng: -21.8904001
            },
            content: "Glæsileg fjögurra herbergja íbúð <em>Kópavogsmegin</em> við Fossvog."
        }
    ];

    houses.forEach(mark(map));

    var editor = new google.maps.drawing.DrawingManager({
      map: map,
      drawingControlOptions: {
          drawingModes:  [
              google.maps.drawing.OverlayType.MARKER
          ]
      }
    });

    editor.addListener('markercomplete', function(marker) {
        mark(map)({
            title: esc(prompt('Heimilisfang')),
            position: marker.getPosition(),
        });

    });
}
