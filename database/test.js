db.serialize(function() {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='lorem'", function(error, row) {
        tableExists = (row != undefined);
        console.log("xxxxx " +tableExists);
    });

    console.log("yyyyy " +tableExists);

    if (tableExists) {
        console.log("table exists. cleaning existing records");
        db.run("DELETE FROM lorem", function(error) {
            if (error)
                console.log(error);
        });
    }
    else {
        console.log("creating table")
        db.run("CREATE TABLE lorem (info TEXT)", function(error) {
            if (error.message.indexOf("already exists") != -1) {
                console.log(error);
            }
        });
    }
});

db.serialize(function() {
    var name_array = ["COMPANY", "RESTAURANT"];
    var properties_array = [];
    properties_array["COMPANY"] = "CREATE TABLE COMPANY(ID INTEGER PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, AGE INT NOT NULL, ADDRESS CHAR(50), SALARY REAL);";    
    // properties_array["RESTAURANT"] = "CREATE TABLE RESTAURANT(
    //                                 ID INTEGER PRIMARY KEY     NOT NULL,
    //                                 NAME TEXT NOT NULL,
    //                                 ADDRESS TEXT NOT NULL,
    //                                 OWNERID INT NOT NULL,
    //                                 PERSONINCHARGE TEXT NOT NULL,
    //                                 FOREIGN KEY(OWNERID) references OWNER(ID),
    //                                 FOREIGN KEY(ID) references RESTAURANTINSPECTIONS(RESTAURANTID)
    //                                 );";
    for (i = 0; i < name_array.length; i++) { 
        db.get("SELECT * FROM " + name_array[i], function(error, row) {
        if(row == 0){
            console.log("creating table");
            db.run(properties_array[name_array[i]]);
        }
    });
    }
});

SELECT * FROM TABLE_NAME