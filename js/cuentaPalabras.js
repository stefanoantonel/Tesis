var target;
var numberTemp;
var numbersContainer;
var completeWord;
var numberToSelect;

function readyOk(){
	target=$('#target');
	numberTemp=$('#numberTemp');
	numbersContainer=$('#numbersContainer');
	completeWord=$('#completeWord');
}

function functionInit(counter,level) {
	readyOk();
	getConfig("12");
	if(level == null)
		level ="lev_1";
	getConfigByElement("sentence",level,1,functionCallback);
	window.setTimeout(function(){$(".cube").addClass("girar");},200);
	return new Promise(function(resolve, reject) {
		resolve();
	});
}
function moveToTarget(elem) {
	$(target).append(elem);
	functionsDD(null,elem);
}

function functionCallback(conf){
	var conf = conf[0];
	var sentenceSelected = conf["values"];
	addSound(sentenceSelected);
	numberToSelect = sentenceSelected.length;
	fillTemplateWord(sentenceSelected);
	getConfigByElementWithOne("distractors","numbers",2,fillTemplateNumber,numberToSelect);
	
}

function getRandomNumber(quantity) {
	var random = [];
	for (var i = quantity - 1; i >= 0; i--) {
		random.push( Math.floor((Math.random()*10)+1) );	
	};	
	return random;
}

function fillTemplateWord(wordComplete){
	originWord=wordComplete.join(' ');
	$(completeWord).text(originWord);
	$(completeWord).hover(function(){
		var elem = this;
		$.data(this, "timer", setTimeout($.proxy(function() {
			playSound(originWord.replace(/ /g,"")); 
        }, this), 300));
        }, function() { clearTimeout($.data(this, "timer")); }
	);
	
}

function fillTemplateNumber(number){
	numberArray=[];
	//number.unshift(numberToSelect);
	$(number).each(function(index,e){
    	t=$(".numberContainer").clone();
    	name=e;
    	addSound(name);
    	$(t).attr('name',name);
		$(t).find(".numberTemp").attr('name',name);
		$(t).find(".numberTemp").attr('num',index);
		//$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).find(".numberTemp").mouseover(function(){
			playSound($(this).attr('name'));
		});
		$(t).find(".numberTemp").text(name);
		$(t).removeClass('hidden');
		numberArray.push(t);
	});
	disorder(numberArray);
	$(numbersContainer).append(numberArray);
	//numbersDiv=numbersContainer.children();
	numbersDiv=$(".numberTemp:not(.hidden)");
	
	dragAndDrop(numbersDiv,target,functionsDD,moveToTarget);
	
}

function functionsDD(context,currElem){
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if(isCorrect == true){
		origin=$(currElem).attr('name');
		playSound(origin);
		/*$(document).delay(400);
		cartelFelicitaciones();*/
		sessionCounter();
	}
	$(".cube").addClass("girar");
}

function checkCorrect(number) {
	num = $(number).html();
	if(num.valueOf() == numberToSelect.valueOf()){
		window.setTimeout(function(){$(number).addClass("animateToFront");},0);
		return true;
	}
	else{
		wrong(number,$(".numberContainer[name='"+$(number).attr("name")+"'] .front"));
		return false;
	}
}

function checkReplace(box,newDiv){
	if( $(box).has('b') ){
		prevDiv=$(box).children();
		$(prevDiv).removeClass('wrong');
		$(numbersContainer).append(prevDiv);
		$(box).append(newDiv);

	}
}