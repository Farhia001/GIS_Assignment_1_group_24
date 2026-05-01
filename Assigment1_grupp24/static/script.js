// Initialize the Leaflet map centered on Sweden with zoom level 5
// [62.0, 15.0] is approximately the center of Sweden (latitude, longitude)
var map = L.map('map').setView([62.0, 15.0], 5);

// Add OpenStreetMap tile layer to the map
// This provides the background map imagery
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
    // Log to console for debugging
    console.log("Task 3 aktiverad");
    
    // Show loading message in the sidebar info panel
    document.getElementById("info-content").innerHTML =
        "<h3>Task 3: Supermarkets in Region Stockholm</h3>" +
        "<p>Loading supermarket.geojson...</p>";

    // Load the supermarket GeoJSON file using AJAX
    $.getJSON("static/supermarket.geojson", function(data) {

        // Center the map on Stockholm and zoom in
        // [59.3293, 18.0686] are the coordinates for Stockholm
        map.setView([59.3293, 18.0686], 10);

        // Create a layer group to hold all supermarket-related layers
        var supermarketGroup = L.layerGroup().addTo(map);

        // STEP 1: Check for buffer overlaps between each pair of supermarkets
        // This loop examines each supermarket feature
        data.features.forEach(function(feature, index) {

            // Create a 1 km buffer around the current supermarket using Turf.js
            var currentBuffer = turf.buffer(feature, 1, {
                units: "kilometers"
            });

            // Flag to track if this supermarket's buffer overlaps with others
            var overlaps = false;

            // Compare with all other supermarkets
            data.features.forEach(function(otherFeature, otherIndex) {

                // Skip if comparing a supermarket with itself
                if (index !== otherIndex) {

                    // Create a 1 km buffer around the other supermarket
                    var otherBuffer = turf.buffer(otherFeature, 1, {
                        units: "kilometers"
                    });

                    // Check if buffers intersect using Turf.js boolean intersection test
                    if (turf.booleanIntersects(currentBuffer, otherBuffer)) {
                        overlaps = true;
                    }
                }
            });

            // Store the overlap result in the feature properties for later use
            feature.properties.overlaps = overlaps;
        });

        // STEP 2: Create visual representation of all 1 km buffers
        // Buffer the entire feature collection to show all buffer zones
        var supermarketBuffer = turf.buffer(data, 1, {
            units: "kilometers"
        });

        // Add buffer zones to map as blue semi-transparent areas
        L.geoJSON(supermarketBuffer, {
            style: {
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.12,  // Semi-transparent fill
                weight: 2           // Border width
            }
        }).addTo(supermarketGroup);

        // STEP 3: Add supermarket points to map with color coding
        var supermarketLayer = L.geoJSON(data, {

            // Custom function to create circle markers instead of default pins
            pointToLayer: function(feature, latlng) {

                // Color coding:
                // Green = buffer does NOT overlap with other supermarkets
                // Red = buffer OVERLAPS with other supermarkets
                var color = feature.properties.overlaps ? "red" : "green";

                return L.circleMarker(latlng, {
                    radius: 8,
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.9,
                    weight: 2
                });
            },

            // Function to add popup when clicking on a supermarket point
            onEachFeature: function(feature, layer) {

                // Extract supermarket name from properties
                // Check multiple possible property names as GeoJSON sources vary
                var name =
                    feature.properties.name ||
                    feature.properties.Name ||
                    feature.properties.namn ||
                    "Supermarket";

                // Create status text based on overlap analysis
                var status = feature.properties.overlaps
                    ? "Overlapping buffer"
                    : "Not overlapping";

                // Create popup content with supermarket information
                layer.bindPopup(
                    "<b>" + name + "</b><br>" +
                    "Region: Stockholm<br>" +
                    "Buffer radius: 1 km<br>" +
                    "Status: " + status
                );
            }

        }).addTo(supermarketGroup);

        // Automatically zoom/fit map bounds to show all supermarket points
        map.fitBounds(supermarketLayer.getBounds());

        // STEP 4: Count overlapping vs non-overlapping supermarkets
        var overlapping = 0;
        var nonOverlapping = 0;

        data.features.forEach(function(feature) {
            if (feature.properties.overlaps) {
                overlapping++;
            } else {
                nonOverlapping++;
            }
        });

        // STEP 5: Display results in the sidebar info panel
        document.getElementById("info-content").innerHTML =
            "<h3>Task 3: Supermarkets in Region Stockholm</h3>" +
            "<p>The file <b>supermarket.geojson</b> has been loaded to the map.</p>" +
            "<p>A <b>1 km buffer</b> has been created around each supermarket using Turf.js.</p>" +
            "<p><span style='color:blue;'><b>Blue area</b></span> = 1 km buffer</p>" +
            "<p><span style='color:green;'><b>Green point</b></span> = supermarket whose buffer does not overlap</p>" +
            "<p><span style='color:red;'><b>Red point</b></span> = supermarket whose buffer overlaps another supermarket</p>" +
            "<hr>" +
            "<p><b>Not overlapping supermarkets:</b> " + nonOverlapping + "</p>" +
            "<p><b>Overlapping supermarkets:</b> " + overlapping + "</p>";

        // Display instruction in the side info area
        document.getElementById("side-info").innerHTML =
            "Task 3 is active. Click on a supermarket point to see its name and overlap status.";

    // Error handling if the GeoJSON file cannot be loaded
    }).fail(function() {
        document.getElementById("info-content").innerHTML =
            "<h3>Error</h3>" +
            "<p>Could not load <b>supermarket.geojson</b>.</p>" +
            "<p>Check that the file is inside the <b>static</b> folder and that the file name is exactly:</p>" +
            "<p><b>supermarket.geojson</b></p>";
    });
}

// ======================================================
// TASK 4: Image Overlay
// Add an image overlay on the map for the Stockholm area
// ======================================================
function runTask4() {
    // Define the geographic bounds for the image overlay
    // Format: [[south, west], [north, east]]
    var imageBounds = [[59.25, 17.90], [59.45, 18.20]];
    
    // Path to the image file to display
    var imageUrl = 'static/stockholm.jpeg';
    
    // Add the image overlay to the map with specified bounds and opacity
    L.imageOverlay(imageUrl, imageBounds, {
        opacity: 0.5,           // Semi-transparent (0-1, where 1 is fully opaque)
        interactive: true       // Allow interaction with the map beneath the image
    }).addTo(map);   
    
    // Automatically adjust map view to fit the image bounds
    map.fitBounds(imageBounds);
    
    // Show alert notification to user
    alert("Task 4 aktiverad: En bild har lagts över kartan.");
    
    // Log to console for debugging
    console.log("Task 4 aktiverad");
}

// ======================================================
// TASK 5: Marker Cluster
// 
// ======================================================

var markers = L.markerClusterGroup();


var fuelLayer = L.geoJson(fuel, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    }
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
        console.log();
    }    
}

// ======================================================
// TASK 5.1: Marker Cluster
// 
// ======================================================
fuel.features = fuel.features.filter(f => f.properties && f.properties.brand);

fuel.features.forEach(f => {
    f.properties.brand = f.properties.brand.toUpperCase();
});

var donutMarkers = L.DonutCluster(
    {
        chunkedLoading: true
    },
    {
        key: "brand",

        arcColorDict: {
            "CIRCLE K": "red",
            "IDS": "purple",
            "INGO": "brown",
            "OKQ8": "green",
            "PREEM": "blue",
            "SHELL": "yellow",
            "TANKA": "green",
            "ST1": "orange",
            "UNKNOWN": "gray"
        },

        style: {
            size: 50
        },

        textContent: 'total'
    }
);

fuel.features.forEach(function(feature) {
    var coordinate = feature.geometry.coordinates;
    var marker = L.marker([coordinate[1], coordinate[0]]);
    marker.feature = feature;
    marker.bindPopup(feature.properties.name || "no name");
    donutMarkers.addLayer(marker);
});

function runTask51() {
    if (map.hasLayer(donutMarkers)) {
        map.removeLayer(donutMarkers);
        console.log("Task 5.1 borta");
    } else {
        map.addLayer(donutMarkers);
        console.log("Task 5.1 aktiverad");
    }
}

