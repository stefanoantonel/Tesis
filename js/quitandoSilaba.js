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
	fillTemplateWord(values,syllableToSelect);
	getConfigByElementWithOne("distractors","words",2,functionCallback2,resultWord);
	
}

function functionCallback2(conf) {
	fillTemplateImages(conf);
	images=imgContainer.children();
	dragAndDrop(images,target,functionsDD);
}

function fillTemplateWord(wordComplete,wordToChange){
	originWord=wordComplete.join('');
	originWord = originWord.toUpperCase();
	$(completeWord).text(originWord);
	$(completeWord).attr("name",originWord);
	partSelected=$(wordComplete)[wordToChange];
	partSelected = partSelected.toUpperCase();
	$(part).text(partSelected);
	$(part).attr("name",partSelected);
	addSound(originWord+partSelected);
}

function fillTemplateImages(images){
	imgs=[];
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
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){sessionCounter();}
}

function checkCorrect(img) {
	
	var name = $(img).attr("name");
	if(name == resultWord){
		$(img).animate({
		    width: "50%",
			height: "50%",
		    opacity: 1.4,
		    // marginLeft: "0.6in",
		    fontSize: "3em",
		    borderWidth: "10px",
			borderColor: "green"
	  	}, 500 );
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