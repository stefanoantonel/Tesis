function readyOk(idObj,idBox,idBox2){
	//dragAndDrop(idObj,idBox,idBox2);
	
	
	temp1=document.getElementById(idObj);
	//left=document.getElementById(idBox);
	//right=document.getElementById(idBox2);
	var boxes=[idBox,idBox2];
	//var temp=$(temp1).clone();
	var temp=$(temp1);
	
	loadTxt(boxes,temp);
	
	//$('#start').click(function(){	
    	//checkCorrect();
	//});
}
/*
function drag(text, evento) {
	evento.dataTransfer.setData('id', text.id);
}	
function moveOrigin(elem) {
    var ele=$(elem).clone();
    $(ele).removeAttr('onclick');
	$('#contenedorOriginal').append(ele);
    $(elem).remove();
}

function drop(contenedor, evento) {
	var id = evento.dataTransfer.getData('id');
	//contenedor.appendChild(document.getElementById(id));
	var elem=document.getElementById(id);
	var elem2=$(elem).clone();
	$(elem2).attr('onclick', 'moveOrigin(this)');
	$('#contenedorResultado').append(elem2);
	$(elem).remove();
    checkCorrect();
   
	evento.preventDefault();
}

function appendOnDrop(contenedor, evento) {
	var id = evento.dataTransfer.getData('id');
	//contenedor.appendChild(document.getElementById(id));
	var elem=document.getElementById(id);
	var elem2=$(elem).clone();
	$(elem2).attr('onclick', 'moveOrigin(this)');
	$('#contenedorResultado').append(elem2);
	$(elem).remove();
    checkCorrect();
   
	evento.preventDefault();
}
*/
var numParts=0;

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

function divide(data){
    //divido en partes segun los espacios
    var parts=data.split(" ");
    numParts=$(parts).size();
    return parts;
}

function checkCorrect(container) {
	//console.log('checkCorr');
	//console.log(parts);
	//isFinish=isFinished(parts);
	
	if($(container).attr('id')=='rightbox'){
	
		parts=$(container).children();
		console.log(parts);
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
    var lines=data.split(/\r?\n/);
    var quantLines=$(lines).size();
    //saco un numero para decirle el indice del la palabra
    var numberRand = Math.floor(Math.random() * quantLines);
    return lines[numberRand];
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
    disorderS(a);
    $(fromBox).append(a);
   
}
function isFinished(parts){
	//console.log('isFinish');
	console.log('es igual',parts.size()==numParts);
	if (parts.size()==numParts){
		//console.log('true');
		return true;
	}
	return false;	
	
}

function write(tex){
	
	//var fs = new ActiveXObject("Scripting.FileSystemObject");
	//save_content_to_file("Hello", "C:\\test");
    //var f = File("topics.txt", 8, true);
    //f.WriteLine("This text will be added to the end of file");
    //f.Close();
}
function cartelFelicitaciones(){
	$('article').html('');
	$('#alertOk').attr('hidden',false);
}