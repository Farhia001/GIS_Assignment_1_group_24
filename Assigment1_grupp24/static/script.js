var map = L.map('map').setView([62.0, 15.0], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Task 1: Punkt, Linje och Polygon //

// Skapar en punktmarkör för Göteborgsoperan

var point = L.circleMarker([57.71064, 11.96295], {
    radius : 10,
    color : 'red',
    fillColor : 'red',
    fillOpacity : 0.85,
    weight : 2

});

// Pop-up med bild och information för punkten
point.bindPopup (`
    <b>Göteborgsoperan</b><br>
    <img src="/static/opera.jpg" style="width:200px;border-radius:6px;margin:6px 0"><br>
    <b>Typ:</b> Punkt<br>
    <b>Koordinater:</b> 57.71064°N, 11.96295°E<br>
    <b>Öppnad:</b> 1994
    
    `);

// Skapar en linje längs Älvsborgsbron
var line = L.polyline([
    [57.69148, 11.90148],
    [57.6919, 11.9008],
    [57.69472, 11.89904],
    [57.6957, 11.8984],
    [57.6965, 11.8977],
    [57.6979, 11.8964]
], {
    color: 'blue',
    weight: 4,
    dashArray:'8,4'
});

// Pop-up med bild och information för linje
line.bindPopup (`
    <b>Älvsborgsbron</b><br>
    <img src="/static/alvsborgsbron.jpg" style="width:200px;border-radius:6px;margin:6px 0"><br>
    <b>Typ:</b> Linje<br>
    <b>Info:</b> Ikonisk hängbro över Göta älv i Göteborg<br>
    <b>Längd:</b> 900.6 m<br>
    <b>Öppnad:</b> 1966
    
    `);
 
// Skapar en polygon runt Liseberg Jukebox attraktionen
var polygon = L.polygon([
    [57.69388, 11.99427],
    [57.69383, 11.99414],
    [57.69378, 11.99412],
    [57.69371, 11.99423],
    [57.69372, 11.99436],
    [57.69377, 11.99444],
    [57.69382, 11.99445],
    [57.69387, 11.99438]
], {
    color: 'purple',
    fillColor : 'purple',
    fillOpacity : 0.3,
    weight: 2
    
});

// Pop-up med bild och information för polygon
polygon.bindPopup (`
    <b>Liseberg Jukebox</b><br>
    <img src="/static/jukebox.webp" style="width:200px;border-radius:6px;margin:6px 0"><br>
    <b>Typ:</b> Polygon<br>
    <b>Info:</b> Attraktion i Sveriges största nöjespark<br>
    <b>Öppnad:</b> 1923 <br>
    <b>Besökare:</b> 3 miljoner per år
    
    `);

// Grupperar alla lager för enkel toggle
var task1Group = L.featureGroup([point, line, polygon]);

// Toggle funktion - lägger till eller tar bort Task 1 lagret
function runTask1() {
    if (map.hasLayer(task1Group)) {
        map.removeLayer(task1Group);
        console.log("Task 1 tagits bort");
    } else {
        map.addLayer(task1Group);
        map.fitBounds(task1Group.getBounds().pad(0.1));
        console.log("Task 1 aktiverad");
    }
    
}

// Task 2: 5 Platser av intresse i Stockholm //
// Lista med  5 platser av intresse i Stockholm
var locations = [
    { name: 'Vasamuseet',         lat: 59.3280,  lon: 18.0914,  type: 'Museum',       hours:'10:00-17:00', info: 'Världsberömt museum med fartyget Vasa från 1600-talet.' },
    { name: 'ABBA The Museum',    lat: 59.32504, lon: 18.09690, type: 'Museum',       hours:'10:00-20:00', info: 'Interaktivt museum om popgruppen ABBA.' },
    { name: 'Moderna Museet',     lat: 59.3261,  lon: 18.0846,  type: 'Konstgalleri', hours:'10:00-18:00', info: 'Nationalgalleri för modern och samtida konst.' },
    { name: 'NK Stockholm',       lat: 59.3332,  lon: 18.0692,  type: 'Handel',       hours:'10:00-19:00', info: 'Sveriges mest prestigefyllda varuhus sedan 1915.' },
    { name: 'Stockholm Stadshus', lat: 59.3278,  lon: 18.0552,  type: 'Landmärke',    hours:'08:00-16:00', info: 'Platsen för Nobelprisets middag. Ikoniska tornet' }, 
];

// Färger för varje plats
var colors = ['green', 'orange', 'pink', 'brown', 'black'];

// Skapar markörer och kopplar sidebar vid klick
var task2Group = L.featureGroup(
    locations.map(function(location, i) {
        var marker = L.circleMarker([location.lat, location.lon], {
             radius : 12,
             color : colors[i],
             fillColor : colors[i],
              fillOpacity : 0.85,
              weight : 2
        });
        marker.bindPopup('<b>' + location.name + '</b><br>Se mer information i sidopanelen');
        
        // Uppdaterar sidebar när användaren klickar på plats
        marker.on('click', function() {
            document.getElementById('side-info').innerHTML = `
                <b style="color:${colors[i]}">${location.name}</b><br><br>
                <b>Typ:</b> ${location.type}<br>
                <b>Latitude:</b> ${location.lat}°N<br>
                <b>Longitude:</b> ${location.lon}°E<br>
                <b>Öppettider:</b> ${location.hours}<br><br>
                <b>Info:</b><br>${location.info}
            
            `;
        });
        return marker ;
    })
);

// Toggle funktion - lägger till eller tar bort Task 2 lagret
function runTask2() {
    if (map.hasLayer(task2Group)) {
        map.removeLayer(task2Group);
        
        // Återställer sidopanelen
        document.getElementById('side-info').innerHTML = 'Klicka på en plats för att få information';
         console.log("Task 2 har tagits bort");
         } else {
            map.addLayer(task2Group);
            map.fitBounds(task2Group.getBounds().pad(0.15));
            console.log("Task 2 aktiverad");

         }
}



function runTask3() {
    console.log("Task 3 aktiverad");
}   
function runTask4() {
    var imageBounds = [[59.25, 17.90], [59.45, 18.20]];
    var imageUrl = 'static/stockholm.jpeg';
    L.imageOverlay(imageUrl, imageBounds, {
        opacity: 0.5,        // <--- LÄGG TILL DETTA KOMMATECKEN
        interactive: true
    }).addTo(map);   
    
    map.fitBounds(imageBounds);
    alert("Task 4 aktiverad: En bild har lagts över kartan.");
    console.log("Task 4 aktiverad");
}

var markers = L.markerClusterGroup(); 
var fuelLayer = L.geoJson(fuel, { 
    onEachFeature: function (feature, layer) { 
        layer.bindPopup(feature.properties.name); } 
    }); 

markers.addLayer(fuelLayer); 

function runTask5() { 
    if(map.hasLayer(markers)){ 
        map.removeLayer(markers); 
        console.log("Task 5 bort"); 
    } 
    else { 
        map.addLayer(markers); 
        console.log("Task 5 aktiverad");
    } 
};
