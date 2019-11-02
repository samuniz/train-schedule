// @ts-nocheck
var firebaseConfig = {
    apiKey: "AIzaSyC0ocUU8o6DEUAKqbJET6crox99auc5w6s",
    authDomain: "my-app-354e7.firebaseapp.com",
    databaseURL: "https://my-app-354e7.firebaseio.com",
    projectId: "my-app-354e7",
    storageBucket: "my-app-354e7.appspot.com",
    messagingSenderId: "546864103691",
    appId: "1:546864103691:web:115e410764ca11c711a20e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Create a variable to reference the database.
var database = firebase.database();
var trainName; ""
var destination; ""
var frequency; 
var firstTrain; ""

//   Initial variables
$("button").on("click", function (event) {
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    console.log(trainName);
    destination = $("#destination").val().trim();
    console.log(destination);
    frequency = $("#frequency").val();
    console.log("This the frequency", frequency);
    firstTrain = $("#firstTrain").val();
    console.log("This the time", firstTrain);
    
    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain


    });
});
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrain);
   
    var newRow = $("<tr>");
    var trainTD = $("<td>");
    trainTD.text(sv.trainName);
    newRow.append(trainTD);
    var destinationTD = $("<td>");
    destinationTD.text(sv.destination);
    newRow.append(destinationTD);
    var frequencyTD = $("<td>");
    frequencyTD.text(sv.frequency);
    newRow.append(frequencyTD);
    var arrivalTD = $("<td>");
    arrivalTD.text(moment(nextTrain).format("hh:mm"));
    newRow.append(arrivalTD);
    
    var militaryFormat = "HH:mm";
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeSV = moment(sv.firstTrain, "HH:mm").subtract(1, "years");
    console.log("This is first time ", firstTimeSV);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeSV), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

     // Time apart (remainder)
     var tRemainder = diffTime % parseInt(sv.frequency);
     console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = parseInt(sv.frequency) - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
   
    console.log("ABOUT to set text minutes", tMinutesTillTrain)
    var minutesAwayTD = $("<td>");
    minutesAwayTD.text(tMinutesTillTrain);
    newRow.append(minutesAwayTD);
    // console.log(convertedDate.diff(moment(), "months"));
    // var monthsWorkedTD = $("<td>");
    // monthsWorkedTD.text(moment().diff(convertedDate, "months"));
    // newRow.append(monthsWorkedTD);
    // var monthlyRateTD = $("<td>");
    // monthlyRateTD.text(sv.monthlyRate);
    // newRow.append(monthlyRateTD);
    // var mW = (moment().diff(convertedDate, "months"))
    // var empBilled = (mW * monthlyRate);
    // var empBilledTD = $("<td>");
    // empBilledTD.text(empBilled);
    // newRow.append(empBilledTD);
    $("tbody").append(newRow);
});