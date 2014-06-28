
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


function disorderS(o){ //in: list of numbers out: unorder list 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return ;
};

function disorder(o){ //in: list of numbers out: unorder list 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
function compare(){}

function areEqual(im1,im2){
	console.log("compare: "+im1+" con:"+ im2);
	x=Math.floor(parseInt(im1)/10);
	y=Math.floor(parseInt(im2)/10);
	if(x==y)
		{console.log("bien");
		return true;
		}
	return false;
}
function dragAndDrop(idImg,idBoxes) {

	$(idImg).each(function(ind,part){
	
		$('#'+ind).draggable();
		//console.log(idImg);
	});

    $(idBoxes).each(function(ind,box){
    	
    	$( '#'+box ).droppable({
        	drop: function( event, ui ) {
        		$(ui.draggable).css({top:0,left:0});
        		$( this )
        			.addClass( "ui-state-highlight" )
        			.append(ui.draggable);  
        		//console.log('drop..',ui.draggable);
        		
        		isCorrect=checkCorrect($(this));
        		if (isCorrect==true){cartelFelicitaciones();}
        		
        	}
        });
    });
    
}

function dragAndDrop4(idImg,idBoxes) {

	$(idImg).each(function(ind,part){
	
		$('#'+part).draggable();
		//console.log(idImg);
	});

    $(idBoxes).each(function(ind,box){
    	
    	$( '#'+box ).droppable({
        	drop: function( event, ui ) {
        		$(ui.draggable).css({top:0,left:0});
        		$( this )
        			.addClass( "ui-state-highlight" )
        			.append(ui.draggable);  
        		//console.log('drop..',ui.draggable);
        		
        		
        		
        	}
        });
    });
    
}

function fillTemplate2(place,temp, elemets){

    $(elemets).each(function(index,e){
        t=$(temp).clone();
        $(t).attr('id',e);
        $(t).prop("hidden",false);
        //$(t).css('display', 'block');
        $(t).css('display', 'inline');
        $(place).append(t);
       // $(place).append("<br/>");
        
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
