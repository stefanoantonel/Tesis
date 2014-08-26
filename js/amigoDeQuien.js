/*
 * Falta corregir el tema de los contenedores originales
*/

var leftArray=0
var rightArray=0
var numParts=0;
var contOriginal;
var contSegundo;

function moveOrigin(img1,img2,contOriginal1,contOriginal2){
	console.log($("#"+contOriginal1));
	$("#target").find("#"+img1).css('border-color','black');
	$("#target").find("#"+img2).css('border-color','black');
	
	$("#target").find("#"+img1).appendTo($("#"+contOriginal1));
	$("#target").find("#"+img2).appendTo($("#"+contOriginal2));
}


function functionsDD(context,currElem){
	//$( ".img" ).on( "dragstop", function( event, ui ) {
		if(img1==null){
			img1=currElem.attr("id");
			contOriginal1=currElem.attr("column");
			console.log("seteo img1 con:"+img1);
			console.log("contenedor 1:"+contOriginal1);
			}
		else{
			img2=currElem.attr("id");
			contOriginal2=currElem.attr("column");
			console.log("img2:"+img2);
			console.log("antes del igual:"+img1+" - "+img2);
			if(img1==img2){
				console.log("igual");
				window.setTimeout(function(){$("#target").html("");}, 500);
				contador=contador-1;
				if(contador==0){ cartelFelicitaciones();}
			}
		else{
			$("#target").find("#"+img2).css('border-color','red').effect('shake');
			$("#target").find("#"+img1).css('border-color','red').effect('shake');
			window.setTimeout(moveOrigin, 1000,img1,img2,contOriginal1,contOriginal2);
			
		}
		img1=null;
		img2=null;
		console.log("limpia-----------------------");
		}
}


function readyOk(idObj,left,right){
	conf=getConfig("5",randomGroup);
}


function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=group["1"];
	right=group["2"];
	functInit(left,"left"); //adds elements disorderly   
	functInit(right,"right"); 
	contRight=$('#rightContainer').children();
	contLeft=$('#leftContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
	dragAndDrop(contLeft,idObj,functionsDD);
	//console.log("drag",$( ".img" ));
	
}



function functInit(conf,place){
	imgs=[];
	$(conf).each(function(index,e){
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

