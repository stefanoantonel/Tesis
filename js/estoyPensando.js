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
	word=wordSelected;
	$(imagesSelected).each(function(index,e){
		t=$(imgTemp).clone();
		$(t).attr('id','img'+index);
		name=e;
		$(t).attr('name',name);
		$(t).removeClass('temp');
		$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).mousedown(function(){
			try{ playSound(this.name); }
        	catch(e){ console.error('Sonido no encontrado') }
			checkCorrect(this);
		});
		arrayImg.push(t);
	});
	disorder(arrayImg);
	$(imgContainer).append(arrayImg);
	$(wordContainer).text(wordSelected);
	$(wordContainer).mouseover(function(){
		try{ playSound(word); }
        catch(e){ console.error('Sonido no encontrado') }
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
