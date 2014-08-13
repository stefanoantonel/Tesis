/*
 * Falta corregir el tema de los contenedores originales
*/

var leftArray=0
var rightArray=0
var numParts=0;
var contOriginal;
var contSegundo;

function functionsDD(context,currElem){
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	//if (isCorrect==true){cartelFelicitaciones();}
}

function readyOk(idObj,left,right){
	//dragAndDrop(idObj,idBox,idBox2);
	
	//fill(idObj,left,right);
	conf=getConfig("5",randomGroup);
	
}

function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=group["1"];
	right=group["2"];
	functInit(left,"left"); //paso el array solamente 
	functInit(right,"right"); //paso el array solamente
	contRight=$('#rightContainer').children();
	contLeft=$('#leftContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
	dragAndDrop(contLeft,idObj,functionsDD);
	console.log("drag",$( ".img" ));
	$( ".img" ).on( "dragstart", function( event, ui ) {
		if(contOriginal==null)
			contOriginal=$(this).parents(".container");
		else
			contSegundo=$(this).parents(".container");
		console.log("c:",contOriginal);
	} );
}



function functInit(conf,place){
	//desordenado=disorder(conf)
	//$(desordenado).each(function(index,e){
	imgs=[];
	$(conf).each(function(index,e){
    	//t=$('#'+rightArray[index]);
    	t=$('#'+place+'boxTemp').clone();
		$(t).attr('id',index);
		$(t).removeAttr('hidden');
		$(t).attr('name',conf[index]);
		$(t).prop('num',index);
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
		$(t).attr('src','images/activities/' + $(t).attr("name") + '.jpg');
		imgs.push(t);
	});
	disorder(imgs);
	$("#"+place+"Container").append(imgs);
	
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
		$(contOriginal).append(prevDiv);
		contOriginal=contSegundo;
		contSegundo=null;
		$(box).append(newDiv);

	}
}