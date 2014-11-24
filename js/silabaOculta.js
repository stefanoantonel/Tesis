var target;
var syllableTemp;
var syllableContainer;
var completeWord;
var part;

function readyOk(){
	target = $('#target');
	firstPart = $('#firstPart');
	secondPart = $('#secondPart');
	syllableContainer=$('#syllableContainer');
	syllableTemp = $('#syllableTemp');
}

function functionInit() {
	getConfig(10);
	getConfigByElement("act16","act",1,functionCallback);
	readyOk();
	window.setTimeout(function() {	ballBounce(); },300);
}

function functionCallback(conf){
	var conf = conf[0];
	var syllableToSelect = conf["target"] - 1;
	var valueArray = conf["values"];
	var valueLength = valueArray.length;
	var firstWord = valueArray.slice(0, syllableToSelect);
	var secondWord = valueArray.slice(syllableToSelect+1, valueLength);
	/* 
	* I had to do this toString() because it is an object and when 
	* I modify the syllable the value change
	*/
	syllableResult = valueArray[syllableToSelect];
	resultFirstWord = firstWord.join('').replace(',','');
	resultsecondWord = secondWord.join('').replace(',','');
	fillTemplateWord(resultFirstWord,resultsecondWord);
	getConfigByElementWithOne("distractors","syllables",2,functionCallback2,syllableResult);
	
}

function functionCallback2(conf) {
	//conf.unshift()
	fillTemplateSyllable(conf);
	images=syllableContainer.children();
	dragAndDrop(images,target,functionsDD);
}

function fillTemplateWord(fPart,sPart){
	$(firstPart).text(fPart);
	$(secondPart).text(sPart);
}

function fillTemplateSyllable(syllables){
	var syllablesArray=[];
	// images.unshift(result);
	$(syllables).each(function(index,e){
    	t=$(syllableTemp).clone();
		name=e;
		addSound(name);
		$(t).attr('name',name);
		$(t).attr('num',index);
		$(t).html(name);
		$(t).mouseover(function(){
			playSound($(this).attr('name'));
		});
		$(t).removeClass('hidden');
		syllablesArray.push(t);
	});
	disorder(syllablesArray);
	$(syllableContainer).append(syllablesArray);
}

function functionsDD(context,currElem){
	//checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){
		window.setTimeout(function() {	sessionCounter(); },3000);
	}
}

function checkCorrect(syllable) {
	var name = $(syllable).attr("name");
	if(name == syllableResult){
		$(syllable).removeClass("sphere");
		$(syllable).addClass("backgroundText");
		window.setTimeout(function(){$(syllable).addClass("animateToFront");},1000);
		return true;
	}
	else{
		$(syllable).effect('shake');
		$(syllable).removeClass('normal');
		$(syllable).addClass('wrong');
		window.setTimeout(moveOrigin, 1000,syllable,syllableContainer);
		return false;
	}
}

function ballBounce(){
	//$($(syllableContainer).find(".syllable")).addClass("bounceAnimate");
	$(syllableContainer).addClass("bounceAnimate");
}
