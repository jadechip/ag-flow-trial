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
	console.log('this is the current lineage -> \n', lineage);
	console.log('this is the current tally ->', tally);	
}

function insertGeneration(scope) {
	if(scope.generation == 'male') {
		scope.lineage.push({ancestor: 'male', offspring: ['male', 'female']});
		scope.tally++;
	} else {
		scope.lineage.push({ancestor: 'female', offspring: ['female', 'male']});
		scope.tally++;
	}
	return scope.lineage;
}


function generateFamilyTree(generations) {

	this.generation = 'male';
	this.tally = 0;
	this.generationTally = null;
	this.lineage = [];

	if(generations == 1) {
		return this.generation;
	}

	////////////////////////

	var offspring = [];

	insertGeneration(this);
	currentLineage(lineage, tally); 
	// at this point, we actually have 2 generations, the ancestor and the offspring
	offspring = lineage[lineage.length - 1]['offspring'];

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

	generationTally = 2;

	// tally is now 3, called for the ancestor and each offspring

	////////////////////////

	while(generations > generationTally) {

		var sliceAmount = ((tally - 1) * -1);

		offspring = [];

		targetGenerations = lineage.slice(sliceAmount);
		console.log('-------->', targetGenerations);
		console.log('-------->');
		for(var i = 0; i < targetGenerations.length; i++){
			for(var j = 0; j < targetGenerations[i]['offspring'].length; j++){
				offspring.push(targetGenerations[i]['offspring'][j]);
			}
		}


		// take the last 2 elements
		for(var child in offspring) {
		  if(offspring.hasOwnProperty(child)) {
		  	this.generation = offspring[child];
		    insertGeneration(this);
			currentLineage(lineage, tally);
		  } else {
		  	console.log('child not in array');
		  	return;
		  }
		}

		generationTally++;

	}

	// tally should now be 7

	console.log('generation tally', generationTally);
	console.log('total tally', tally);
	return lineage;

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