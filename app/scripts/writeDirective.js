/* global app */
/* global console */

app.directive('writeInput', [function () {
	"use strict";

	var checkOptions = {
		adverbs: {name: 'adverb', replace: /\b\w*ly\b(?!<)/gi, title: 'This adverb could be omitted or replaced with a stronger verb.'},
		fillerWords: {name: 'filler-words', replace: /\b(very|several|some|many|most|few|vast|just|quite|often|various|a number of|really|so|that|and then|but)\b(?!<)/gi, title: 'This word may be unnecessary and not add anything of value.'},
		passiveVoice: {name: 'passive-voice', replace: /\b(is|isn't|are|aren't|am|am not|was|wasn't|were|weren't|had|hadn't|has been|have been|had been|will be|being)\b\s+\b(\w*ed|arisen|babysat|been|beaten|become|bent|begun|bet|bound|bitten|bled|blown|broken|bred|brought|broadcast|built|bought|caught|chosen|come|cost|cut|dealt|dug|done|drawn|drunk|driven|eaten|fallen|fed|felt|fought|found|flown|forbidden|forgotten|forgiven|frozen|gotten|given|gone|grown|hung|had|heard|hidden|hit|held|hurt|kept|known|laid|led|left|lent|let|lain|lit|lost|made|meant|met|paid|put|quit|read|ridden|rung|risen|run|said|seen|sold|sent|set|shaken|shone|shot|shown|shut|sung|sunk|sat|slept|slid|spoken|spent|spun|spread|stood|stolen|stuck|stung|struck|sworn|swept|swum|swung|taken|taught|torn|told|thought|thrown|understood|woken|worn|won|withdrawn|written|burnt|dreamt|learnt|smelt)\b(?!<)/gi, title: 'This may be an instance of passive voice. Consider an active sentence structure.'},
		lexicalIllusions: {name: 'lexical-illusions', replace: /\b(\w+)\b\s+\1\b(?!<)/gi, title: 'This may be a lexical illusion. Double check that the repeated word was intentional.'},
		misusedWords: {name: 'misused-words', replace: /\b(their|they're|there|your|you're|its|it's|whose|who's|accept|except|affect|effect|allusion|illusion|capital|capitol|climactic|climatic|elicit|illicit|emigrate|immigrate|principle|principal|than|then|to|too|two|lie|lay|set|sit|suppose to|use to|towards|anyways|could care less|intensive purposes)\b(?!<)/gi, title: 'This word is commonly mistaken for another. Double check that the correct word is used.'},
		pronouns: {name: 'pronoun', replace: /\b(he|she|it|they|we|you|I|that|this)\b(?!<)/gi, title: 'Double check that it is clear what this pronoun refers to and that you don\'t have too many close together.'}
	};

	return {
		restrict: 'A',
		scope: {options: '@'},
		link: function(scope, element, attrs) {

			var checkText =  function () {
				var options = scope.$eval(attrs.options),
						length = options.length,
						i;

				for (i = 0; i < length; i++) {
					var check = checkOptions[options[i]];
					if (element.html().match(check.replace)) {
						var text = element.html().replace(check.replace, '<span class="' + check.name + '" title="' + check.title + '">$&</span>');
						element.html(text);
					}
				}
			};

			element.bind("blur keyup change", function() {
				scope.$apply(checkText);
			});
		}
	};

}]);