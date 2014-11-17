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
}

function functionCallback(conf){
	// group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
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
	// wordSelected=group["word"]; 
	// wordToChange=group["wordToChange"]; //in number
	// images=group["images"];
	fillTemplateWord(resultFirstWord,resultsecondWord);

	//getConfigByElement("distractors","lev_1",2,functionCallback2);
	getConfigByElementWithOne("distractors","syllables",2,functionCallback2,syllableResult);
	
}

function functionCallback2(conf) {
	//conf.unshift()
	fillTemplateImages(conf);
	images=syllableContainer.children();
	dragAndDrop(images,target,functionsDD);
}

function fillTemplateWord(firstPart,secondPart){
	// originWord=wordComplete.join('');
	$(completeWord1).text(firstPart);
	//partSelected=$(wordComplete)[wordToChange];
	$(completeWord2).text(secondPart);
	//addSound(originWord+partSelected);
	//$(completeWord).mouseohover(playSound(originWord+partSelected));
}

function fillTemplateImages(syllables){
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
	if (isCorrect==true){sessionCounter();}
}

function checkCorrect(syllable) {
	
	var name = $(syllable).attr("name");
	if(name == syllableResult){
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

function checkReplace(box,newDiv){
	if( $(target).has('img') ){
		prevDiv=$(target).children();
		$(prevDiv).addClass('normal');
		$(imgContainer).append(prevDiv);
		$(target).append(newDiv);

	}
}