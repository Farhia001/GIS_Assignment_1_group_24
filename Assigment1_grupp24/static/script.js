// Initialize the Leaflet map centered on Sweden with zoom level 5
// [62.0, 15.0] is approximately the center of Sweden (latitude, longitude)
var map = L.map('map').setView([62.0, 15.0], 5);

// Add OpenStreetMap tile layer to the map
// This provides the background map imagery
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ======================================================
// TASK 1 - Currently a placeholder function
// ======================================================
function runTask1() {
    console.log("Task 1 aktiverad");
}

// ======================================================
// TASK 2 - Currently a placeholder function
// ======================================================
function runTask2() {
    console.log("Task 2 aktiverad");
}

// ======================================================
// TASK 3: Supermarket Buffer Analysis
// Load supermarket.geojson and analyze buffer overlaps
// Show supermarket names in popup
// Create 1 km buffer around each supermarket
// Highlight supermarkets that do NOT overlap
// Region: Stockholm
// ======================================================
function runTask3() {
    // Log to console for debugging
    console.log("Task 3 aktiverad");
    console.log("TEST CHANGE: This is a test log message to confirm Task 3 is running.");
    
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
function runTask5() {
    console.log("Task 5 aktiverad");
}
