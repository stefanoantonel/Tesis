var conf;
var wordContainer;
var imgTemp;
var imgContainer;
var letterOnly;

function functionInit(){
	return new Promise(function(resolve, reject) {
		readyOk();
		getConfig("8").then(function() {
			return getConfigByElement("act8","act",1,null);
		}).then(function(conf) {
			return functionCallback(conf);
		}).then(function() {
			removeLoading();
			playTutorial(actNum);
			resolve();
		});
	});
}
function readyOk(){
	wordContainer=$('#word');
	imgTemp=$('#imgTemp');
	imgContainer=$('#imgContainer');
}

function functionCallback(conf) {
	return new Promise(function(resolve, reject) {
		conf = conf[0];
		var targetWord = conf["target"] - 1;
		var values = conf["values"];
		wordSelected=values.join('').replace(/,/g, "");;
		var letter = wordSelected.split('')[0];
		letterOnly = letter;
		letter = letter.toUpperCase();
		$(wordContainer).text(letter);
		getConfigByElementWithOne("distractors","words",2,
			functRight,wordSelected,wordSelected.slice(0,1))
			.then(function() {
				resolve();
			});
	})
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
		$(t).hover(function(){
			var elem = this;
			$.data(this, "timer", setTimeout($.proxy(function() {
				playSound($(elem).attr("name")); 
	        }, this), 300));
	        }, function() { clearTimeout($.data(this, "timer")); }
		);
		$(t).mouseup(function(){
			checkCorrect(this);
		});
		arrayImg.push(t);
	});
	disorder(arrayImg);
	$(imgContainer).append(arrayImg);
	addSound(letterOnly);
	$(wordContainer).mouseover(function(){
		playSound(letterOnly);
	});
}

function checkCorrect(elem) {
	var name = $(elem).attr('name');
	if(name == wordSelected) {
		$(elem).addClass("animateToFrontUpper");
		setTimeout(function() {sessionCounter();}, 1000);
	}
	else {
		playSound("wrong");
		$(elem).addClass("wrong");
		$(elem).effect('shake');
		changeScore(-10);
		waitInterval(800).then(function(){
			$(elem).removeClass("wrong");
		});
	}
}
