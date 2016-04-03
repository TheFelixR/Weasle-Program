// takes a string and "evolves" it one generation
function generation(input_text, characters, target_text, mutation_rate, amount_offspring) 
{
	// array to store all this generations offspring
	var generationObject = [];
	var evolved_string = "";
	var best_offspring = {string:"", score: 0};

	// "load" the offspring into an array, check each offspring if it mutates and then score it.
	for(var i = 0; i < amount_offspring; i++) {
		evolved_string = evolve(input_text, characters, mutation_rate)
		generationObject.push({
   			string: evolved_string,
   			score: score(target_text, evolved_string)
    	});

		// if there are more then 2 elements in the object array. Check if the current offspring has a higher score then the previous one.
		if (generationObject.length > 1) {
			// if it does. Its the best offspring
	    	if (generationObject[i].score > best_offspring.score) {
	    		best_offspring.string = generationObject[i].string;
	    		best_offspring.score = generationObject[i].score;
	    	}
    	}
    	// if there only is one offspring. Its the best, by defult.
    	else {
    		best_offspring.string = generationObject[i].string;
    		best_offspring.score = generationObject[i].score;
		}
	}

	// increment generations
	generations++;	
	return best_offspring.string;
}

// gets a string and modifys a random character in it, to another random character.
function evolve(offspring, characters, mutation_rate)
{
	// get random number for the position of character to be mutated
	var randomNumber = Math.floor((Math.random() * offspring.length));

		// checks if a mutation happens. If so, mutate the string.
		if (Math.floor((Math.random() * 100) +1) <= mutation_rate)
		{
			// gets random character from the character array that the user inputed
			var randomCharacter = characters[ Math.floor((Math.random() * characters.length)) ]

			// changes a random character in the offspring to the random character that was generated
			offspring = setCharAt(offspring, randomNumber, randomCharacter);
		}
	return offspring;
}

// calculate score on how far away the start text is the target text
function score(target_text, offspring)
{
	var score = 0;
	for (var i = 0; i < target_text.length; i++) 
	{
    	if (target_text[i] == offspring[i])
        	score++;
	}

	if(score == target_text.length)
		score_met = true;

	return score;
}

// set the random generated char at the random generated place in the passed string
function setCharAt(str,index,chr) 
{
    if(index > str.length-1) 
    	return str;
    else
    	return str.substr(0,index) + chr + str.substr(index+1);
}

// returns a set of random characters to use in start text
function randomStart_text(string, char)
{
	var randomString = "";
	if (string.length >= 1)
	{
		for( var i = 0; i<string.length;i++)
		{	
			randomString += char.charAt(Math.floor(Math.random() * char.length));
		}
		return randomString;
	}
	else
	{
		return;
	}
}
