# weasleprogram
A very simple genetic algorithm. Takes a string and mutates it every generation untill it has evolved to another string.

Copy and pasted this from a question I answerd.

"So how this programs goes about to evolve a string to another is the following: Say that your starting string is abcde and you want to evolve this into hello. So in this case you can consider abcde as a parent to the first generation off offspring. So (per the defult settings) it will copy abcde 100 times, which you can think off as 100 offsprings. Each character of each offspring has a 5% chance to mutate, into a random character chosen from the characters that you inputed. Then each offspring will be checked against the scoring algorithm to see how much it resembles the desired end string. So lets say that one offspring has muted and now looks like this hbcde it will be given a score of 1 since h in this string is the correct character in the correct place. So the highest scoring offspring of each generation will be chosen as the parent string for the next generation. And it will keep doing this until your desired string is met. Sorry for the long text, but hopefully this made this a little clearer :)!"


#http://thefelixr.github.io/weasleprogram/
