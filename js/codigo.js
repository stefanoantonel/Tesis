var counter;

function dragAndDrop(idImg,idBoxes,functions) {
	$(idImg).each(function(ind,part){
		$(this).draggable({
			revert:true,
		});
	});

    $(idBoxes).each(function(ind,box){
    	$( this ).droppable({
        	drop: function( event, ui ) {
        		$(ui.draggable).css({top:0,left:0});
        		$( this )
        			.addClass( "ui-state-highlight" )
        			.append(ui.draggable);  
        		functions(this,ui.draggable); 		
        	}
        });
    });
}

function getConfig(numAct,callBack){
	$.getJSON("js/configGroups.json",function(result,callBack){
	    	c=result["act"+numAct];
	    }).done(function (){
	    	callBack(c.act);
	    	loadDescription(c.description);
	    	loadSounds(c.sounds);
	    	getStyle();
	    	loadCounter(c.repeat);
	    });
}

function getConfig(numAct){
	saveArticle();
	$.getJSON("js/configGroups.json",function(result){
	    	 c=result["act"+numAct];
	    }).done(function (){
	    	loadDescription(c.description);
	    	loadSounds(c.sounds);
	    	getStyle();
	    	loadCounter(c.repeat);
	    });
}

function getConfigByElement(element,level,quantity,callBack){
	$.getJSON("js/configGroups.json",function(config,callBack){
	    	var element_config = config[element][level];
	    	var result_disorder = disorder(element_config);
	    	result = result_disorder.slice(0,quantity);
	    }).done(function(){
	    	console.log("result:",result);
	    	callBack(result);
	    	//getStyle();
	    });
}

function getConfigByElementWithOne(type, level, quantity, callBack, elementExcept){
	$.getJSON("js/configGroups.json",function(config,callBack){
	    	element_config = config[type][level];
	    	element_config = removeOneElement(element_config,elementExcept);
	    	element_config = disorder(element_config);
	    	result_disorder = element_config.slice(0,quantity);
	    	result_disorder.push(elementExcept);
			result = disorder(result_disorder);
	    	// result = result_disorder.slice(0,quantity);
	    	
	    }).done(function(){
	    	//console.log("result:",result);
	    	callBack(result);
	    });
}

function saveArticle() {
	originTemplateHTML = $("article").clone();
}

function getStyle(){
	$.getJSON("js/configGroups.json",function(result){
	    	c=result["skin"];
	    }).done(function (){
	    	skin=disorder(c);
	    	console.log("skinks",skin);
	    	$('head').append('<link rel="stylesheet" href="css/skin/'+skin[0]+'.css" type="text/css" />');
	    });
}

function loadCounter(count){
	if(counter == null) {
		counter = parseInt(count);
	}
}

function disorder(o){ 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function congratulations(){
	// $("article").delay( 200 ).hide();
	
	$("body").append('<div id="alertOk" class="alert-box success hidden="true">'
			+'<span>Felicitaciones </span>'
			+'</br><img class="imagenSucced" src="images/caraContenta.jpg">'
			+'</br>Has completado muy bien tu ejercicio'
		+'</div>');
	
	$("#alertOk").delay(100).fadeIn(200);
}

function passActivity(){
	$("article").delay( 400 ).hide();
	
	$("body").append('<div id="alertOk" class="alert-box success">'
			+'<span>Pasaste el nivel!</span>'
			+'<div><a id="next">Siguiente</a></div>'
		+'</div>');
	
	$("#next").click(function(){
		var base_url=document.URL.slice(0, document.URL.lastIndexOf("/"));
		//actividad.end("incomplete");
		window.parent.document.getElementById("nav_next-button").click();
	});
	
}


function setNextAction(){
	$("#next-activity").click(function(){
		var base_url=document.URL.slice(0, document.URL.lastIndexOf("/"));
		window.parent.document.getElementById("nav_next-button").click();
	});
}

function setPrevAction(){
	$("#prev-activity").click(function(){
		var base_url=document.URL.slice(0, document.URL.lastIndexOf("/"));
		window.parent.document.getElementById("nav_prev-button").click();
	});
}

function passed(){
	actividad.end("passed");
}

function loadDescription(descrip){	
	title=$("title").text();
	//debugger;
	$.get("popUp.html",function(result){
		modal=result;
    }).done(function(){
    	$("article").append(modal);
		$(".modal-body").html(descrip);
        $(".modal-title").html(title);
    });
}

function loadSounds(sounds){
	$(sounds).each(function(index,value){
		
		var aud=document.createElement('audio');
		$(aud).attr('id','sound'+value);
		$(aud).attr('src','audio/'+value+'.wav');
		$(aud).attr('type','audio/wav');
		$(aud).appendTo('body');
		//<audio id="p" src="audio/p2.mp3" type="audio/mp3"></audio>
		
	});
	//$('#soundcasa')[0].play();	
	//console.log()$('#soundcasa')[0].play();	
}

function loadTutorialVoice() {
	var aud=document.createElement('audio');
	$(aud).attr('id','tutorial'+value);
	$(aud).attr('src','audio/tutorial/'+value+'.wav');
	$(aud).attr('type','audio/wav');
	$(aud).appendTo('body');
}

function playSound(soundName){
	try{ $('#sound'+soundName)[0].play(); }
	catch(e){ console.error('Sonido no encontrado') }
	
}

function moveOrigin(target,origin){
	$(target).removeClass('wrong');
	$(target).addClass('normal');
	$(target).appendTo(origin);
}

function sessionCounter() {
	counter = counter - 1;
		if(counter == 0){
			passed();
			window.setTimeout(function(){$(".deleted").remove();},1000);
			window.setTimeout(passActivity, 1000);

		}

		else {
			window.setTimeout(function() {
				$(".deleted").remove();
				$("article").remove();
				
			}, 1000);
			window.setTimeout(function() {
				congratulations();
			}, 1000);
			window.setTimeout(function(){
				$("body").append(originTemplateHTML);
				$('#alertOk').hide();
				$('#alertOk').remove();
				
				//$("article").show();
				functionInit();
				}, 2000);	

		}

}

function translate(target){
	$(target).addClass("animateUpperCorner");
}


function removeOneElement(array,element){
	var index = array.indexOf(element.toString());
	if(index != -1) {
		array.splice(index, 1);	
	}
	return array;
}

