var conf;
var wordContainer;
var imgTemp;
var imgContainer;
function readyOk(wo,te,cont){
	wordContainer=wo;
	imgTemp=te;
	imgContainer=cont;
	conf=getConfig(8,functInit);
}

function functInit(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	wordSelected=group["1"];
	imagesSelected=group["2"];
	fillTemplate(wordSelected,imagesSelected);
}

function fillTemplate(wordSelected,imagesSelected){	
	arrayImg=[];
	$(imagesSelected).each(function(index,e){
		t=$(imgTemp).clone();
		$(t).attr('id','img'+index);
		$(t).attr('name',e);
		$(t).removeClass('temp');
		$(t).attr('src','images/activities/' + $(t).attr("name") + '.jpg');
		$(t).click(function(){
			//audio
			checkCorrect(this);
		});
		arrayImg.push(t);
	});
	disorder(arrayImg);
	$(imgContainer).append(arrayImg);
	$(wordContainer).text(wordSelected);
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
