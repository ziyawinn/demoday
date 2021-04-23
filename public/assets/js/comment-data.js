
// this func sets up event listener for 3 icons for every park name item
function routes(e){

  console.log (ServiceWorkerMessage)
  var thumbUp = document.getElementsByClassName("fa-thumbs-up");
  var trash = document.getElementsByClassName("fa-trash");
  var thumbDown = document.getElementsByClassName("fa-thumbs-down")

  Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.childNodes[1].innerText
         const thumbUp = parseFloat(this.parentNode.childNodes[3].innerText)
        fetch('thumbUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
           
            'thumbUp':thumbUp + 1
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
   
    const thumbDown = parseFloat(this.parentNode.childNodes[3].innerText)
    fetch('thumbDown', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        
        'thumbDown':thumbDown -1 
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



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
}




// process the user info (4/5)
// take info to comment form (3rd)
// store  info into data base  (4th)
// user input (user name) actual comment (2nd)
// like and dislikes (first)
// favoite parks Section



// data model collection (comments)
// parents of ID's
// like and dislike buttoin create a new document for each park
// if already exist update park document with new like with new like/ dislike count 