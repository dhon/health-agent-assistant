#!/bin/bash
#make this an argument l8r
DBNAME=TEST
# Defining my database first table (EXAMPLE)

STRUCTURE0="CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);";

STRUCTURE1="CREATE TABLE RESTAURANT(
   ID INT PRIMARY KEY     NOT NULL,
   NAME TEXT NOT NULL,
   ADDRESS TEXT NOT NULL,
   OWNERID INT NOT NULL,
   PERSONINCHARGE TEXT NOT NULL,
   FOREIGN KEY(OWNERID) references OWNER(ID),
   FOREIGN KEY(ID) references RESTAURANTINSPECTIONS(RESTAURANTID)
);";
STRUCTURE2="CREATE TABLE SEPTIC(
    ID INT PRIMARY KEY     NOT NULL,
    OWNERID INT NOT NULL,
    FOREIGN KEY(ID) references SYSTEMPUMPINGRECORD(SEPTICID),
    FOREIGN KEY(ID) references SEPTICINSPECTIONS(SEPTICID),
    FOREIGN KEY(OWNERID) references OWNER(ID)
);";
STRUCTURE3="CREATE TABLE WELL(
    ID INT PRIMARY KEY     NOT NULL,
    OWNERID INT NOT NULL,
    FOREIGN KEY(ID) references WATERQUALITYREPORT(WELLID),
    FOREIGN KEY(OWNERID) references OWNER(ID)
);";
STRUCTURE4="CREATE TABLE OWNER(
   ID INT PRIMARY KEY     NOT NULL,
   OWNERNAME TEXT       NOT NULL,
   TELEPHONENUMBER TEXT NOT NULL
);";
STRUCTURE5="CREATE TABLE PROPERTY(
   ID INT PRIMARY KEY     NOT NULL,
   GPSCOORDINATES REAL NOT NULL,
   ADDRESS TEXT NOT NULL,
   TOWN TEXT NOT NULL,
   STATE TEXT NOT NULL,   
   ZIPCODE INT NOT NULL,
   PLOTNUMER INT NOT NULL
);";

STRUCTURE6="CREATE TABLE RESTAURANTINSPECTIONS(
    ID INT PRIMARY KEY     NOT NULL,
    RESTAURANTID INT NOT NULL,
    INSPECTOR TEXT NOT NULL,
    RISKLEVEL TEXT NOT NULL,
    HACCP INTEGER NOT NULL,
    TIMEIN INTEGER NOT NULL,
    TIMEOUT INTEGER NOT NULL,
    TYPEOFOPERATION INTEGER NOT NULL,
    TYPEOFINSPECTION INTEGER NOT NULL,
    PREVIOUSINSPECTIONDATE INTEGER,
    REASONING INTEGER NOT NULL,
    OTHERREASONING TEXT,
    MANAGEMENTANDPERSONNEL TEXT,
    FOODANDFOODPROTECTION TEXT,
    EQUIPMENTANDUTENSILS TEXT,
    WATERPLUMBINGANDWASTE TEXT,
    PHYSICALFACILITY TEXT,
    POISONOUSORTOXICMATERIALS TEXT,
    SPECIALREQUIREMENTS TEXT,
    OTHER0 TEXT,
    DISCUSSIONWITHPERSONINCHARGE TEXT,
    CORRECTIVEACTIONREQUIRED INT,
    VOLUNTARYCOMPLIANCE INT,
    REINSPECTIONSCHEDULED INT,
    VOLUNTARYDISPOSAL INT,
    EMPLOYEERESTRICTIONEXCLUSION INT,
    EMERGENCYSUSPENSION INT,
    EMERGENCYCLOSURE INT,
    OTHER1 INT,
    ADDITIONALNOTES TEXT,
    FOREIGN KEY(TYPEOFOPERATION) REFERENCES TYPEOFOPERATION(ID),
    FOREIGN KEY(TYPEOFINSPECTION) REFERENCES TYPEOFINSPECTION(ID),
    FOREIGN KEY(REASONING) REFERENCES REASONING(ID),
    FOREIGN KEY(ID) REFERENCES VIOLATIONS(RESTAURANTINSPECTIONID)   
);";
SUBSTRUCTURE60="CREATE TABLE TYPEOFOPERATION(
    ID INT PRIMARY KEY     NOT NULL,
    OPERATIONTYPE TEXT NOT NULL
);";
SUBSTRUCTURE61="CREATE TABLE TYPEOFINSPECTION(
    ID INT PRIMARY KEY     NOT NULL,
    INSPECTIONTYPE TEXT NOT NULL
);";
SUBSTRUCTURE62="CREATE TABLE REASONING(
    ID INT PRIMARY KEY     NOT NULL,
    REASONING TEXT NOT NULL
);";

   #STATIC COMPONENT TABLE
STRUCTURE7="CREATE TABLE SYSTEMPUMPINGRECORD(
   ID INT PRIMARY KEY     NOT NULL,
   SEPTICID INT NOT NULL,
   PUMPINGDATE REAL NOT NULL,
   QUANTITYPUMPED REAL NOT NULL,
   SYSTEMQUALITYOTHER TEXT NOT NULL,
   EFFLUENTTEEFILTERPRESENT INT NOT NULL,
   IFYESWASITCLEANED INT NOT NULL,
   OBSERVEDCONDITION TEXT NOT NULL,
   SYSTEMPUMPEDBYNAME TEXT NOT NULL,
   SYSTEMPUMPEDBYLICENSE TEXT NOT NULL,
   SYSTEMPUMPEDBYCOMPANY TEXT NOT NULL,
   LOCATIONWHERECONTENTSWEREDISPOSED TEXT NOT NULL,
   HAULER TEXT NOT NULL,
   HAULERDATE TEXT NOT NULL,
   RECEIVINGFACILITY TEXT NOT NULL,
   RECEIVINGFACILITYDATE TEXT NOT NULL,
   FOREIGN KEY(SEPTICID) references SEPTIC(ID)
);";

#Part of System Pumping Records table
STRUCTURE8="CREATE TABLE SEPTICPUMPINGRECORD(
   ID INT PRIMARY KEY     NOT NULL,
   CESSPOOL INT NOT NULL,
   SEPTICTANK INT NOT NULL,
   TIGHTTANK INT NOT NULL,
   GREASETRAP INT NOT NULL,
   OTHER INT NOT NULL
);";

STRUCTURE9="CREATE TABLE VIOLATIONS(
   ID INT PRIMARY KEY     NOT NULL,
   RESTAURANTINSPECTIONID INT NOT NULL,
   CODEREFERENCE TEXT NOT NULL,
   CRITICALORREDITEM TEXT NOT NULL,
   DESCRIPTIONOFVIOLATIONCORRECTIONPLAN TEXT NOT NULL,
   DATEVERIFIED TEXT NOT NULL,
   FOREIGN KEY(RESTAURANTINSPECTIONID) references RESTAURANTINSPECTIONS(ID)
);";

STRUCTURE10="CREATE TABLE PRIVILEGES(
   ID INT PRIMARY KEY     NOT NULL,
   PRIVILEGELEVEL INT NOT NULL,
   USERID INT NOT NULL,
   FOREIGN KEY(USERID) references USER(ID)
);";

#Salt field?
STRUCTURE11="CREATE TABLE USER(
   ID INT PRIMARY KEY     NOT NULL,
   USERNAME TEXT NOT NULL,
   PASSWORDHASH NOT NULL,
   FOREIGN KEY(ID) references SAVEDSEARCHES(USERID),
   FOREIGN KEY(ID) references PRIVILEGES(USERID)
);";
STRUCTURE12="CREATE TABLE SAVEDSEARCHES(
   ID INT PRIMARY KEY     NOT NULL,
   USERID INT NOT NULL,
   SAVEDSEARCH TEXT NOT NULL,
   FOREIGN KEY(USERID) references USER(ID)
);";

#Are we using epoch time or string for the date?
STRUCTURE13="CREATE TABLE WATERQUALITYREPORT(
   ID INT PRIMARY KEY     NOT NULL,
   WELLID INT NOT NULL,
   CLIENTNAME TEXT NOT NULL,
   COLLECTEDBY TEXT NOT NULL,
   PROJECTNAME TEXT NOT NULL,
   PROJECTNUMBER TEXT NOT NULL,
   DATECOLLECTED INT NOT NULL,
   SAMPLEIDENTIFICATION TEXT NOT NULL,
   LABNUMBER REAL NOT NULL,
   TOTALCOLIFORMBACTERIA REAL NOT NULL,
   TOTALCOLIFORMBACTERIAUNITS TEXT NOT NULL,
   NITRATENITROGEN REAL NOT NULL,
   NITRATENITROGENUNITS TEXT NOT NULL,
   PH REAL NOT NULL,
   PHUNITS TEXT NOT NULL,
   IRON REAL NOT NULL,
   IRONUNITS TEXT NOT NULL,
   HARDNESSASCACO3 REAL NOT NULL,
   HARDNESSASCACO3UNITS TEXT NOT NULL,
   SULFATESULFUR REAL NOT NULL,
   SULFATESULFUREUNITS TEXT NOT NULL,
   CHLORIDE REAL NOT NULL,
   SPECIFICCONDUCTANCE REAL NOT NULL,
   SPECIFICCONDUCTANCEUNITS TEXT NOT NULL,
   THISWATERSAMPLEPASSESDRINKINGWATERSTANDARDS INT NOT NULL,
   SUBMITTEDBY TEXT NOT NULL,
   ADDITIONALNOTES TEXT,
   FOREIGN KEY(WELLID) references WELL(ID)
);";

STRUCTURE14="CREATE TABLE SEPTICINSPECTION(
   ID INT PRIMARY KEY NOT NULL,
   NAMEOFINSPECTOR TEXT NOT NULL,
   COMPANYNAME TEXT NOT NULL,
   COMPANYADDRESS TEXT NOT NULL,
   CITY TEXT NOT NULL,
   STATE TEXT NOT NULL,
   ZIPCODE INTEGER NOT NULL,
   TELEPHONENUMBER TEXT NOT NULL,
   LICENSENUMBER TEXT NOT NULL,
   DEPAPPROVAL INTEGER NOT NULL,
   SYSTEMPASSES INTEGER,
   SYSTEMPASSESCOMMENTS TEXT,
   SYSTEMCONDITIONALLYPASSES INTEGER,
   SYSTEMCONDITIONALLYPASSESWILLPASSIFREPLACED INTEGER,
   SYSTEMCONDITIONALLYPASSESCOMMENTS TEXT,
   SYSTEMCONDITIONALLYPASSESALARMS INTEGER,
   SYSTEMCONDITIONALLYPASSESSEWAGE INTEGER,
   SYSTEMCONDITIONALLYPASSESSEWAGEPIPE INTEGER,
   SYSTEMCONDITIONALLYPASSESSEWAGEPIPECOMMENTS TEXT,
   SYSTEMCONDITIONALLYPASSESSEWAGEOBSTRUCTION INTEGER,
   SYSTEMCONDITIONALLYPASSESSEWAGEOBSTRUCTIONCOMMENTS TEXT,
   SYSTEMCONDITIONALLYPASSESSEWAGEDISTRIBUTION INTEGER,
   SYSTEMCONDITIONALLYPASSESSEWAGEDISTRIBUTIONCOMMENTS TEXT,
   SYSTEMCONDITIONALLYPASSESFOURPUMPS INTEGER,
   SYSTEMCONDITIONALLYPASSESFOURPUMPSPIPE INTEGER,
   SYSTEMCONDITIONALLYPASSESFOURPUMPSPIPECOMMENTS TEXT,
   SYSTEMCONDITIONALLYPASSESFOURPUMPSOBSTRUCTION INTEGER,
   SYSTEMCONDITIONALLYPASSESFOURPUMPSOBSTRUCTIONCOMMENTS TEXT,
   FURTHEREVALUATION INTEGER,
   FURTHEREVALUATIONSYSTEMWILLPASSIF INTEGER,
   FURTHEREVALUATIONSYSTEMWILLFAILIF INTEGER,
   FURTHEREVALUATIONFIFTYTOONEHUNDRED INTEGER,
   FURTHEREVALUATIONMETHODUSEDTODETERMINE TEXT,
   FURTHEREVALUATIONCOMMENTS TEXT
   SYSTEMFAILUREBACKUP INTEGER,
   SYSTEMFAILUREDISCHARGE INTEGER,
   SYSTEMFAILURESTATICLIQUID INTEGER,
   SYSTEMFAILURELIQUIDDEPTH INTEGER,
   SYSTEMFAILUREREQUIREDPUMPING INTEGER,
   SYSTEMFAILUREBELOWHIGHGROUNDWATER INTEGER,
   SYSTEMFAILURESURFACEWATERSUPPLY INTEGER,
   SYSTEMFAILUREPUBLIC INTEGER,
   SYSTEMFAILUREPRIVATE INTEGER,
   SYSTEMFAILUREPRIVATEGREATER INTEGER,
   SYSTEMFAILUREGPD INTEGER,
   SYSTEMFAILUREFORREAL INTEGER,
   LARGESYSTEMSSURFACEDRINKING INTEGER,
   LARGESYSTEMSTRIBUTARY INTEGER,
   LARGESYSTEMSNITROGEN INTEGER,
   CHECKLISTINFORMATIONPROVIDED INTEGER,
   CHECKLISTPUMPEDOUTTWOWEEKS INTEGER,
   CHECKLISTNORMALFLOW INTEGER,
   CHECKLISTLARGEVOLUMESINTRODUCED INTEGER,
   CHECKLISTPLANSEXAMINED INTEGER,
   CHECKLISTBACKUPINSPECTED INTEGER,
   CHECKLISTBREAKOUTINSPECTED INTEGER,
   CHECKLISTCOMPONENTSONSITE INTEGER,
   CHECKLISTINTERIORINSPECTION INTEGER,
   CHECKLISTFACILITYOWNER INTEGER,
   CHECKLISTEXISTINGINFORMATION INTEGER,
   CHECKLISTDETERMINED INTEGER,
   RESIDENTIALBEDROOMSDESIGN INTEGER,
   RESIDENTIALBEDROOMSACTUAL INTEGER,
   RESIDENTIALDESIGNFLOW INTEGER,
   RESIDENTIALCOMMENTS TEXT,
   RESIDENTIALRESIDENTS INTEGER,
   RESIDENTIALGARBAGEGRINDER INTEGER,
   RESIDENTIALLAUNDRYSEPARATE INTEGER,
   RESIDENTIALLAUNDRYINSPECTION INTEGER,
   RESIDENTIALSEASONALUSE INTEGER,
   RESIDENTIALWATERMETERREADINGS INTEGER,
   RESIDENTIALWATERMETERCOMMENTS TEXT,
   RESIDENTIALSUMPPUMP INTEGER,
   RESIDENTIALDATEOFOCCUPANCY INTEGER,
   COMMERCIALTYPE TEXT,
   COMMERCIALDESIGNFLOW INTEGER,
   COMMERCIALBASISOFDESIGNFLOW TEXT,
   COMMERCIALGREASETRAP INTEGER,
   COMMERCIALINDUSTRIALWASTE INTEGER,
   COMMERCIALWASTEDISCHARGE INTEGER,
   COMMERCIALWATERMETERREADINGS TEXT,
   COMMERCIALDATEOFOCCUPANCY INTEGER,
   COMMERCIALCOMMENTS TEXT,
   GENERALSOURCE TEXT,
   GENERALPUMPED INTEGER,
   GENERALVOLUMEPUMPED INTEGER,
   GENERALQUANTITYDETERMINED TEXT,
   GENERALREASONFORPUMPED TEXT
   GENERALTYPEOFSYSTEM INTEGER,
   GENERALTYPEOFSYSTEMCOMMENT TEXT,
   GENERALCOMPONENTAGE INTEGER,
   GENERALCOMPONENTDATE INTEGER,
   GENERALCOMPONENTSOURCE TEXT,
   GENERALSEWAGEODORS INTEGER,
   BUILDINGSEWERDEPTHBELOWGRADE INTEGER,
   BUILDINGSEWERMATERIAL INTEGER,
   BUILDINGSEWERMATERIALCOMMENT TEXT,
   BUILDINGSEWERDISTANCEFROMPRIVATE INTEGER,
   BUILDINGSEWERCOMMENTS TEXT,
   SEPTICTANKDEPTHBELOWGRADE INTEGER,
   SEPTICTANKMATERIAL INTEGER,
   SEPTICTANKMATERIALCOMMENT TEXT,
   SEPTICTANKMETALAGE INTEGER,
   SEPTICTANKCOMPLIANCE INTEGER,
   SEPTICTANKDIMENSIONS TEXT,
   SEPTICTANKSLUDGEDEPTH INTEGER,
   SEPTICTANKDISTANCEFROMTOPOFSLUDGE INTEGER,
   SEPTICTANKSCUMTHICKNESS INTEGER,
   SEPTICTANKDISTANCEFROMTOPOFSCUM INTEGER,
   SEPTICTANKDISTANCEFROMBOTTOMOFSCUM INTEGER,
   SEPTICTANKDIMENSIONSOBTAINED TEXT,
   SEPTICTANKCOMMENTS TEXT,
   GREASETRAPDEPTHBELOWGRADE INTEGER,
   GREASETRAPMATERIAL INTEGER,
   GREASETRAPMATERIALCOMMENT TEXT,
   GREASETRAPDIMENSIONS TEXT,
   GREASETRAPSCUMTHICKNESS INTEGER,
   GREASETRAPDISTANCEFROMTOPOFSCUM INTEGER,
   GREASETRAPDISTANCEFROMBOTTOMOFSCUM INTEGER,
   GREASETRAPDATEOFLASTPUMPING INTEGER,
   GREASETRAPCOMMENTS TEXT,
   TIGHTORHOLDINGTANKDEPTHBELOWGRADE INTEGER,
   TIGHTORHOLDINGTANKMATERIAL INTEGER,
   TIGHTORHOLDINGTANKMATERIALCOMMENT TEXT,
   TIGHTORHOLDINGTANKDIMENSIONS TEXT,
   TIGHTORHOLDINGTANKCAPACITY INTEGER,
   TIGHTORHOLDINGTANKDESIGNFLOW INTEGER,
   TIGHTORHOLDINGTANKALARMPRESENT INTEGER,
   TIGHTORHOLDINGTANKALARMLEVEL TEXT,
   TIGHTORHOLDINGTANKALARMWORKING INTEGER,
   TIGHTORHOLDINGTANKDATEOFLASTPUMPING INTEGER,
   TIGHTORHOLDINGTANKCOMMENTS TEXT,
   DISTRIBUTIONBOXDEPTHOFLIQUID INTEGER,
   DISTRIBUTIONBOXCOMMENTS TEXT,
   PUMPCHAMBERPUMPSWORK INTEGER,
   PUMPCHAMBERALARMWORK INTEGER,
   PUMPCHAMBERCOMMENTS TEXT,
   SOILABSORPTIONSYSTEMCOMMENTS INTEGER,
   SOILABSORPTIONLEACHINGPITS INTEGER,
   SOILABSORPTIONLEACHINGPITSNUMBER INTEGER,
   SOILABSORPTIONLEACHINGCHAMBERS INTEGER,
   SOILABSORPTIONLEACHINGCHAMBERSNUMBER INTEGER,
   SOILABSORPTIONLEACHINGGALLERIES INTEGER,
   SOILABSORPTIONLEACHINGGALLERIESNUMBER INTEGER,
   SOILABSORPTIONLEACHINGTRENCHES INTEGER,
   SOILABSORPTIONLEACHINGTRENCHESNUMBER INTEGER,
   SOILABSORPTIONLEACHINGTRENCHESLENGTH INTEGER,
   SOILABSORPTIONLEACHINGFIELDS INTEGER,
   SOILABSORPTIONLEACHINGFIELDSNUMBER INTEGER,
   SOILABSORPTIONLEACHINGFIELDSDIMENSION TEXT,
   SOILABSORPTIONOVERFLOWCESSPOOL INTEGER,
   SOILABSORPTIONOVERFLOWCESSPOOLNUMBER INTEGER,
   SOILABSORPTIONINNOVATIVE INTEGER,
   SOILABSORPTIONINNOVATIVENAME TEXT,
   SOILABSORPTIONCOMMENTS TEXT,
   CESSPOOLSNUMBER INTEGER,
   CESSPOOLSCONFIGURATION TEXT,
   CESSPOOLSDEPTHTOP INTEGER,
   CESSPOOLSDEPTHSOLID INTEGER,
   CESSPOOLSDEPTHSCUM INTEGER,
   CESSPOOLSDIMENSION TEXT,
   CESSPOOLSMATERIAL TEXT,
   CESSPOOLSINDICATIONOFGROUNDWATER INTEGER,
   CESSPOOLSCOMMENTS TEXT,
   PRIVYMATERIAL TEXT,
   PRIVYDIMENSIONS TEXT,
   PRIVYDEPTHOFSOLIDS INTEGER,
   PRIVYCOMMENTS TEXT,
   SITEEXAMCHECKSLOPE INTEGER,
   SITEEXAMSURFACEWATER INTEGER,
   SITEEXAMCHECKCELLAR INTEGER,
   SITEEXAMSHALLOWWELLS INTEGER,
   SITEEXAMDEPTHTOHIGHGROUNDWATER INTEGER,
   SITEEXAMMETHODSDESIGNPLANS INTEGER,
   SITEEXAMMETHODSDESIGNPLANSDATE INTEGER,
   SITEEXAMMETHODSOBSERVEDSITE INTEGER,
   SITEEXAMMETHODSCHECKEDWITHBOARDOFHEALTH INTEGER,
   SITEEXAMMETHODSCHECKEDWITHBOARDOFHEALTHCOMMENTS TEXT,
   SITEEXAMMETHODSCHECKEDWITHLOCALEXCAVATORS INTEGER,
   SITEEXAMMETHODSACCESSEDUSGS INTEGER,
   SITEEXAMMETHODSACCESSEDUSGSCOMMENTS TEXT,
   SITEEXAMDESCRIBE TEXT,
   REPORTCOMPLETENESSABCDE INTEGER,
   REPORTCOMPLETENESSD INTEGER,
   REPORTCOMPLETENESSSYSTEMINFORMATION INTEGER
);";

STRUCTURE15="CREATE TABLE DEPAPPROVAL(
    ID INT PRIMARY KEY NOT NULL,
    PASSES INTEGER,
    CONDITIONALLYPASSES INTEGER,
    FAILS INTEGER,
    NEEDSFURTHEREVALUATIONBYTHELOCALAPPROVINGAUTHORITY INTEGER
);";

STRUCTURE16="CREATE TABLE SYSTEMWILLPASSIF(
    ID INT PRIMARY KEY NOT NULL,
    SURFACEWATER INTEGER,
    WETLAND INTEGER
);";

STRUCTURE17="CREATE TABLE SYSTEMWILLFAILIF(
    ID INT PRIMARY KEY NOT NULL,
    WATERSUPPLY INTEGER,
    PUBLICWATER INTEGER,
    PRIVATEWATER INTEGER
);";

STRUCTURE18="CREATE TABLE GENERALTYPEOFSYSTEM(
    SEPTICTANK INTEGER,
    SINGLECESSPOOL INTEGER,
    OVERFLOWCESSPOOL INTEGER,
    PRIVY INTEGER,
    SHAREDSYSTEM INTEGER,
    INNOVATIVE INTEGER,
    TIGHTTANK INTEGER,
    OTHER INTEGER
);";

STRUCTURE19="CREATE TABLE BUILDINGSEWERMATERIAL(
    CASTIRON INTEGER,
    PVC INTEGER,
    OTHER INTEGER
);";

STRUCTURE20="CREATE TABLE SEPTICTANKMATERIAL(
    CONCRETE INTEGER,
    METAL INTEGER,
    FIBERGLASS INTEGER,
    POLYETHYLENE INTEGER,
    OTHER INTEGER
);";

STRUCTURE21="CREATE TABLE GREASETRAPMATERIAL(
    CONCRETE INTEGER,
    METAL INTEGER,
    FIBERGLASS INTEGER,
    POLYETHYLENE INTEGER,
    OTHER INTEGER
);";

STRUCTURE22="CREATE TABLE TIGHTORHOLDINGTANKMATERIAL(
    CONCRETE INTEGER,
    METAL INTEGER,
    FIBERGLASS INTEGER,
    POLYETHYLENE INTEGER,
    OTHER INTEGER
);";

# Creating an Empty db file and filling it with my structure
echo $STRUCTURE0 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE1 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE2 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE3 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE4 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE5 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE6 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE7 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE8 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE9 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE10 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE11 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE12 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE13 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE14 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE15 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE16 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE17 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE18 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE19 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE20 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE21 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE22 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE60 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE61 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
echo $STRUCTURE62 > /tmp/tmpstructure
sqlite3 $DBNAME < /tmp/tmpstructure;
rm -f /tmp/tmpstructure;

# Inserting some data into my structure
#sqlite3 dbname.db "INSERT INTO data (name,value) VALUES ('MyName','MyValue')";
#sqlite3 dbname.db "INSERT INTO data (name,value) VALUES ('MyOtherName','MyOtherValue')";

# Getting my data
#LIST=`sqlite3 dbname.db "SELECT * FROM data WHERE 1"`;

# For each row
for ROW in $LIST; do

    # Parsing data (sqlite3 returns a pipe separated string)
    Id=`echo $ROW | awk '{split($0,a,"|"); print a[1]}'`
    Name=`echo $ROW | awk '{split($0,a,"|"); print a[2]}'`
    Value=`echo $ROW | awk '{split($0,a,"|"); print a[3]}'`
    
    # Printing my data
    echo -e "\e[4m$Id\e[m) "$Name" -> "$Value;
    
done








