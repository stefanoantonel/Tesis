//This function is used the first time the document is loading.
function loadProgressBar () {
	window.addEventListener('DOMContentLoaded', function() {
	    new QueryLoader2(document.querySelector("body"), {
	        barColor: "#efefef",
	        backgroundColor: "#111",
	        percentage: true,
	        barHeight: 20,
	        minimumTime: 50,
	        fadeOutTime: 200,
	        onComplete : function() {
	        	$("article").fadeIn(200).show();
	        	playTutorial(actNum);	
	        },
	        onProgress : function () {
	        	$("article").hide();
	        }
	    });
	});	
}
loadProgressBar();

//This function is used to call it when you pass the level from any activity state.
function excecuteProgressBar() {
	new QueryLoader2(document.querySelector("body"), {
        barColor: "#efefef",
        backgroundColor: "#111",
        percentage: true,
        barHeight: 20,
        minimumTime: 50,
        fadeOutTime: 500,
        onComplete : function() {
        	$("article").fadeIn(400).show();
        },
        onProgress : function () {
        	$("article").hide();
        }
    });
}