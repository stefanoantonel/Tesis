var target;
var imgTemp;
var imgContainer;
var completeWord;
var part;

function readyOk(){
	target=$('#target');
	imgTemp=$('#imgTemp');
	imgContainer=$('#imgContainer');
	completeWord=$('#completeWord');
	part=$('#part');
}

function functionInit() {
	getConfig(10);
	getConfigByElement("act10","act",1,functionCallback);
	readyOk();
}

function functionCallback(conf){
	// group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	var conf = conf[0];
	var syllableToSelect = conf["target"] - 1;
	var values = conf["values"];
	/* 
	* I have to do this toString() because it is an object and when 
	* I modify the syllable the value change
	*/
	var res = conf["values"].toString();
	res = res.split(",");
	res[syllableToSelect] = "";
	resultWord = res.join('').replace(',','');
	// wordSelected=group["word"]; 
	// wordToChange=group["wordToChange"]; //in number
	// images=group["images"];
	fillTemplateWord(values,syllableToSelect);

	//getConfigByElement("distractors","lev_1",2,functionCallback2);
	getConfigByElementWithOne("distractors","lev_1",2,functionCallback2,resultWord);
	
}

function functionCallback2(conf) {
	//conf.unshift()
	fillTemplateImages(conf);
	images=imgContainer.children();
	dragAndDrop(images,target,functionsDD);
}

function fillTemplateWord(wordComplete,wordToChange){
	originWord=wordComplete.join('');
	$(completeWord).text(originWord);
	partSelected=$(wordComplete)[wordToChange];
	$(part).text(partSelected);
	addSound(originWord+partSelected);
	//$(completeWord).mouseohover(playSound(originWord+partSelected));
}

function fillTemplateImages(images){
	imgs=[];
	// images.unshift(result);
	$(images).each(function(index,e){
    	t=$(imgTemp).clone();
		name=e;
		addSound(name);
		$(t).attr('name',name);
		$(t).attr('num',index);
		$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).mouseover(function(){
			playSound($(this).attr('name'));
		});
		$(t).removeClass('hidden');
		imgs.push(t);
	});
	disorder(imgs);
	$(imgContainer).append(imgs);
}

function functionsDD(context,currElem){
	//checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){sessionCounter();}
}

function checkCorrect(img) {
	
	var name = $(img).attr("name");
	if(name == resultWord){
		return true;
	}
	else{
		$(img).effect('shake');
		$(img).removeClass('normal');
		$(img).addClass('wrong');
		window.setTimeout(moveOrigin, 1000,img,imgContainer);
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