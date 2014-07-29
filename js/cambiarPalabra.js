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
	conf=getConfig("6",randomGroup);
	
}



function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=group["1"];
	right=group["2"];
	functInit1(left); //muestra una palabra y oculta la otra
	//hideWords('#leftContainer');
	functInit2(right);
	contRight=$('#rightContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
}

function changeColor(cont,word,let){
	//changeColor(contenedor, palabara, letra resaltada)
	parts=word.split("");
	$(parts).each(function(ind,elem){
		console.log('p');
		$(elem).wrap( "<div></div>" );	
	});
	//$(parts[let]).wrap( "<div></div>" );
	//.css('display','none');
	$(cont).html(parts);
}

//sin desordenar
function functInit1(conf,x){
	
	//palabra inicial con letra llamativa------------------------
	t=$('#leftboxTemp').clone();
	//t=$('#'+e);
	$(t).attr('id','left0');
	$(t).attr('name',conf[0]);
	$(t).removeAttr('hidden');
	//$(t).attr('num',index);
	//$(t).attr('src','images/imgOculta/' + $(t).attr("name") + '.jpg');
	//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
	//$(t).html(conf[0]);

	changeColor($(t),conf[0],0);

	$(t).click(function(){
		$(this).css('display','none');
		$(this).next().removeAttr('hidden');
	});
	$('#leftContainer').append(t);
	//----------------------------------------------------------------------

	//palabra oculta -----------------------------------------------
	t=$('#leftboxTemp').clone();
	//t=$('#'+e);
	$(t).attr('id','left1');
	$(t).attr('name',conf[1]);
	//$(t).removeAttr('hidden');
	//$(t).attr('num',index);
	//$(t).attr('src','images/imgOculta/' + $(t).attr("name") + '.jpg');
	//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
	$(t).html(conf[1]);
	$('#leftContainer').append(t);
	//-------------------------------------------------------


}

function functInit2(conf,x){
	//desordenado=disorder(conf)
	//$(desordenado).each(function(index,e){
	imgs=[];
	$(conf).each(function(index,e){
    	//t=$('#'+rightArray[index]);
    	t=$('#rightboxTemp').clone();
		$(t).attr('id','right'+index);
		$(t).removeAttr('hidden');
		$(t).attr('name',conf[index]);
		$(t).prop('num',index);
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
		$(t).attr('src','images/imgCambiar/' + $(t).attr("name") + '.jpg');
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