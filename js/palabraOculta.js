function readyOk(idObj,idBox,idBox2){
	//dragAndDrop(idObj,idBox,idBox2);
	
	
	temp1=document.getElementById(idObj);
	left=document.getElementById(idBox);
	right=document.getElementById(idBox2);
	var boxes=[idBox,idBox2];
	var temp=$(temp1).clone();
	
	
	$('#start').click(function(){	
		loadTxt(boxes,temp);
    	//checkCorrect();
	});
	
}
function readyOk1(idObj,idBox){
	//dragAndDrop(idObj,idBox,idBox2);
	
	
	target=document.getElementById(idObj);
	left=document.getElementById(idBox);
	
	var boxes=[idBox];
	var target1=$(target).clone();
	$(target).draggable();
	dragAndDrop3(target,boxes);
	
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

function getTextRand(data){
    var lines=data.split(/\r?\n/);
    var quantLines=$(lines).size();
    //saco un numero para decirle el indice del la palabra
    var numberRand = Math.floor(Math.random() * quantLines);
    return lines[numberRand];
}


function fillTemplate(boxes,spanTemp, parts){
	//relleno el template
	fromBox=$('#'+boxes[0]); //el de origen 
	var a=[];
	
    $(parts).each(function(index,part){
    	
        t=$(spanTemp).clone();
        
        $(t).attr('id',index);
        $(t).html(part+' ');
        $(t).prop("hidden",false);
        console.log(t);
        //a.push(t);
        
        a.push(t);
        
        
        //dragAndDrop(index,"leftbox","rightbox");
        
        
    });
    disorderS(a);
    $(fromBox).append(a);
   
}
function isFinished(parts){
	console.log('isFinish');
	if (parts.size()==numParts){
		console.log('true');
		return true;
	}
	else{	console.log('fla'); return false;	}
}

function write(tex){
	
	//var fs = new ActiveXObject("Scripting.FileSystemObject");
	//save_content_to_file("Hello", "C:\\test");
    //var f = File("topics.txt", 8, true);
    //f.WriteLine("This text will be added to the end of file");
    //f.Close();
}