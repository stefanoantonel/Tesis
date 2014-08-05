var boxes;
var temp;

function readyOk(idObj,idBox,idBox2){
	temp1=document.getElementById(idObj);
	boxes=[idBox,idBox2];
	temp=$(temp1);
	//loadTxt(boxes,temp);
	var conf;
	conf=getConfig(2,callback);
}

function callback(data){
	
	var selectedText=getTextRand(data);
	var parts=divide(selectedText);
	numParts=$(parts).size();

	fillTemplate(boxes,temp,parts);
	//parts=$("#leftbox").children();
	parts=$("#"+boxes[0]).children('span');
	box=[$("#"+boxes[0]), $("#"+boxes[1])];
	dragAndDrop(parts,box,functionsDD); 
}

function functionsDD(context,currElem){
	isCorrect=checkCorrect(context);
	if (isCorrect==true){cartelFelicitaciones();}
}

var numParts=0;
/*
function loadTxt(boxes,temp){
	$.ajax({
        url : "test.txt",
        dataType: "text",
        async: false,
        success : function (data) {
        	var selectedText=getTextRand(data);
        	var parts=divide(selectedText);
        	numParts=$(parts).size();
   
        	fillTemplate(boxes,temp,parts);
        	dragAndDrop(parts,boxes); 
        }
    });
}
*/

function divide(data){
    //divido en partes segun los espacios

    var parts=data.split(" ");
    numParts=$(parts).size();
    return parts;
}

function checkCorrect(container) {
	if($(container).attr('id')=='rightbox'){
	
		parts=$(container).children();
		
		mal=0;
		for(var i = 0; i < $(parts).size(); i++){ 
			//console.log('part id',parseInt(parts[i].id),'   i',i);
			if (parseInt(parts[i].id) != i){
				//console.log($('#'+parts[i].id));
				$('#'+parts[i].id).addClass('errorLetra');
				mal=1;
			}
		}
		
		if(parts.size()==numParts && mal==0){ //finalizo y correcto 
			return true;
		}
		else
			return false;
	}
	else{
		$(container).children().removeClass('errorLetra');
	}
}

function getTextRand(data){
	
    //var lines=data.split(/\r?\n/);
    //var quantLines=$(lines).size();
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
        t=$(temp).clone();
        $(t).attr('id',index);
        $(t).html(part);
        $(t).prop("hidden",false);
        //console.log(t);
        //a.push(t);
        a.push(t);
        //dragAndDrop(index,"leftbox","rightbox");
    });
    disorder(a);
    $(fromBox).append(a);
   
}
function isFinished(parts){
	//console.log('isFinish');
	//console.log('es igual',parts.size()==numParts);
	if (parts.size()==numParts){
		//console.log('true');
		return true;
	}
	return false;	
	
}

function cartelFelicitaciones(){
	$('article').html('');
	$('#alertOk').attr('hidden',false);
}