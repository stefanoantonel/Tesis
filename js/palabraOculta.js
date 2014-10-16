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
	// conf=getConfig("4",randomGroup);
}
function functionInit() {
	var images=getConfigByElement("act4","act",1,functionCallback);
	// var distractors=getConfigByElement("distractors","lev_1",2,functionCallback);
}


function functionCallback(conf){
	var conf = conf[0];
	var syllableToSelect = conf["target"] - 1;
	var values = conf["values"];

	var firstWord = values[0];
	var secondWord = values[1];
	var result = ([ firstWord[syllableToSelect], secondWord[syllableToSelect] ]).join('');

	var wordArrayLeft = [[firstWord],[secondWord]] 

	functLeft(wordArrayLeft,syllableToSelect); //paso el array solamente 
	
	functInit2(right); //paso el array solamente para desordenar
	contRight=$('#rightContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
	//loadDescription(conf.description);
}

//sin desordenar
// function functLeft(wordArray){	
function functLeft(wordArrayLeft,syllableToSelect) {
	$(wordArrayLeft).each(function(index,elem){
		t=$('#leftboxTemp').clone();
		$(t).attr('id','left'+index);
		name = elem.join('');
		$(t).attr('name',name);
		$(t).removeAttr('hidden');
		$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).mousedown(function(){
			playSound($(this).attr('name'));
		});
		$('#leftContainer').append(t);
	});
}

function functInit2(conf,x){
	imgs=[];
	$(conf).each(function(index,e){
    	t=$('#rightboxTemp').clone();
		$(t).attr('id',index);
		$(t).removeAttr('hidden');
		name=conf[index];
		$(t).attr('name',name);
		$(t).prop('num',index);
		$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).mousedown(function(){
			playSound(this.name);
		});
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

		$(part).removeClass('normal');
		$(part).addClass('wrong');
		console.log($(part));
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