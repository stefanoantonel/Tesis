window.addEventListener('DOMContentLoaded', function() {
    new QueryLoader2(document.querySelector("body"), {
        barColor: "#efefef",
        backgroundColor: "#111",
        percentage: true,
        barHeight: 20,
        minimumTime: 100,
        fadeOutTime: 500,
        onComplete : function() {
        	$("article").fadeIn(400).show();
        	playTutorial(actNum);
        },
        onProgress : function () {
        	$("article").hide();
        }
    });
});