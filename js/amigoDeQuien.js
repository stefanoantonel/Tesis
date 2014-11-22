/*
 * Falta corregir el tema de los contenedores originales
*/

var leftArray=0;
var rightArray=0;
var numParts=0;
var contOriginal;
var contSegundo;


function functionInit(){
	contador=3;
	target=$('#target');
	readyOk(target,'leftbox','rightbox');
}


function imgWrong(img1,img2,contOriginal1,contOriginal2){
	
	/*$("#target").find("#"+img1).removeClass('wrong');
	$("#target").find("#"+img2).removeClass('wrong');
	$("#target").find("#"+img1).addClass('normal');
	$("#target").find("#"+img2).addClass('normal');
	*/
	moveOrigin(img1,contOriginal1);
	moveOrigin(img2,contOriginal2);
	/*$("#target").find("#"+img1).appendTo($("#"+contOriginal1));
	$("#target").find("#"+img2).appendTo($("#"+contOriginal2));*/
}


function functionsDD(context,currElem){
	//$( ".img" ).on( "dragstop", function( event, ui ) {
		if(img1==null){
			img1=currElem.attr("id");
			contOriginal1=currElem.attr("column");
		
			}
		else{
			 $("img").css("pointer-events", "none");
			img2=currElem.attr("id");
			contOriginal2=currElem.attr("column");
		
			if(img1==img2){
				imageOk($("#target").find("img"));
				window.setTimeout(function(){$("#target").html("");}, 1500);
				contador=contador-1;
				if(contador==0){ sessionCounter();}
			}
		else{
			console.log("imgs: ",img1,img2);
			var img_target1=$("#target").find("#"+img1);
			var img_target2=$("#target").find("#"+img2);
			img_target1.removeClass('normal');
			img_target2.removeClass('normal');
			img_target1.addClass('wrong').effect('shake');
			img_target2.addClass('wrong').effect('shake');
			window.setTimeout(imgWrong, 1000,img_target1,img_target2,$("#"+contOriginal1),$("#"+contOriginal2));
			//window.setTimeout(imgWrong, 1000,img_target2,$("#"+contOriginal2));
			
		}
		window.setTimeout(function(){$("img").css("pointer-events", "auto");},1500);
		img1=null;
		img2=null;
		
		}
}

function imageOk(target){
	//target.removeClass("ui-draggable-dragging");
	//target.removeClass("ui-draggable");
	window.setTimeout(function(){$(target[0]).addClass("animateToFront");},500);
	window.setTimeout(function(){$(target[1]).addClass("animateToFrontRigth");},500);
	
} 

function readyOk(idObj,left,right){
	getConfig("5");
	getRhymes("rhymes","lev_1",3,fillTemplate);
}

/*
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
*/
function fillTemplate(conf){
	var left=[];
	var right=[];
	$(conf).each(function(index,element){
		left.push(element[0]);
		right.push(element[1]);
	});
	fillElements(left,"left"); //adds elements disorderly   
	fillElements(right,"right"); 
	contRight=$('#rightContainer').children();
	contLeft=$('#leftContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
	dragAndDrop(contLeft,idObj,functionsDD);
}



function fillElements(conf,place){
	imgs=[];
	$(conf).each(function(index,e){
    	t=$('#'+place+'boxTemp').clone();
		$(t).attr('id',index);
		$(t).removeAttr('hidden');
		name=conf[index];
		addSound(name);
		$(t).attr('name',name);
		$(t).prop('num',index);
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
		$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).mousedown(function(){
			playSound(this.name);
		});	
		imgs.push(t);
	});
	disorder(imgs);
	$("#"+place+"Container").append(imgs);
	
}

