var conf;
var wordContainer;
var imgTemp;
var imgContainer;
function readyOk(wo,te,cont){
	wordContainer=wo;
	imgTemp=te;
	imgContainer=cont;
	// conf=getConfig(8,functionInit);
	functionInit();
}

function functionCallback(conf) {
	// group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	var conf = conf[0];
	var targetWord = conf["target"] - 1;
	var values = conf["values"]
	wordSelected=values.join('').replace(/,/g, "");;
	// getConfigByElement("distractors","lev_1",2,functRight);
	getConfigByElementWithOne("distractors","lev_1",2,functRight,wordSelected);
}

function functRight(conf) {
	imagesSelected=conf;
	fillTemplate(wordSelected,imagesSelected);
}
function functionInit(){
	getConfigByElement("act8","act",1,functionCallback);
}

function fillTemplate(wordSelected,imagesSelected){	
	arrayImg=[];
	// word=wordSelected;
	// imagesSelected.unshift(wordSelected);
	$(imagesSelected).each(function(index,e){
		t=$(imgTemp).clone();
		$(t).attr('id','img'+index);
		name=e;
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
	$(wordContainer).text(wordSelected);
	$(wordContainer).mouseover(function(){
		playSound(word);
	});
}

function checkCorrect(elem){
	id=$(elem).attr('id');
	if(id=="img0"){
		$(elem).effect('puff');
		cartelFelicitaciones();
	}
	else{
		console.log(elem);
		$(elem).effect('shake');

	}
}
