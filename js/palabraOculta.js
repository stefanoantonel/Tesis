var leftArray=0
var rightArray=0
var numParts=0;

function functionsDD(context,currElem){
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){cartelFelicitaciones();}
}

function readyOk(idObj,left,right){
	conf=getConfig("4",randomGroup);
}

function randomGroup(conf){
	group=disorder(conf)[0];//elijo el primero porque estan todos desordenados ya
	left=group["1"];
	right=group["2"];
	functInit1(left); //paso el array solamente 
	functInit2(right); //paso el array solamente para desordenar
	contRight=$('#rightContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
	//loadDescription(conf.description);
}

//sin desordenar
function functInit1(conf,x){	
	$(conf).each(function(index,e){
		t=$('#leftboxTemp').clone();
		$(t).attr('id','left'+index);
		$(t).attr('name',conf[index]);
		$(t).removeAttr('hidden');
		$(t).attr('src','images/activities/' + $(t).attr("name") + '.jpg');
		$('#leftContainer').append(t);
	});
}

function functInit2(conf,x){
	imgs=[];
	$(conf).each(function(index,e){
    	t=$('#rightboxTemp').clone();
		$(t).attr('id',index);
		$(t).removeAttr('hidden');
		$(t).attr('name',conf[index]);
		$(t).prop('num',index);
		$(t).attr('src','images/activities/' + $(t).attr("name") + '.jpg');
		imgs.push(t);
	});
	disorder(imgs);
	$("#rightContainer").append(imgs);
}

function checkCorrect(part) {
	num=$(part).prop("num");
	if(num==0){
		return true;
	}
	else{
		$(part).effect('shake');
		$(part).css('border-color','red');
		return false;
	}
}

function checkReplace(box,newDiv){
	if( $(box).has('img') ){
		prevDiv=$(box).children();
		$(prevDiv).css('border-color','black');
		$('#rightContainer').append(prevDiv);
		$(box).append(newDiv);
	}
}