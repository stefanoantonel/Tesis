var leftArray=0
var rightArray=0
var numParts=0;

function functionsDD(context,currElem){
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){cartelFelicitaciones();}
}

function readyOk(idObj,left,right){
	//dragAndDrop(idObj,idBox,idBox2);
	
	//fill(idObj,left,right);
	conf=getConfig("4",randomGroup);
	
}



/*
function dragAndDrop4(idImg,idBoxes,functions) {
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
        		//checkCorrect($( this ).children());
        		
        		//checkReplace($(this),ui.draggable);
        		//checkCorrect(ui.draggable);

        		functions(this,ui.draggable);
        		
        	}
        });
    });
    
}
*/

/*
function fill(idObj,left,right){
	conf=getConfig("4",randomGroup);
	//conf=getConfig2("4","2",functInit2);
}
*/

function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=group["1"];
	right=group["2"];
	functInit1(left); //paso el array solamente 
	functInit2(right); //paso el array solamente
	contRight=$('#rightContainer').children();
	idObj=['target'];
	dragAndDrop(contRight,idObj,functionsDD);
}

//sin desordenar
function functInit1(conf,x){
	
	
	$(conf).each(function(index,e){
		t=$('#leftbox').clone();
		//t=$('#'+e);
		$(t).attr('id','left'+index);
		$(t).attr('name',conf[index]);
		$(t).removeAttr('hidden');
		//$(t).attr('num',index);
		$(t).attr('src','images/imgOculta/' + $(t).attr("name") + '.jpg');
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
		$('#leftContainer').append(t);

	});

}

function functInit2(conf,x){
	//desordenado=disorder(conf)
	//$(desordenado).each(function(index,e){
	imgs=[];
	$(conf).each(function(index,e){
    	//t=$('#'+rightArray[index]);
    	t=$('#rightbox').clone();
		$(t).attr('id',index);
		$(t).removeAttr('hidden');
		$(t).attr('name',conf[index]);
		$(t).prop('num',index);
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
		$(t).attr('src','images/imgOculta/' + $(t).attr("name") + '.jpg');
		imgs.push(t);
	});
	disorder(imgs);
	$("#rightContainer").append(imgs);
	
}



function checkCorrect(part) {
	num=$(part).prop("num");
	if(num==0){
		return true;
	}
	else{
		$(part).effect('shake');
		//$(part).css('border',3px solid; border-color: red;')
		//$(part).css('border','3px solid');
		$(part).css('border-color','red');
		return false;
	}
}

function checkReplace(box,newDiv){

	if( $(box).has('img') ){
		prevDiv=$(box).children();
		$(prevDiv).css('border-color','black');
		$('#rightContainer').append(prevDiv);
		$(box).append(newDiv);

	}
}