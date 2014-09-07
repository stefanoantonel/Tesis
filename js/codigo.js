function dragAndDrop(idImg,idBoxes,functions) {
	$(idImg).each(function(ind,part){
		$(this).draggable({
			revert:true,
		});
	});
	// var draggable = document.getElementById('0');
	// 	draggable.addEventListener('touchmove', function(event) {
	// 	    var touch = event.targetTouches[0];
		 
	// 	    // Place element where the finger is
	// 	    draggable.style.left = touch.pageX-750 + 'px';
	// 	    draggable.style.top = touch.pageY-250 + 'px';
	// 	    event.preventDefault();
	//   	}, false);

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
	    });
}

function disorder(o){ //in: list of numbers out: unorder list 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function cartelFelicitaciones(){
	$('article').delay( 800 ).fadeOut( 0 );
	$('#alertOk').delay( 800 ).fadeIn( 400 );
	actividad.sco.set("cmi.core.lesson_status","passed");
	actividad.end();
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
		
		aud=document.createElement('audio');
		$(aud).attr('id','sound'+value);
		$(aud).attr('src','audio/'+value+'.wav');
		$(aud).attr('type','audio/wav');
		$(aud).appendTo('body');
		//<audio id="p" src="audio/p2.mp3" type="audio/mp3"></audio>
		
	});
	//$('#soundcasa')[0].play();	
	//console.log()$('#soundcasa')[0].play();	
}

function playSound(soundName){
	try{ $('#sound'+soundName)[0].play(); }
	catch(e){ console.error('Sonido no encontrado') }
	
}

