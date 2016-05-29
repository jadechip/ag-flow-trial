var stdin = process.stdin, stdout = process.stdout;

function ask(question, format, callback) {
  
 stdin.resume();
 process.stdin.setEncoding('utf8');
 stdout.write(question + ": ");
 
 stdin.once('data', function(data) {

 	 if(format == 'number') {
 	 	data = Number(data);
 	 } else {
 	 	data.toString();
 	 }

 	 console.log('->', typeof data);
 	
   if ((typeof data) == format) {
     callback(data);     
   } else {
     stdout.write("The input must be a " + format + '\n');
     ask(question, format, callback);     
   }
 });
}

function currentLineage(lineage, tally) {
	console.log('this is the current lineage ->', lineage);
	console.log('this is the current tally ->', tally);	
}

function insertGeneration(scope) {
	if(scope.generation == 'male') {
		scope.lineage.push({ancestor: 'male', offspring: {first: 'male', second: 'female'}});
		scope.tally++;
	} else {
		scope.lineage.push({ancestor: 'female', offspring: {first: 'female', second: 'male'}});
		scope.tally++;
	}
	return scope.lineage;
}


function generateFamilyTree(generations) {

	this.generation = 'male';
	this.tally = 0;
	this.lineage = [];

	insertGeneration(this);
	currentLineage(lineage, tally);

	if(generations > tally) { 

		// for the amount of the tally, let's say it's 1, take the last element of the lineage array...
		// which results in 3 generations, so the tally is now 3, take the last 2, is now 5

		var offspring = lineage[lineage.length - 1]['offspring'];

		// offspring: { first: 'male', second: 'female' }

		for(var child in offspring) {

		  if(offspring.hasOwnProperty(child)) {
		  	this.generation = offspring[child];
		  	console.log(offspring[child]);
		    insertGeneration(this);
			currentLineage(lineage, tally);
		  } else {
		  	return lineage;
		  }
		}
	} else {
		return lineage;
	}

}

function computeFamilyTree(numberOfChild, numberOfGenerations) {
	var results = undefined;
	results = generateFamilyTree(numberOfGenerations);
	// return results;
}

ask("Please specify the number of test cases", "number", function(times) {
	var numberOfCases = times;
  ask("Please specify N and K", "string", function(units) {
  	var stringArray = units.split(" ");
  	var N = Number(stringArray[0]);
  	var K = Number(stringArray[1]);  	
		for(var i = 0; i < numberOfCases; i++){
			computeFamilyTree(N, K)
			// stdout.write(computeFamilyTree(N, K));
			process.exit();
		}  	
  })
});