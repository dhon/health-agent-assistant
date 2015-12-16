//// API calls to and from database
function addLocation(location){
$.ajax({
 type: "POST",
 url: './api/add',
 data: location,
 success: function(msg){
      console.log('Success ' + msg);
     },
 dataType: "json"
});
}

function editLocation(location, id){
$.ajax({
 type: "POST",
 url: './api/edit',
 data: {
  'location': location.location,
  'type': location.type,
  'Name': location.name,
  'Address': location.address,
  'Telephone': location.telephone,
  'Owner': location.owner,
  'Person': location.person,
  'id': location.id
 },
 success: function(msg){
      console.log('Success ' + msg);
     },
 dataType: "json"
});
}

function removeLocation(location){
$.ajax({
 type: "POST",
 url: './api/remove',
 data: {
  'location': location.location,
  'type': location.type,
  'id': location.id
 },
 success: function(msg){
      console.log('Success ' + msg);
     },
 dataType: "json"
});
}

function getLocation(location){
$.ajax({
 type: "GET",
 url: './api/get',
 data: location,
 success: function(msg){
      console.log('Success ' + msg);
     },
  error: function(arg){
    console.log("error!!!");
  },
 dataType: "json"
});
}

function getDatabase(location, callback){
$.ajax({
 type: "GET",
 url: './api/database',
 data: location.location,
 success: function(locations){
      console.log('Success ' + locations);
      callback();
     },
 dataType: "json"
});
}


//// End User Routes