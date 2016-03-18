// initalize a boolean value to see if the perfect score is met
var score_met = false;
// initilize a global  variable so we can keep track of how many generations have passed
var generations = 0;

//checks if the program has ben run
var start = false;

// stores the inputed value in the correct variables
function main()
{
	//get the start text
	var start_text = document.getElementById("start_text").value;
	//get target text
	var target_text = document.getElementById("target_text").value;
	// get characters to use for modifying string
	var characters = document.getElementById("characters").value;
	// get the mutation rate
	var mutation_rate = document.getElementById("mutation_rate").value;
	// get the amount of offspring for each generation
	var amount_offspring = document.getElementById("amount_offspring").value;
	// get the delay between each generation call
	var delay = document.getElementById("delay").value;
    
    // reset if program is run again
    if (start == true)
    {
    	score_met = false;
    	generations = 0;
    }
	// send all the input into generation, to generate a generation of offspring.
	// this function will return the highest scoring offspring of each generation
	var best_offspring = generation(start_text, characters, amount_offspring, mutation_rate, target_text, generations);

	var interval = setInterval(function () 
	{
		// call generation again for each generation, passing in the previous generations best offspring
	    best_offspring = generation(best_offspring, characters, amount_offspring, mutation_rate, target_text);
	    document.getElementById("output_text").value = best_offspring;
	    document.getElementById("generations").value = generations;
	    if (score_met) 
	    {
	        clearInterval(interval);
	    }
	}, delay);

	start = true;
}
	
// takes a string and "evolves" it one generation
function generation(input_text, characters, amount_offspring, mutation_rate, target_text) 
{
	// array to store all this generations offspring
	var generationObject = [{string:"", score: 0}];
	var evolved_string = "";
	var best_offspring = {string:"", score: 0};

	// "load" the offspring into an array, check each offspring if it mutates and then score it.
	for(var i = 0; i < amount_offspring; i++)
	{
		evolved_string = evolve(input_text, characters, mutation_rate)
		generationObject.push({
   			string: evolved_string,
   			score: score(target_text, evolved_string)
    	});

		// if there are more then 2 elements in the object array. Check if the current offspring has a higher score then the previous one.
		if (generationObject.length > 1)
		{
			// if it does. Its the best offspring
	    	if (generationObject[i].score > best_offspring.score)
	    	{
	    		best_offspring.string = generationObject[i].string;
	    		best_offspring.score = generationObject[i].score;
	    	}
    	}
    	// if there only is one offspring. Its the best, by defult.
    	else
    	{
    		best_offspring.string = generationObject[i].string;
    		best_offspring.score = generationObject[i].score;
		}
	}

	// increment generations
	generations++;

	// return the highest scoring offspring of this generation
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

// some error checking for mutation rate 
// NOT DONE
function error_check(mutaion_rate)
{
	// if mutation rate is higher then 100(%) set it to 100
	if (mutation_rate > 100)
		mutation_rate = 100;
	// if mustation rate is lower then 0(%) set it to 0
	else if (mutation_rate < 0)
		mutation_rate = 0;
	// if nothing no mutation rate is chosen set it to defult value (5%)
	else if (mutation_rate === "")
		mutation_rate = 5;

	return mutation_rate

}
