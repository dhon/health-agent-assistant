/*
Note from Dom:

This is a list of Json objects that our server should be able to properly handle.
This is not a complete, rigorous list of test cases, it's a starting point.

TO-DO: add code to have this file send the JSON files on its own and check whatever gets sent back for accuracy.
*/


//Testing /api/add
//First try adding two Restaurant reports to Leverett
var api_add = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Name": "WcDonalds",
	"Address": "999 Lois Lane",
	"Telephone": "1113335555",
	"Owner": "Bobby Malone",
	"PIC": "Frederick Malone"
};
var api_add2 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Name": "McDonalds",
	"Address": "The Street",
	"Telephone": "9997874014",
	"Owner": "Calvin",
	"PIC": "Susie Derkins"
};
//Checking to see if we can add the same records to Sunderland without troubles
var api_add = {
	"location": ["Sunderland"],
	"type": "Restaurant",
	"Name": "WcDonalds",
	"Address": "999 Lois Lane",
	"Telephone": "1113335555",
	"Owner": "Bobby Malone",
	"PIC": "Frederick Malone"
};
var api_add2 = {
	"location": ["Sunderland"],
	"type": "Restaurant",
	"Name": "McDonalds",
	"Address": "The Street",
	"Telephone": "9997874014",
	"Owner": "Calvin",
	"PIC": "Susie Derkins"
};
//Testing /api/get
//One record matches info provided
var api_get = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Telephone":"1113335555"
	"Owner":"Bobby Malone"
};
//Multiple records match info provided
var api_get = {
	"location": ["Leverett"],
	"type": "Restaurant",
};
//No records match info provided
var api_get = {
	"location": ["Leverett"],
	"type": "Restaurant",
};
//Same tests for Sunderland...
//One record matches info provided
var api_get = {
	"location": ["Sunderland"],
	"type": "Restaurant",
	"Telephone":"1113335555"
	"Owner":"Bobby Malone"
};
//Multiple records match info provided
var api_get = {
	"location": ["Sunderland"],
	"type": "Restaurant",
};
//No records match info provided
var api_get = {
	"location": ["Sunderland"],
	"type": "Restaurant",
};

//Testing /api/edit
//TO-DO: need to use the id of the restaurants we've already added
//Try one where the id doesn't exist
var api_edit = {
	"location":"Leverett",
	"type":"Septic",
	"id":7
};
//Try one where the id does exist
var api_edit = {
	"location":"Leverett",
	"type":"restaurant",
	"id":1
	"PIC":"Calvin&Hobbes"
};
//See if it updated...
var api_get = {
	"location":"Leverett",
	"id"=1
};
//Same tests for Sunderland
//TO-DO: need to use the id of the restaurants we've already added
//Try one where the id doesn't exist
var api_edit = {
	"location":"Leverett",
	"type":"Septic",
	"id":7
};
//Try one where the id does exist
var api_edit = {
	"location":"Leverett",
	"type":"restaurant",
	"id":1
	"PIC":"Calvin&Hobbes"
};
//See if it updated...
var api_get = {
	"location":"Leverett",
	"id"=1
};


//Testing /api/remove
//Case 1: ID doesn't exist
var api_remove = {
	"location": ["Sunderland"],
	"Id": 5
};
//Case 2:ID does exist
var api_remove = {
	"location": ["Sunderland"],
	"Id": 1
};
//Check they no longer exist:
var api_get = {
	"location":"Sunderland",
	"id"=1
};
//Same cases for Leverett:
//Case 1: ID doesn't exist
var api_remove = {
	"location": ["Leverett"],
	"Id": 5
};
//Case 2:ID does exist
var api_remove = {
	"location": ["Leverett"],
	"Id": 1
};
//Check they no longer exist:
var api_get = {
	"location":"Sunderland",
	"id"=1
};

//Testing /api/database
//Leverett...
var api_database = {
	"location": ["Leverett"]
};
//Both locations
var api_database = {
	"location": ["Leverett","Sunderland"]
};
//Sunderland
var api_database = {
	"location": ["Sunderland"]
};


//Testing /api/user/register/
//Adding a user
var test= {
"username":"Dom",
"password":"dompassword"
}

//Trying to add someone with the same username
var test= {
"username":"Dom",
"password":"newpassword"
}

//Adding a user
var test= {
"username":"Jason",
"password":"jjjjjj"
}

//Adding a user with an empty username string
var test={
"username":"",
"password":"dompassword"
}

//Adding a user with an empty password string
var test={
"username":"Dom",
"password":""
}


//Testing /api/user/editpassword

//At this point, we should have current users: (Dom,dompassword) and (Jason,jjjjjj)
	
//Valid username, doesn't change password
var test={
"username":"Dom",
"password":"dompassword"
}

//Valid username, changes password
var test={
"username":"Dom",
"password":"newpassword"
}	


//Valid username, empty password
var test={
"username":"Jason",
"password":""
}

//Valid username, changes password
var test={
"username":"Jason",
"password":"new"
}

//Invalid username
var test={
"username":"notusername",
"password":"notpassword"
}

//Valid username, super long password
var test={
"username":"Dom",
"password":"waywaywaywaywaywaywaywaywaywaywaywaywaywaywaywaywaywaytoolongofrareasonablepasswordIhopewedon'tletsomeonechooseapasswordthatisthislong"
}

//Give user Dom a normal length password
var test={
"username":"Dom",
"password":"newpassword"
}



//Testing /api/user/login

//Valid username, valid password
var test={
"username":"Dom",
"password":"newpassword"
}

//Valid username, old password
var test={
"username":"Jason",
"password":"jjjjjj"
}

//User is already logged in, tries to log in
var test={
"username":"Dom",
"password":"newpassword"
}

//Valid username, invalid password
var test={
"username":"Dom",
"password":"notmypassword"
}

//Invalid username
var test={
"username":"Domnot",
"password":"newpassword"
}

//Still must be tested:
// /api/user/addsearch
// /api/user/removesearch
// /api/user/getsearches
