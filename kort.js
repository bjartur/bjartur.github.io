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

        return infoWindow;
    }

    function mark(map) {
        return function(house) {

            house.map = map;
            var marker = new google.maps.Marker(house),
            pair = {
                marker: marker,

                infoWindow: annotate(map, marker, house.title, house.content)
            }

            return pair;
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
        infoMarker = mark(map)({ // just create and open a placeholder marker containing a form
            title: "Skrá hús til leigu",
            position: marker.getPosition(),
            content: "<label>Heimilisfang <input autofocus></label>"
                   +" <label>Fermetrafjöldi <input></label>"
                   +"<label>Mynd <input type=file></label>"
                   +" <label>Herbergjafjöldi <input></label>",
        });
        infoMarker.infoWindow.open(map, infoMarker.marker);

    });
}
