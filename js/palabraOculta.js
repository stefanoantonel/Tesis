function readyOk(idObj,left,right){
	//dragAndDrop(idObj,idBox,idBox2);
	
	
	dragAndDrop4(right,idObj);
	fill(idObj,left,right);
}

var numParts=0;

function fill(idObj,left,right){
	conf=getConfig("4-1",functInit1);
	conf=getConfig("4-2",functInit2);
}

function functInit1(conf,x){
	console.log("Configuracion:",conf);
	
	fillTemplate4("#contenedor","#template",desordenado)
	setImage();
}
function functInit2(conf,x){
	console.log("Configuracion:",conf);
	contador=conf.length/2;
	desordenado=disorder(conf)
	fillTemplate4("#contenedor","#template",desordenado)
	setImage();
}


function fillTemplate4(place,temp, elemets){

    $(elemets).each(function(index,e){
        t=$(temp).clone();
        //$(t).attr('id',e);
        //$(t).prop("hidden",false);
        //$(t).css('display', 'block');
        $(t).css('display', 'inline');
        $(place).append(t);
       // $(place).append("<br/>");
        
    });
}

function setImage(){

	$(this).css({backgroundImage : 'url(images/imgOculta/' + $(this).attr("id") + '.jpg)'});
	if(img1==null){
		img1=$(this).attr("id");
		console.log("valor:"+$(this));
		}
	else{
		img2=$(this).attr("id");
		if(areEqual(img1,img2)){
			alert("Muy bien");
			$('#'+img1).remove().delay( 800 );
			$('#'+img2).remove();
			contador=contador-1;
			if(contador==0){
				$("#alertOk").attr("hidden", false);
			}
		}
		else{
			console.log('img1:',img1)
			console.log($('#'+img1))
			window.setTimeout(removeBackground, 1000,img1);
		}
		img1=null;
		img2=null;
		
	}

}

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

}