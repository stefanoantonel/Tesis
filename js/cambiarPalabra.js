var leftArray=0
var rightArray=0
var numParts=0;

function functionsDD(context,currElem){
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){cartelFelicitaciones();}
}

function readyOk(idObj,left,right){
	conf=getConfig("6",randomGroup);
}

function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=group["1"]; //no se van a mover
	right=group["2"];
	wordToChange=group["wordToChange"];
	functInitWords(left,wordToChange); //muestra una palabra y oculta la otra
	functInitImages(right);
	contRight=$('#rightContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
}

function changeColor(cont,words,let){
	//changeColor(contenedor, palabara, letra resaltada)
	parts=words.split("");
	elements=[];
	$(parts).each(function(ind,elem){
		d=document.createElement('div');
		$(d).html(elem);
		a=$(d).addClass('firstWord');
		elements.push(a);
	});
	wordToChange=$(elements[let-1]);

	$(wordToChange).addClass('wordSelected');
	$(wordToChange).click(function(){	
		$('.firstWord').fadeOut();
		$('.secondWord').removeAttr('hidden');
		$('#target').removeAttr('hidden');
		$('#rightContainer').removeAttr('hidden');
		$('#firstImage').remove();
	});
	return elements;
}

//sin desordenar
function functInitWords(conf,wordToChange){
	
	//palabra inicial con letra llamativa------------------------
	t=$('#leftboxTemp').clone();
	$(t).attr('id','left0');
	$(t).attr('name',conf[0]);
	$(t).addClass('firstWord');
	$(t).removeAttr('hidden');
	changed=changeColor($(t),conf[0],wordToChange);
	$('#leftContainer').append(changed);
	
	//----------------------------------------------------------------------
	//palabra oculta -----------------------------------------------
	t=$('#leftboxTemp').clone();
	$(t).attr('id','left1');
	$(t).attr('name',conf[1]);
	$(t).addClass('secondWord');
	$(t).html(conf[1]);
	$('#leftContainer').append(t);
	//-------------------------------------------------------
	//---------------initial Image
	firstImg(conf);
}

function functInitImages(conf,x){
	
	//-------------second stage images
	imgs=[];
	$(conf).each(function(index,e){
    	//t=$('#'+rightArray[index]);
    	t=$('#rightboxTemp').clone();
		$(t).attr('id','right'+index);
		$(t).removeAttr('hidden');
		$(t).attr('name',conf[index]);
		$(t).prop('num',index);
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
		$(t).attr('src','images/activities/' + $(t).attr("name") + '.jpg');
		imgs.push(t);
	});
	disorder(imgs);
	$("#rightContainer").append(imgs);
	
}

function firstImg(conf){
	//-------------------------show image
	t1=$('#rightboxTemp').clone();
	$(t1).attr('id','firstImage');
	$(t1).addClass('firstImage')
	$(t1).attr('src','images/activities/' + conf[0] + '.jpg');	
	$(t1).removeAttr('hidden');
	$("#leftContainer").append(t1);
}

function checkCorrect(part) {
	num=$(part).prop("num");
	if(num==0){
		return true;
	}
	else{
		$(part).effect('shake');
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