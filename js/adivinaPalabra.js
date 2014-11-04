var boxes;
var temp;
var img;
var selectedText = '';
var origin = '';
var counter = 2; 

function readyOk(){
	idObj="template";
	idBox="leftbox";
	idBox2="rightbox";
	imgDemo="demo";
	
	temp1=document.getElementById(idObj);
	boxes=[idBox,idBox2];
	temp=$(temp1);
	//var conf;
	img=imgDemo;
}
function functionInit() {
	getConfigByElement("act2","act",1,functionCallback);
	readyOk();
	getConfig(2);
}

function functionCallback(data){
	selectedText=getTextRand(data);
	var parts=divide(selectedText);
	numParts=$(parts).size();

	fillTemplate(boxes,temp,parts);

	//dragAndDrop(parts,boxes,functionsDD); 

	imgDemo=$("."+img);
	fillImg(imgDemo,parts);
	//parts=$("#leftbox").children();
	parts=$("#"+boxes[0]).children('.syllable');
	box=[$("#"+boxes[0]), $("#"+boxes[1])];
	dragAndDrop(parts,box,functionsDD);
	returnPart(parts);
	
}

function functionsDD(context,currElem){
	isCorrect=checkCorrect(context);
	if (isCorrect==true){
		playSound(origin);
		// $(document).delay(400);
		sessionCounter(counter);
	}
}

function returnPart(parts){

	$(parts).click(function(){
		id=$(this).parent('div').attr("id");
		if (id==boxes[1]){
			$("#"+boxes[0]).append(this);
			checkCorrect($("#"+boxes[0]))
		}
	});
}

var numParts=0;

function divide(data){
    //divido en partes segun los espacios
    var parts=data.split(" ");
    numParts=$(parts).size();
    return parts;
}

function checkCorrect(container) {
	if($(container).attr('id')=='rightbox'){
		
		parts=$(container).children();

		wrong=0;
		for(var i = 0; i < $(parts).size(); i++){ 
			if (parseInt(parts[i].id) != i){
				wrongPart=$('#'+parts[i].id)
				$(wrongPart).addClass('errorLetra');
				wrong=1;
				$(wrongPart).effect('shake');

			}
			else{//the word is correct
				wrongPart=$('#'+parts[i].id);
				$(wrongPart).removeClass('wrong');
			}
		}
		if(parts.size()==numParts && wrong==0){ //finalizo y correcto 
			return true;
		}
		else
			return false;
	}
	else{
		
		$(container).children().removeClass('errorLetra');
		checkCorrect($('#rightbox'));
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
        t=$(temp).clone();
        $(t).attr('id',index);
        $(t).addClass('deleted');
        $(t).html(part);
        $(t).prop("hidden",false);
        part1=part;
        $(t).mousedown(function(){
        	playSound($(this).html()); 
        });
        a.push(t);
    });
    //-------------disorder 
    origin=parts.join('');
    disorder(a);
    disordered=$(a).text();
    if(origin==disordered){
    	disorder(a);
    }
    //-------------------end disroder 

    $(fromBox).append(a);
}

function isFinished(parts){	
	if (parts.size()==numParts){
		return true;
	}
	return false;
}

function fillImg(elem,parts){
	word=parts.join("");
	$(elem).attr('src','images/activities/' + word + '.jpg');
}