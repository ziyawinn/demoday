

// document.getElementById("states").addEventListener("change", handleState);

// function handleState(e) {
//   console.log(e.target.value);
//   if (e.target.value == "Pennsylvania") {
//     window.location='/pennsylvania-park-data'
//   }
// }
//  function handleState(e) {
//     console.log(e.target.value);
//      if (e.target.value == "California") {
//       window.location='/California-park-data'
//     }
//   }
//   function handleState(e) {
//     console.log(e.target.value);
//       if (e.target.value == "massachusetts") {
//       window.location='/massachusettsParkData'
//     }
//   }

  var mymap = L.map('mapid').setView([39.958289,-75.1742076],13);
 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);



    
//   I want ti render the data from console to the browser 
// 1 in front end coding read in playgrounds.js 
// 2 parce data and loop data to do something
// 3 show each park in the front end
// 4  add user input to location (zip code)
// 5 find closst 3 to 5 park locations
// 
var i; 
for (i =0; i <playgroundsData.features.length; i++){
 var coordinates = [playgroundsData.features[i].geometry.coordinates[1],playgroundsData.features[i].geometry.coordinates[0]];

  L.marker(coordinates).addTo(mymap)
    .bindPopup(playgroundsData.features[i].properties.PARK_NAME )
    .openPopup();
   
}


 console.log (playgroundsData.features[1
].properties.ZIPCODE )
 