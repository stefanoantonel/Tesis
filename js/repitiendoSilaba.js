var target;
var syllableTemp;
var syllableContainer;
var completeWord;
var part;

function readyOk(){
	target=$('#target');
	syllableTemp=$('#syllableTemp');
	completeWord1 = $('#completeWord1');
	completeWord2 = $('#completeWord2');
	syllableContainer=$('#syllableContainer');
	completeWord=$('#completeWord');
}

function functionInit() {
	getConfig(10);
	getConfigByElement("act14","act",1,functionCallback);
	readyOk();
	rotateEfect();
}

function rotateEfect(){
	var labels = syllableTemp.find("label");
	$(labels).addClass("rot");
} 

function functionCallback(conf){
	var conf = conf[0];
	var syllableToSelect = conf["target"] - 1;
	var firstWord = conf["values"][0];
	var secondWord = conf["values"][1];
	/* 
	* I had to do this toString() because it is an object and when 
	* I modify the syllable the value change
	*/
	syllableResult = firstWord[syllableToSelect];
	resultFirstWord = firstWord.join('').replace(',','');
	resultsecondWord = secondWord.join('').replace(',','');
	fillTemplateWord(resultFirstWord,resultsecondWord);
	getConfigByElementWithOne("distractors","syllables",2,functionCallback2,syllableResult);
	
}

function functionCallback2(conf) {
	//conf.unshift()
	fillTemplateImages(conf);
	images=syllableContainer.children();
	dragAndDrop(images,target,functionsDD);
}

function fillTemplateWord(firstPart,secondPart){
	$(completeWord1).text(firstPart);
	$(completeWord2).text(secondPart);
}

function fillTemplateImages(syllables){
	var syllablesArray=[];
	// images.unshift(result);
	
	$(syllables).each(function(index,e){
    	t=$(syllableTemp).clone();
    	var content= $(t).find("label").last();
		name=e;
		addSound(name);
		content.attr('name',name);
		content.attr('num',index);
		//$(t).html(name);
		/*Change to make effect*/
		content.html(name);
		content.mouseover(function(){
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
	if (isCorrect==true){sessionCounter();}
}

function checkCorrect(syllable) {
	var name = $(syllable).find("label").last().attr("name");
	if(name == syllableResult){
		return true;
	}
	else{
		$(syllable).find("label").removeClass('rot');
		$(syllable).effect('shake');
		$(syllable).removeClass('normal');
		$(syllable).addClass('wrong');
		window.setTimeout(moveOrigin, 1000,syllable,syllableContainer);
		window.setTimeout(function(){
			$(syllable).find("label").addClass('rot');
		}, 1000);
		return false;
	}
}