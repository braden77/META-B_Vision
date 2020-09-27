d3.json("/api/v1.0/canada_covid", function(data){
    //console.log(data)
    var filteredData = data.filter(function (d) {
      return d.province_name != "Canada" && d.province_name !=  "Repatriated travellers" && d.date=="18-09-2020";
    });
      var location =[];
      filteredData.forEach(fdata=>{
        fdata["Coordinate"]=[fdata.latitude, fdata.longitude]
      // })
    })
   console.log(filteredData)

  var active_cases = [];
  var confirmed_cases = [];
  var daily_cases = [];
  var daily_deaths = [];
  var daily_tests = [];
  var total_recovered = [];
  var total_recovered_today = [];

  // Loop through locations and create city and state markers
    for (var i = 0; i < filteredData.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    active_cases.push(
      L.marker([filteredData[i].latitude, filteredData[i].longitude])
      .bindPopup("<h1>" + filteredData[i].province_name + "</h1>" + "<hr>" + "<h2>"+ "Active Cases:  " + filteredData[i].active_cases + "</h2>")
     // .on('click', onClick)
     );

    daily_cases.push(
        L.marker([filteredData[i].latitude, filteredData[i].longitude])
        .bindPopup("<h1>" + filteredData[i].province_name + "</h1>" + "<hr>" + "<h2>"+ "Daily New Cases: " + filteredData[i].daily_cases + "</h2>")
        );

    daily_deaths.push(
        L.marker([filteredData[i].latitude, filteredData[i].longitude])
        .bindPopup("<h1>" + filteredData[i].province_name + "</h1>" + "<hr>" + "<h2>"+ "Daily Deaths:    " + filteredData[i].daily_deaths + "</h2>")
      );

    daily_tests.push(
        L.marker([filteredData[i].latitude, filteredData[i].longitude])
        .bindPopup("<h1>" + filteredData[i].province_name + "</h1>" + "<hr>" + "<h2>"+ "Daily Tests: " + filteredData[i].daily_tests + "</h2>")
      );

    total_recovered.push(
        L.marker([filteredData[i].latitude, filteredData[i].longitude])
        .bindPopup("<h1>" + filteredData[i].province_name + "</h1>" + "<hr>" + "<h2>"+ "Total Recovered: " + filteredData[i].total_recoverd + "</h2>")
      );

    total_recovered_today.push(
        L.marker([filteredData[i].latitude, filteredData[i].longitude]).bindPopup("<h1>" + filteredData[i].province_name + "</h1>" + "<hr>" + "<h2>"+ "Total Recovered Today:  " + filteredData[i].total_recovered_today + "</h2>")
      );

    
}

var active_cases_layer = L.layerGroup(active_cases);
var daily_cases_layer = L.layerGroup(daily_cases);
var daily_deaths_layer = L.layerGroup(daily_deaths);
var daily_tests_layer = L.layerGroup(daily_tests);
var total_recovered_layer = L.layerGroup(total_recovered);
var total_recovered_today_layer = L.layerGroup(total_recovered_today);

// Define variables for our tile layers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: "pk.eyJ1IjoiZW1zaGV2cyIsImEiOiJja2V6d2dod3cwdDdhMnZwM3liaDJ5bHN1In0.k3SLAZIijw5HaS2w3dfQag"
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: "pk.eyJ1IjoiZW1zaGV2cyIsImEiOiJja2V6d2dod3cwdDdhMnZwM3liaDJ5bHN1In0.k3SLAZIijw5HaS2w3dfQag"
});

var baseMaps = {
    Light: light,
    Dark: dark
  };
  
  // Overlays that may be toggled on or off
  var overlayMaps = {
    "Active Cases ": active_cases_layer,
    "Daily New Cases ": daily_cases_layer,
    "Daily Deaths ": daily_deaths_layer,
    "Daily Tests " : daily_tests_layer,
    "Total Recovered " : total_recovered_layer,
    "Total Recovered Today " : total_recovered_today_layer
};

var myMap = L.map("map", {
    center: [60.59, -99.3468],
    zoom: 3,
    layers: [light, active_cases_layer, daily_cases_layer, daily_deaths_layer, daily_tests_layer, total_recovered_layer, total_recovered_today_layer]
});

L.control.layers(baseMaps).addTo(myMap);
L.control.layers(overlayMaps).addTo(myMap);

myMap.on('popupopen', function (e) {
  currentPopup = e.popup; // keep track of current popup
  // Do stuff with the popup or inspect it's marker here...
  console.log(currentPopup)

  var selection = currentPopup._content
  console.log(selection)
  var splitselection = selection.split('<').join('>').split(":").join(">").split('>')
  console.log(splitselection)
  var provinceselected = splitselection[2];
  var categoryselected = splitselection[8];
  console.log(provinceselected);
  console.log(categoryselected);

  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3.select("col-md-12")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

  var newdata = data.filter(function(d) {return d.province_name === provinceselected})
  console.log(newdata)

  

});




// var group = L.featureGroup();

// active_cases_layer.addTo(group);
// //vectorGrid_weight.addTo(group);
// //vectorGrid_skrym.addTo(group);

// group.on('click', function(e){
// var popup = e.target.getPopup();
// var content = popup.getContent();

// console.log(content);
// })

// group.addTo(myMap);


// L.control.layers(baseMaps).addTo(myMap);
// L.control.layers(overlayMaps).addTo(myMap);



// function onClick(e) {
//   var popup = e.target.getPopup();
//   var content = popup.getContent();

//   console.log(content);
// }

// var trace = {
//   x: [data.map(d => d.date)],
//   y: [16, 5, 11, 9],
//   type: 'scatter'
// };
// var data = [trace];
// Plotly.newPlot('myDiv', data);


});


// var link = "../static/data/canada.geojson";

// d3.json(link, function(data) {
//     // Creating a geoJSON layer with the retrieved data
//     L.geoJson(data, {
//       // Style each feature (in this case a neighborhood)
//       style: function(feature) {
//         return {
//           color: "blue",
//           // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//           fillOpacity: 0.3,
//           weight: 2
//         };
//       },
//       // Called on each feature
//       onEachFeature: function(feature, layer) {
//         // Set mouse events to change map styling
//         layer.on({
//           // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//           mouseover: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.8
//             });
//           },
//           // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//           mouseout: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.5
//             });
//           },
//           // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
//           click: function(event) {
//             myMap.fitBounds(event.target.getBounds());
//           }
//         });
  
//       }
//     }).addTo(myMap);

//   });