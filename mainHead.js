document.getElementsByTagName( "html" )[0].className = "loading" ;

head.load(
	"js/" + location.pathname.substring(location.pathname.lastIndexOf("/") + 1).replace(".html",".js"),
	"css/bootstrap.min.css",
	"css/style.css",
	"comun/comun.css",
	"comun/jquery.js",
	"js/codigo.js",
	"js/bootstrap.min.js",
	"comun/comun.js",
	"js/jquery-ui.min.js",
	"js/jquery.ui.touch-punch.min.js",
	"js/howler.min.js",
	"js/animate.min.css"
	);

/*head.ready(function () {
	waitInterval(200).then(function() {
		$( "html" ).removeClass( "loading" );	
		playTutorial(actNum);
	});

});*/

