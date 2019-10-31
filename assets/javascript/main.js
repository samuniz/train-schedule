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
var firstTrain; ""

//   Initial variables
$("Button").on("click", function (event) {
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    console.log(trainName);
    destination = $("#destination").val().trim();
    console.log(destination);
    firstTrain = $("#firstTrain").val().trim();
    console.log(firstTrain);
    
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,

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
    var firstTrainTD = $("<td>");
    firstTrainTD.text(sv.firstTrain);
    newRow.append(firstTrainTD);
    var militaryFormat = "HH:mm";
    var convertedTime = moment(sv.startTime, militaryFormat);
    console.log(convertedTime.format("HH:mm"));
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
    // $("tbody").append(newRow);
});