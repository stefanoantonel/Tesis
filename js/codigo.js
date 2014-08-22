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
	    	loadDescription(c.description)
	    });
}

function getDescription(numAct,callBack){
	
}

function disorder(o){ //in: list of numbers out: unorder list 
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

function cartelFelicitaciones(){
	$('article').delay( 600 ).fadeOut( 0 );
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