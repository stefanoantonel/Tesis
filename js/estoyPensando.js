var conf;
var wordContainer;
var imgTemp;
var imgContainer;
function readyOk(){

	wordContainer=$('#word');
	imgTemp=$('#imgTemp');
	imgContainer=$('#imgContainer');
	// conf=getConfig(8,functionInit);
	// functionInit();
}

function functionInit(){
	readyOk();
	getConfig("8");
	getConfigByElement("act8","act",1,functionCallback);
	
}


function functionCallback(conf) {
	// group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	var conf = conf[0];
	var targetWord = conf["target"] - 1;
	var values = conf["values"]
	wordSelected=values.join('').replace(/,/g, "");;
	// getConfigByElement("distractors","lev_1",2,functRight);
	var letter = wordSelected.split('')[0];
	letter = letter.toUpperCase();
	$(wordContainer).text(letter);
	getConfigByElementWithOne("distractors","lev_1",2,functRight,wordSelected);
}

function functRight(conf) {
	imagesSelected=conf;
	fillTemplate(wordSelected,imagesSelected);
}

function fillTemplate(wordSelected,imagesSelected){	
	arrayImg=[];
	// word=wordSelected;
	// imagesSelected.unshift(wordSelected);
	$(imagesSelected).each(function(index,e){
		t=$(imgTemp).clone();
		$(t).attr('id','img'+index);
		name=e;
		addSound(name);
		$(t).attr('name',name);
		$(t).removeClass('temp');
		$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).mouseover(function(){
			playSound(this.name);
		});
		$(t).click(function(){
			checkCorrect(this);
		});
		arrayImg.push(t);
	});
	disorder(arrayImg);
	$(imgContainer).append(arrayImg);
	//$(wordContainer).text(wordSelected);
	$(wordContainer).mouseover(function(){
		playSound(word);
	});
}

function checkCorrect(elem){
	var name = $(elem).attr('name');
	if(name == wordSelected){
		$(elem).effect('puff');
		sessionCounter();
	}
	else{
		console.log(elem);
		$(elem).effect('shake');
		

	}
}
