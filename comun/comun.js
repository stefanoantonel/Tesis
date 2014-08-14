/**
 * @author MarkU
 */

/*!
 * Actividad
 * Clase común a todas las actividades
 * @Class Actividad
 */
var actividad = {};
actividad.sco = {};
/**
 * Agrega un archivo CSS que sea necesario por el ejercicio particular
 * @param {Object} archivo ruta del archivo CSS que se desea agregar
 */
actividad.addCSS = function(archivo) {
	var h = document.getElementsByTagName('head')[0];
	var c = document.createElement('link');
	c.rel = "stylesheet";
	c.type = "text/css";
	c.href = archivo;
	h.appendChild(c);
};

/**
 *  Inicializa las partes comunes del template, la conexión
 * con Moodle, etc.
 */
actividad.init = function() {
	//Inicializo SCORM
	$.getScript('comun/SCORM_API_wrapper.js', function() {

		actividad.sco = pipwerks.SCORM;
		actividad.sco.version = "1.2";
		actividad.callSucceeded = actividad.sco.init();

		// Tomo el nombre del alumno y lo pongo en el tag designado
		var txt = actividad.sco.get('cmi.core.student_name');
		$("#alumno").html("<b>Alumno:</b> " + txt);
		actividad.sco.set("cmi.core.lesson_status","incomplete");
		console.log("Activity status: "+actividad.sco.get("cmi.core.lesson_status"));
	});

	//Comienzo la secuencia animación de inicio
	/*
	this.huellas_aparece();
	this.huellasAnimacion = setInterval(function() {
		actividad.huellas_desaparece();
		setTimeout(actividad.huellas_aparece, 1000);
	}, 10000);
	*/

	$('#titulo').text($('title').text());

	$("#titulo").fadeIn(1500).animate({
		top : "10px"
	}, {
		duration : 1500,
		queue : false
	});

	actividad.ej = new ejercicio();
};

/**
 *   Para terminar la sección SCORM
 */
actividad.end = function() {
	var callSucceeded = this.sco.quit();
};

/*
actividad.huellas_aparece = function() {
	$("#huella4").fadeIn("slow", function() {
		$("#huella3").fadeIn("slow", function() {
			$("#huella2").fadeIn("slow", function() {
				$("#huella1").fadeIn("slow");
			});
		});
	});
};

actividad.huellas_desaparece = function() {
	$("#huella4").fadeOut("slow", function() {
		$("#huella3").fadeOut("slow", function() {
			$("#huella2").fadeOut("slow", function() {
				$("#huella1").fadeOut("slow");
			});
		});
	});
};
*/
/**
 * Función ejecutada en cada inicio con que
 */
$(document).ready(function() {
	// lleno las cabeceras
	$("header").load("comun/header.html", function() {
		// lleno el pie
		$("footer").load("comun/footer.html", function() {
			// Una vez que termino todo, inicio la actividad
			actividad.init();
		});
	});
});

