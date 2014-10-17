var leftArray=0
var rightArray=0
var numParts=0;

function functionsDD(context,currElem){
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){cartelFelicitaciones();}
}

function readyOk(idObj,left,right){
	functionInit();
}

function functionInit() {
	var images=getConfigByElement("act6","act",1,functionCallback);
}

function functionCallback(conf){
	var conf = conf[0];
	var wordToChange = conf["target"] - 1;
	var values = conf["values"]

	// group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=values[0].join('').replace(/,/g, ""); //no se van a mover
	right=values[1].join('').replace(/,/g, "");
	// wordToChange=group["wordToChange"];
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
		a=$(d).mouseover(function(){
			playSound(words);
		});
		a=$(d).addClass('inline');
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
		$('#left1').removeClass('secondWordHidden');
		playSound(this.text());
	});
	return elements;
}

//sin desordenar
function functInitWords(conf,wordToChange){
	
	//palabra inicial con letra llamativa------------------------
	t=$('#leftboxTemp').clone();
	$(t).attr('id','left0');
	name=conf[0];
	$(t).attr('name',name);
	$(t).addClass('firstWord');
	$(t).removeAttr('hidden');
	changed=changeColor($(t),name,wordToChange);

	$(t).html(changed);
	$('#leftContainer').append(t);
	//$('#leftContainer').append(changed);
	t='';
	//----------------------------------------------------------------------
	//palabra oculta -----------------------------------------------
	t=$('#leftboxTemp').clone();
	$(t).attr('id','left1');
	name=conf[1];
	$(t).attr('name',name);
	$(t).removeAttr('hidden');
	$(t).addClass('secondWordHidden');
	//$(t).html(conf[1]);
	changed=changeColor($(t),name,wordToChange);
	//$('#leftContainer').append(t);

	$(t).html(changed);
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
		name=conf[index];
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
	$("#rightContainer").append(imgs);
	
}

function firstImg(conf){
	//-------------------------show image
	t1=$('#rightboxTemp').clone();
	$(t1).attr('id','firstImage');
	$(t1).addClass('firstImage');
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
		$(part).removeClass('normal');
		$(part).addClass('wrong');
		window.setTimeout(moveOrigin, 1000,part,"#rightContainer");
		return false;
	}
}

function checkReplace(box,newDiv){
	if( $(box).has('img') ){
		prevDiv=$(box).children();
		$(prevDiv).removeClass('wrong');
		$(prevDiv).addClass('normal');
		$('#rightContainer').append(prevDiv);
		$(box).append(newDiv);

	}
}