// const fetch= require ("node-fetch")

// const { name } = require("ejs");

var mymap = L.map("mapid").setView([39.958289, -75.1742076], 13);
var currentParks = L.featureGroup()

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

//   I want ti render the data from console to the browser
// 1 in front end coding read in playgrounds.js
// 2 parce data and loop data to do something
// 3 show each park in the front end
// 4  add user input to location (zip code)
// 5 find closst 3 to 5 park locations
//
async function plays(e) {
  
   document.querySelector("form").classList.remove("hide")
  console.log ("click")
  removeAllMarkers(mymap)
  var userInput = document.getElementById("input").value;
  var i;
  availableParks = playgroundsData.features.filter(
    (park) => park.properties.ZIPCODE === userInput
  );
  var nameParks =document.getElementById("nameparks");
  nameParks.innerHTML='';

  async function fetchAsyncMessages () {
    let data = await (await fetch('/getMessages')).json();
    return data;
  }
    // Put 

  for (i = 0; i < availableParks.length; i++) {
    var coordinates = [
      availableParks[i].geometry.coordinates[1],
      availableParks[i].geometry.coordinates[0],
    ];
    // console.log(availableParks[i].properties.PARK_NAME)

    // console.log(playgroundsData.features[100].properties.ZIPCODE )
   const opinion = document.createElement("div")
   const pOption = document.createElement('option')
    var commentsmaps = document.createElement("p");
    opinion.className ='opinion' 
   
    console.log (playgroundsData.features.filter(park => park.properties.PARK_NAME===availableParks[i].properties.PARK_NAME)[0]["likes"])

    opinion.innerHTML =`	<p>0<p><i class=\"fas fa-thumbs-up\"></i> <i class=\"fas fa-thumbs-down\"></i>`
   pOption.value = availableParks[i].properties.PARK_NAME
   pOption.innerText = availableParks[i].properties.PARK_NAME

   
   var textpage = document.createTextNode(availableParks[i].properties.PARK_NAME); 
   document.querySelector(".pSelection").appendChild(pOption)

    // commentspage.appendChild(textmap)
    commentsmaps.appendChild(textpage)
    // nameParks.insertBefore(commentspage);
     nameParks.innerHTML += `<div class=\" pk\"><p>${availableParks[i].properties.PARK_NAME}</p>${opinion.innerHTML}</div>`;

     let messagesResponse = await fetchAsyncMessages()
      // console.log(messagesResponse, 'FULL OBJECT')
      let messagesResponseFilteres =  await messagesResponse.filter(message => message.selection === availableParks[i].properties.PARK_NAME)
      messagesResponseFilteres.forEach((el) => {
        let comment = document.createTextNode(el.selection); 
        commentsmaps.appendChild(comment)
        nameParks.innerHTML += `<div class=\" pk\"><p>${el.comments}</p></div>`;
      })
      // console.log(messagesResponseFilteres, 'info')
     
    L.marker(coordinates)
      .addTo(mymap)

      .bindPopup(commentsmaps)
      .openPopup();

  }
  document.getElementById("go").addEventListener('click',e =>{
    var parkInput = document.getElementById("pSelect").value
    var comment = document.getElementById("pComment").value
    fetch ("/messages", {
      method:"POST",body: {comments:comment,selection:parkInput}
    })
    .then (info => console.log (info))
    .catch
    (err => console.log(err))
    })


  // function addParkNames()
  // var nameParks =document.getElementById("nameparks");
  // var thumbUp = document.getElementsByClassName("fa-thumbs-up");
  // var trash = document.getElementsByClassName("fa-trash");
  // var thumbDown = document.getElementsByClassName("fa-thumbs-down")

}
document.getElementById("button").addEventListener("click", plays);
function removeAllMarkers(map) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer)
    }
  })
}
document.getElementById("go").addEventListener("click", Review);
function Review (){
  var postBody=  {comments: document.getElementById("pComment").value, selection: document.getElementById("pSelect").value}
  console.log (postBody)
  fetch('/messages', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(postBody)
  }).then(function(response) {
    // location.reload();
    plays()
    return response.json();
  }).then(function(data) {
    // ChromeSamples.log('Created Gist:', data.html_url);
    console.log ()
  });
}
function thumbs(e){

  console.log (ServiceWorkerMessage)
  var thumbUp = document.getElementsByClassName("fa-thumbs-up");
  var trash = document.getElementsByClassName("fa-trash");
  var thumbDown = document.getElementsByClassName("fa-thumbs-down")

  Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log ("click")
        const name = this.parentNode.childNodes[1].innerText
       
        const thumbUp = parseFloat(this.parentNode.childNodes[4].innerText)
        fetch('thumbUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
           'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.childNodes[1].innerText
    console.log( this.parentNode.childNodes)
    const thumbDown = parseFloat(this.parentNode.childNodes[3].innerText)
    this.parentNode.childNodes[3].innerText= thumbDown --
  //   fetch('thumbDown', {
  //     method: 'put',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       'name': name,
        
  //       'thumbDown':thumbDown
  //     })
  //   })
  //   .then(response => {
  //     if (response.ok) return response.json()
  //   })
  //   .then(data => {
  //     console.log(data)
  //     window.location.reload(true)
  //   })
  });
  });



// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
}



// add a favorites list to pop ups icons
// save favorites parks
// https://www.googleapis.com/customsearch/v1?key=AIzaSyDB9lOTV1FEXd-bNc3N5vYyYx7VdMZDrwk&cx=b5a6b8902adc6c2f6&q=McPhersonSquare
// 

// morning get comments on page and like button wiorking
// change sectioms of comments to html css section bottom of page block pictures 