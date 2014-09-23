var target;
var imgTemp;
var imgContainer;
var completeWord;
var part;

function readyOk(targ,imgT,cont,complete,p){
	target=targ;
	imgTemp=imgT;
	imgContainer=cont;
	completeWord=complete;
	part=p;

	conf=getConfig("10",randomGroup);
}

function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	wordSelected=group["word"]; 
	wordToChange=group["wordToChange"]; //in number
	images=group["images"];
	fillTemplateWord(wordSelected,wordToChange);
	fillTemplateImages(images);
	images=imgContainer.children();
	dragAndDrop(images,target,functionsDD);
}

function fillTemplateWord(wordComplete,wordToChange){
	originWord=wordComplete.join('');
	$(completeWord).text(originWord);
	partSelected=$(wordComplete)[wordToChange-1];
	$(part).text(partSelected);
}

function fillTemplateImages(images){
	imgs=[];
	$(images).each(function(index,e){
    	t=$(imgTemp).clone();
		name=e;
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
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){cartelFelicitaciones();}
}

function checkCorrect(img) {
	num=$(img).attr("num");
	if(num==0){
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