/// <reference path="../typings/jquery/jquery.d.ts"/>
/* global idMiddleBox,idTopBox,idBottomBox */
/* global idObj,idBox2,idBox,imgDemo,temp1 */
var boxes;
var temp;
var img;
var selectedText = '';
var origin = '';
var actualPosition;
var numParts;
var enableTop = false;
var enableMiddle = true;
var enableBottom = false;
var stageCorrect = 0;
var syllables;
var originChangable;
var nextOrigin;

function readyOk(){
	idObj = "template";
	idTopBox = "topbox";
	idMiddleBox = "middlebox";
	idBottomBox = "bottombox";
	imgDemo="demo";
	
	temp1=document.getElementById(idObj);
	boxes=[idTopBox,idMiddleBox,idBottomBox];
	temp=$(temp1);
	img=imgDemo;
	originChangable = $("#"+idTopBox);
	nextOrigin = $("#"+idMiddleBox);
	return new Promise(function(resolve, reject) {
		resolve();
	});
}
function functionInit(counter,level) {
	return new Promise(function(resolve, reject) {
		if(level==null){
			level="lev_1";
		}
		if(counter == 1){
			level="lev_3";
		}
		
		readyOk()
		.then(function() {
			return getConfigByElement("words",level,1,null);
		})
		.then(function(data) {
			return functionCallback(data);
		});
		getConfig(19);
		actualPosition = 0;
		
		resolve();
	});
}

function functionCallback(data){
	if(stageCorrect == 0) {
		syllables = data;
		var parts=divideLetters(data);
		numParts=$(parts).size();
		fillTemplate(idTopBox,temp,parts);
		imgDemo=$(".demo");
		fillImg(imgDemo,parts);
		boxesAll = [$("#"+idTopBox),$("#"+idMiddleBox),$("#"+idBottomBox)];
		parts=$("#"+idTopBox).children('.syllable');
		dragAndDrop(parts,boxesAll,checkSyllable,moveToTarget);
		$("#"+idMiddleBox).addClass("loadEnable");	
	}
	if(stageCorrect == 1) {
		var parts=divideSyllables(data);
		numParts=$(parts).size();
		fillTemplate(idMiddleBox,temp,parts);
		boxesAll = [$("#"+idTopBox),$("#"+idMiddleBox),$("#"+idBottomBox)];
		parts=$("#"+idMiddleBox).children('.syllable');
		dragAndDrop(parts,boxesAll,checkSyllable,moveToTarget);
		$("#"+idBottomBox).addClass("loadEnable");	
	}	
}

function checkSyllable(context,currElem){
	var isCorrect=checkCorrect(context,currElem);
	if (isCorrect==true && stageCorrect == 1){
		var parts = $("#"+idMiddleBox).children(".syllable").clone();
		disorder(parts);
		window.setTimeout(disorderTheBox,1000,idMiddleBox,parts);
		
	}
	if (isCorrect==true && stageCorrect == 2){
		playSound(origin);
		sessionCounter(counter);
		stageCorrect = 0;
	}
}

function disorderTheBox(box,parts) {
	
	//document.getElementById(box).innerHTML = parts
	$("#"+box).children().slideUp(10).delay( 200 );
	$("#"+box).html("");
	changeStage(box,parts);
	$("#"+box).children().slideUp(200).fadeIn( 600 );
	
	
}
function changeStage(box,parts) {
	$("#"+idTopBox).addClass("disable");
	$("#"+idMiddleBox).removeClass("enable");
	$("#"+idBottomBox).removeClass("disable");
	$("#"+idBottomBox).addClass("enable");
	$("#"+idBottomBox).addClass("loadEnable");
	//dragAndDrop(parts,boxesAll,checkSyllable,moveToTarget);
	functionCallback(syllables);
	originChangable = $("#"+idMiddleBox);
	nextOrigin = $("#"+idBottomBox);
}

function moveToTarget(elem) {
	if($(elem).parent().attr("id") == $(originChangable).attr("id")) {
		$(nextOrigin).append(elem);
		checkSyllable(nextOrigin,elem);
	}
}

function divideLetters(data){
    //divide the parts in letters for the first box.
    var parts = data.toString().replace(/\s/g, '').split("");
    numParts=$(parts).size();
    return parts;
}
function divideSyllables(data){
    var parts=data.toString().split(" ");
    numParts=$(parts).size();
    return parts;
}

function checkCorrect(container,element) {
	var parts = $(container).children();
	var stack = [];
	var numLetter = 0;
	for (var i = 0; i < parts.length; i++) {
		if( $(parts[i]).html() != wordCorrect[i].toUpperCase() ) {
			$(element).addClass('wrong');
			$(element).effect('shake');
			window.setTimeout(moveOrigin, 600,element,originChangable);
			return false;		
		}
		numLetter = numLetter + 1;
    	//stack.push( $(parts[i]).html() );
    }
	
	if(numParts == numLetter){
		stageCorrect = stageCorrect + 1;
		return true;
	}
}	

function getTextRand(data){
	var quantLines=$(data).size();
    //saco un numero para decirle el indice del la palabra
    var numberRand = Math.floor(Math.random() * quantLines);
    return data[numberRand];
}

function fillTemplate(box,template, parts){
	//relleno el template
	fromBox=$('#'+box); //el de origen 
	var a=[];
	
    $(parts).each(function(index,part){
        var t=$(template).clone();
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
	wordCorrect = parts;
}

function fillImg(elem,parts){
	var word=parts.join("");
	$(elem).attr('src','images/activities/' + word + '.jpg');
}