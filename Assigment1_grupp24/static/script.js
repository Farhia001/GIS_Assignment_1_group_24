var map = L.map('map').setView([62.0, 15.0], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function runTask1() {
    console.log("Task 1 aktiverad");
}
function runTask2() {
    console.log("Task 2 aktiverad");
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
function runTask5() {
    console.log("Task 5 aktiverad");
}
