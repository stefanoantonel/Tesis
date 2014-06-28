var leftArray=0
var rightArray=0
var numParts=0;

function readyOk(idObj,left,right){
	//dragAndDrop(idObj,idBox,idBox2);
	
	leftArray=left;
	rightArray=right;	
	dragAndDrop4(right,idObj);
	fill(idObj,left,right);
}


function fill(idObj,left,right){
	conf=getConfig("4-1",functInit1);
	conf=getConfig("4-2",functInit2);
}

function functInit1(conf,x){
	//sin desordenar
	$(leftArray).each(function(index,e){
		t=$('#'+e);
		$(t).attr('name',conf[index]);
		$(t).attr('src','images/imgOculta/' + $(t).attr("name") + '.jpg');
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
	});

}
function functInit2(conf,x){
	desordenado=disorder(conf)
	$(desordenado).each(function(index,e){
    	t=$('#'+rightArray[index]);
		$(t).attr('name',conf[index]);
		//$(t).css({backgroundImage : 'url(images/imgOculta/' + $(t).attr("name") + '.jpg)'});
		$(t).attr('src','images/imgOculta/' + $(t).attr("name") + '.jpg');
	});
}



function checkCorrect(parts) {
	console.log('checkCorr');
	console.log(parts);
	isFinish=isFinished(parts);
	if(isFinish==true){
		var ids=[];
		$(parts).each(function(ind,part){
			ids.push(part.id);
		});
		for(var i =1; i< ids.length; i++)
			if (ids[i-1] > ids[i]) return false;
		return true;
	}
	else{	return false;	}
	
}

function isFinished(parts){
	console.log('isFinish');
	if (parts.size()==numParts){
		console.log('true');
		return true;
	}
	else{	console.log('fla'); return false;	}
}
