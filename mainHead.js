document.getElementsByTagName( "html" )[0].className = "loading" ;

head.load(
	"css/bootstrap.min.css",
	"css/style.css",
	"comun/comun.css",
	"comun/jquery.js",
	"js/codigo.js",
	"js/adivinaPalabra.js",
	"js/bootstrap.min.js",
	"comun/comun.js",
	"js/jquery-ui.min.js",
	"js/jquery.ui.touch-punch.min.js",
	"js/howler.min.js"
	);

head.ready(function () {
	waitInterval(200).then(function() {
		$( "html" ).removeClass( "loading" );	
	})
	
	//document.getElementsByTagName( "html" )[0].className.replace( /loading/, "" );
});

