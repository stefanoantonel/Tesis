var leftArray=0
var rightArray=0
var numParts=0;

function readyOk(idObj,left,right){
	//dragAndDrop(idObj,idBox,idBox2);
	
	leftArray=left;
	rightArray=right;	
	dragAndDrop4(right,idObj);
	fill(idObj,left,right);
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
        		checkCorrect($( this ).children());
        		
        		
        	}
        });
    });
    
}

function fill(idObj,left,right){
	conf=getConfig("4",randomGroup);
	//conf=getConfig2("4","2",functInit2);
}

function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=group["1"];
	right=group["2"];
	functInit1(left); //paso el array solamente 
	functInit2(right); //paso el array solamente
}

//sin desordenar
function functInit1(conf,x){
	
	
	$(leftArray).each(function(index,e){
		t=$('#'+e);
		$(t).attr('name',conf[index]);
		//$(t).attr('num',index);
		$(t).attr('src','images/imgOculta/' + $(t).attr("name") + '.jpg');
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
	});

}

function functInit2(conf,x){
	//desordenado=disorder(conf)
	//$(desordenado).each(function(index,e){
	imgs=[];
	$(conf).each(function(index,e){
    	t=$('#'+rightArray[index]);
		$(t).attr('name',conf[index]);
		$(t).prop('num',index);
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
		$(t).attr('src','images/imgOculta/' + $(t).attr("name") + '.jpg');
		imgs.push(t);
	});
	disorder(imgs);
	$("body").append(imgs);
	
}



function checkCorrect(part) {
	num=$(part).prop("num");
	if(num==0){
		alert('fin');
	}
}