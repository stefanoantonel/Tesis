/* global idObj,idBox2,idBox,imgDemo,temp1 */
var boxes;
var temp;
var img;
var selectedText = '';
var origin = '';
var actualPosition;
var numParts;

function readyOk(){
	idObj="template";
	idBox="leftbox";
	idBox2="rightbox";
	imgDemo="demo";
	
	temp1=document.getElementById(idObj);
	boxes=[idBox,idBox2];
	temp=$(temp1);
	img=imgDemo;
}
function functionInit(counter,level) {
	getConfigByElement("distractors","letters",4,functionCallback);
	readyOk();
	getConfig(18);
	actualPosition = 0;
	return new Promise(function(resolve, reject) {
		resolve();
	});
}

function functionCallback(data){
	//selectedText=getTextRand(data);
	var parts=divide(data);
	numParts=$(parts).size();
	fillTemplate(boxes,temp,parts);
	//imgDemo=$("."+img);
	//fillImg(imgDemo,parts);
	parts=$("#"+boxes[0]).children('.syllable');
	dragAndDrop(parts,$("#"+boxes[1]),checkSyllable,moveToTarget);
	
}

function checkSyllable(context,currElem){
	isCorrect=checkCorrect(context,currElem);
	if (isCorrect==true){
		playSound(origin);
		sessionCounter(counter);
	}
}

function moveToTarget(elem) {
	if($(elem).parent().attr("id") == "leftbox") {
		$(rightbox).append(elem);
		checkSyllable(rightbox,elem);
	}
	
	
}

function divide(data){
    //divido en partes segun los espacios
    var parts=data.splice(",");
    numParts=$(parts).size();
    return parts;
}

function checkCorrect(container,element) {
	var parts = $(container).children();
	var stack = [];
	var numLetter = 0;
	for (var i = 0; i < parts.length; i++) {
		if( $(parts[i]).html() != wordCorrect[i].toUpperCase() ) {
			$(element).removeClass('normal');
			$(element).addClass('wrong');
			$(element).effect('shake');
			window.setTimeout(moveOrigin, 600,element,"#"+idBox);
			return false;		
		}
		numLetter = numLetter + 1;
    	//stack.push( $(parts[i]).html() );
    }
	
	if(numParts == numLetter){
		return true;
	}

	
}	
	

function getTextRand(data){
	var quantLines=$(data).size();
    //saco un numero para decirle el indice del la palabra
    var numberRand = Math.floor(Math.random() * quantLines);
    return data[numberRand];
}

function fillTemplate(boxes,temp, parts){
	//relleno el template
	fromBox=$('#'+boxes[0]); //el de origen 
	var a=[];
	
    $(parts).each(function(index,part){
        var t=$(temp).clone();
        $(t).attr('id',index);
        $(t).addClass('deleted');
        part = part.toUpperCase();
        $(t).html(part);
        addSound(part);
        $(t).prop("hidden",false);
        part1=part;
        $(t).hover(function(){
			var elem = this;
			$.data(this, "timer", setTimeout($.proxy(function() {
				playSound($(elem).html()); 
	        }, this), 300));
	        }, function() { clearTimeout($.data(this, "timer")); }
		);
        a.push(t);
    });
	
	
    //-------------disorder 
    origin=parts.join('');
    origin = origin.toUpperCase();
    do{
    	disorder(a);
        disordered=$(a).text();
    }while(origin==disordered);
    
    //-------------------end disroder 

    $(fromBox).append(a);
	
	//Slice to avoid mutate the array. Obtain the word in order.
	wordCorrect = parts.slice(0).sort();
}

function fillImg(elem,parts){
	word=parts.join("");
	$(elem).attr('src','images/activities/' + word + '.jpg');
}