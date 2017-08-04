var database = firebase.database()

$("#submit").on("click",function(){
	var trainName = $("#trainName").val();
	var destination = $("#destination").val();
	var firstTrain = $("#firstTrain").val();
	var frequency = $("#frequency").val();
	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	})
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#frequency").val("");
	
})

database.ref().on("child_added",function(childAdded){
	var trainName = childAdded.val().trainName
	var destination = childAdded.val().destination
	var firstTrain = childAdded.val().firstTrain
	var frequency = childAdded.val().frequency
	var nextArrival = moment(firstTrain,"H:mm").format('h:mm a');
	var arb = moment().diff(moment(firstTrain,"H:mm"), "minutes")
	if (arb<0) {
		minAway = Math.abs(arb)
	}
	else {
	arb = Math.abs(arb)
	arb = arb%frequency
	arb = frequency-arb
	minAway = arb
	}
	nextArrival = moment().add(minAway, 'minutes').format('h:mm a');
	$("#table1").append("<tr><td>"+trainName+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+nextArrival+"</td><td>"+minAway+"</td></tr>")
})

	