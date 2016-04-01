$(document).ready(function() {
	
	var start = false;
	var score_met = false;
	var generations = 0;

	var start_text, characters, target_text, mutation_rate, amount_offspring, delay;

		//start
		$( "#start" ).click(function() {	
			start = true;

			// get the input
			start_text = document.getElementById("start_text").value;
			characters = document.getElementById("characters").value;
			target_text = document.getElementById("target_text").value;
			mutation_rate = document.getElementById("mutation_rate").value;
			amount_offspring = document.getElementById("amount_offspring").value;
			delay = document.getElementById("delay").value;


			// íf start text is left empty, generate a random start text
			if(!start_text) {
				start_text = randomStart_text(target_text, characters);
				document.getElementById("start_text").value = start_text;
			}

			// checks so start text and target text is of equal length
			if(start_text.length !== target_text.length) {
				alert("The start text and target must be of equal length!");
				return;
			}

			// checks so that the mutation rate is correct
			if(mutation_rate < 0 || mutation_rate > 100) {
				alert("Mutation rate must be between 0-100");
				return;
			}

			// send the input to controller
			var best_offspring = generation(start_text, characters, target_text, mutation_rate, amount_offspring, delay);
			console.log(generation(start_text, characters, target_text, mutation_rate, amount_offspring, delay));
			
			var interval = setInterval(function () {
		        if (start == false || score_met == true) {
		    		clearInterval(interval);
		   		}

				// call generation again for each generation, passing in the previous generations best offspring
			    best_offspring = generation(best_offspring, characters, target_text, mutation_rate, amount_offspring);
			    document.getElementById("output_text").value = best_offspring;
			    document.getElementById("generations").value = generations;
				}, delay);
		});

		//stop
		$( "#stop" ).click(function() {
			start = false;
		});

		//resets
		$( "#reset" ).click(function() {
			start = false;
	    	score_met = false;
	    	generations = 0;
   			best_offspring = "";

			document.getElementById("start_text").value = "";
			document.getElementById("characters").value = " abcdefghijklmnopqrstuvwxyz";
			document.getElementById("target_text").value = "methinks it is like a weasel";
			document.getElementById("output_text").value = "";
			document.getElementById("mutation_rate").value = 5;
			document.getElementById("amount_offspring").value = 100;
			document.getElementById("delay").value = 50;
		});
});
