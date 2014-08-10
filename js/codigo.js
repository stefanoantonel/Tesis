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
	    }).done(function (){callBack(c);});
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
=======
function disorder(o){ //in: list of numbers out: unorder list 
>>>>>>> origin/master
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
<<<<<<< HEAD
*/



function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=group["1"];
	right=group["2"];
	functInit1(left); //paso el array solamente 
	functInit2(right); //paso el array solamente para desordenar
	contRight=$('#rightContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
}


function cartelFelicitaciones(){
	$('article').delay( 600 ).fadeOut( 0 );
	$('#alertOk').delay( 800 ).fadeIn( 400 );
}

