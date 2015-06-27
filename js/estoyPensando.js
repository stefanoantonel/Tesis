var conf;
var wordContainer;
var imgTemp;
var imgContainer;
function readyOk(){

	wordContainer=$('#word');
	imgTemp=$('#imgTemp');
	imgContainer=$('#imgContainer');
}

function functionInit(){
	readyOk();
	getConfig("8");
	getConfigByElement("act8","act",1,functionCallback);
	
}


function functionCallback(conf) {
	var conf = conf[0];
	var targetWord = conf["target"] - 1;
	var values = conf["values"];
	wordSelected=values.join('').replace(/,/g, "");;
	var letter = wordSelected.split('')[0];
	letter = letter.toUpperCase();
	$(wordContainer).text(letter);
	getConfigByElementWithOne("distractors","words",2,functRight,wordSelected,wordSelected.slice(0,1));
}

function functRight(conf) {
	imagesSelected=conf;
	fillTemplate(wordSelected,imagesSelected);
}

function fillTemplate(wordSelected,imagesSelected){	
	arrayImg=[];
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
	$(wordContainer).mouseover(function(){
		playSound(word);
	});
}

function checkCorrect(elem) {
	var name = $(elem).attr('name');
	if(name == wordSelected) {
		$(elem).addClass("animateToFrontUpper");
		setTimeout(function() {sessionCounter();}, 1000);
	}
	else {
		console.log(elem);
		playSound("wrong");
		$(elem).effect('shake');
		changeScore(-10);
	}
}
