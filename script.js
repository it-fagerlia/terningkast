//---Declaration of GLOBAL VARIABLES (should be in the very top of the script)
var maxThrows;          // Number of throws in one experiment
var maxSides; 		 	 	// Number of sides for each cube (assume specially designed :-) )
var summedResults = []; // A global array that will hold all results for one experiment
var timeToExecute;		// A global variable to store the execution time of the experiment

//---Canvas parameters
var canvas,ctx;
//---When the content described in HTML is loaded the function winInit will be run.
window.onload = winInit;


//---This function serves as the main program
function winInit(){ // Our standard function to be called when HTML has been loaded.
	document.getElementById("btnRun").onclick = runUserExperiment;     // Run this function when button clicked
	document.getElementById("nmbThrows").onchange = runUserExperiment; // Run this function when enter is pressed
	canvas = document.getElementById("canvas");	
	ctx = document.getElementById("canvas").getContext("2d");			 // Update Global from classLibrary
}


//---------------------------------------------------------------------------------------
//   Section of functions containing dependencies between HTML/CSS and JS library 
//   stand alone functions
//---------------------------------------------------------------------------------------
function runUserExperiment(){
	
	// Get hold of the values from the user interface
	maxThrows = Number(document.getElementById("nmbThrows").value);
	maxSides = Number(document.getElementById("nmbSides").value);
	
	if (maxThrows >= 5 && maxSides >= 3 ){
		// Run the experiment and the present the results in HTML
		runExperiment();
			//printExperimentSimple();
			//printExperimentTable();
		presentExperiment();
			//printExecutionTime();
	}
	else alert("Feil inndata. Minimum 5 kast og 3 sider. Prøv igjen!");
}

function presentExperiment(){
	document.getElementById("resultatOverskrift").innerHTML = "Resultat fra de " + maxThrows +" terningkastene" ;
	printExperimentByAnyTable();
	drawExperimentAsBars();
}

function printExperimentSimple(){ // Simle printout using line breaks <br>
	var tittel,utskrift,percentage;
	document.getElementById("tabellOverskrift").innerHTML = "Resultat fra de " + maxThrows +" terningkastene" ;
	
	utskrift = " ";
	for (var k=0; k<=(maxSides-1); k++){
		percentage = 100.*summedResults[k]/maxThrows; 
		utskrift = utskrift + "Terningøye " + (k+1) +": " + percentage.toFixed(1) +"<br>";
	}
	document.getElementById("tabellUtskrift").innerHTML = utskrift;
	
}
function printExperimentTable(){ // Printout of the results in a table format
	var tittel,utskrift,numbSide,percentage;
	document.getElementById("tabellOverskrift").innerHTML = "Resultat fra de " + maxThrows +" terningkastene" ;
	
	// First create the table with header fields
	utskrift = "<table><thead><tr><th>Øye</th><th>  Antall  </th><th>  Prosent  </th></tr></thead>";
	utskrift = utskrift + "<tbody>";
	
	// Next fill in the body of the table row by row (one row for each iteration of the loop)
	for (var k=0; k<=(maxSides-1); k++){
		numbSide= summedResults[k];				// Number of results for the given side
		percentage = 100.* numbSide/maxThrows;  // Percentage calculated
		utskrift = utskrift + 	"<tr>" 	+"<td>" +(k+1)		+"</td>"
										+"<td>"	+numbSide 	+"</td>"
										+"<td>"	+percentage.toFixed(2) +"</td>"
								"</tr>";
	}
	utskrift = utskrift + "</tbody> </table>";			// Here we close the body and the table table
	document.getElementById("tabellUtskrift").innerHTML = utskrift; // And now the table is presentet in HTML
	
}
function printExperimentByAnyTable(){
	var tableHead = ["Øye","Antall","Prosent%"];
	var tableData = [];
	var percentage;
	
	var k=0;
	for (var i=1; i <=  maxSides; i++){
		tableData[k]   = i;
		tableData[k+1] = summedResults[i-1]; 	// Number of results landed on side i 
		percentage = 100. * summedResults[i-1]/maxThrows; // Percentage calculated
		tableData[k+2] = String(percentage.toFixed(3));   // Convert to string and 3 decimals
		k = k+3;
	}
	printAnyTable ("tabellUtskrift",tableHead,tableData);
	
}
function drawExperimentAsBars(){
	var xStolpe = [],yStolpe = [], numData,cvx,cvy,barWidth,yScale;
	var minValue,maxValue;
	
	maxPercentage = -9999.0 ;
	for (var i=1; i <=  maxSides; i++){
		xStolpe[i-1]   = i;
		yStolpe[i-1] = summedResults[i-1]; 	// Number of results landed on side i 
	}
	minValue = Math.min.apply(null,yStolpe); // Minimum value in array Ystolpe
	maxValue = Math.max.apply(null,yStolpe); // Maximum value in array yStolpe
	cvx = 20;
	cvy = canvas.width - 20;
	barWidth = (canvas.width - 2*20)/(2*maxSides -1); 
	yScale = (canvas.height-100)/maxValue; // Biggest bar to use height minus 100 pixels
	tegnFyltFirkant(0,0,1000,1000,"Moccasin");
	tegnStolperVertikalt("Antall per terningøye",xStolpe,yStolpe,maxSides,cvx,cvy,barWidth,yScale);

}

function printAnyTable(tableId,tableHead,tableData){ 
/*------------------------------------------------------------------- 
   Write to HTML table data from JS arrays
   
Arguments:
	tableId  	-  id of table as defined in HTML (string)
	tableHead	-  content of header row in table (array)
	tableData   -  content data to fill into table(array - one dimension)

Global variables used:
	none
	
Return:
	none
-------------------------------------------------------------------*/

	// First write the table with header fields
	utskrift = "<table><thead><tr>";
	for (var i = 0; i < tableHead.length; i++){
		utskrift = utskrift + "<th>"+tableHead[i] + "</th>";
	}
	utskrift = utskrift + "</tr></thead>";
	
	// Next fill in the content of the table row by row (one row for each iteration of the loop)
   var j = 0;
	while (j < tableData.length) { 
		utskrift = utskrift + 	"<tr>"
		for ( var k = 0; k <  tableHead.length; k++){
			utskrift = utskrift +"<td>" +tableData[j] +"</td>";
			j = j+ 1;
		}
		utskrift = utskrift + "</tr>";
	}
	utskrift = utskrift + "</table>";			// Here we close the body and the table table
	document.getElementById(tableId).innerHTML = utskrift; // And now the table is presented in HTML
	 
}


function printExecutionTime(){
	
	document.getElementById("tidsUtskrift").innerHTML = "Simuleringens tidsforbruk (msek): " +timeToExecute;

}
//---------------------------------------------------------------------------------------
//   Section of functions with no dependencies to HTML/CSS
//---------------------------------------------------------------------------------------
function oneThrow(){ // Function to make one throw of the manysided (maxSides) cube
	var result;
	result = maxSides* Math.random() + 1 ; // This will be a real number in range [1,maxSides>
	result = Math.floor(result);	// This will be a number in range [1,maxSides]
	return result;
	
}

function runExperiment(){ // Function that runs the complete experiment. Results stored in global array.
	var resultSingleThrow;
	var time1,time2,timeDiff;
	for (var j=0;j<=(maxSides-1);j++) summedResults[j]= 0; // Start with 0 in each array position
	
	time1 = new Date();
	for (var i=1; i<=maxThrows; i++){
		resultSingleThrow = oneThrow(); // Result from one throw
		summedResults[resultSingleThrow-1] = summedResults[resultSingleThrow-1] + 1; // Store in global array
	}
	time2 = new Date();
	timeDiff = time2.getTime()-time1.getTime();
	timeToExecute = timeDiff;			// Store the execution time (millisecons) in order to present in HTML
	console.log("Elapsed time (milli seconds)", timeDiff);
}

