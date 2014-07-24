
function disorder(o){ //in: list of numbers out: unorder list 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};


/* El viejo......antes de pasarle una funcion
function dragAndDrop(idImg,idBoxes) {

	$(idImg).each(function(ind,part){
	
		$('#'+ind).draggable({
			revert:true,
		});
	});

    $(idBoxes).each(function(ind,box){
    	
    	$( '#'+box ).droppable({
        	drop: function( event, ui ) {
        		$(ui.draggable).css({top:0,left:0});
        		$( this )
        			.addClass( "ui-state-highlight" )
        			.append(ui.draggable);  
        		//console.log('drop..',ui.draggable);
        		
        		//isCorrect=checkCorrect($(this));
        		//if (isCorrect==true){cartelFelicitaciones();}
        		
        	}
        });
    });
    
}
*/
function dragAndDrop(idImg,idBoxes,functions) {

	//console.log('DragDrop');
	console.log(idImg);
	$(idImg).each(function(ind,part){
		console.log($('#'+ind));
		$('#'+ind).draggable({
			revert:true,
		});
	});

    $(idBoxes).each(function(ind,box){
    	
    	$( '#'+box ).droppable({
        	drop: function( event, ui ) {
        		$(ui.draggable).css({top:0,left:0});
        		$( this )
        			.addClass( "ui-state-highlight" )
        			.append(ui.draggable);  
        		//console.log('drop..',ui.draggable);
        		//checkCorrect($( this ).children());
        		
        		//checkReplace($(this),ui.draggable);
        		//checkCorrect(ui.draggable);

        		functions(this,ui.draggable);
        		
        	}
        });
    });
    
}

function getConfig(numAct,callBack){
	$.getJSON("js/configGroups.json",function(result,callBack){
	    	c=result["act"+numAct];
	    }).done(function (){callBack(c);});
}

function cartelFelicitaciones(){
	$('article').html('');
	$('#alertOk').attr('hidden',false);
}



/*
function dragAndDrop1(idImg,idBox,idBox2){
	
	pic=document.getElementById(idImg);
	
	$(pic).attr('draggable', true);
	
	left=document.getElementById(idBox);
	right=document.getElementById(idBox2);
	
	left.addEventListener("dragover",function(e){e.preventDefault()},false); 
	right.addEventListener("dragover",function(e){e.preventDefault()},false);
	
	left.addEventListener("drop",dropped,false);
	right.addEventListener("drop",dropped,false);
}

function dropped(e,ui){
	console.log("dropped");
	
	e.preventDefault();
	this.insertBefore(pic);
	
}
*/
/*
function disorderS(o){ //in: list of numbers out: unorder list 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return ;
};
*/
