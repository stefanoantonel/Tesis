var img1=null;
var img2=null;
var contador;
var activityNum=0;
var activityQuantity=0;
var configuration;

function removeBackground(img){
	
	$("#"+img).css('background-image', 'none');
	$("#"+img).addClass("btnMemory");
	$("#"+img).removeClass("rotateToLeft");
}	

function changeBackground(target){
	$(target).css({backgroundImage : 'url(images/activities/' + $(target).attr("name") + '.jpg)'});
}

function removeImg(img){
	$("#"+img).removeClass("rotateToLeft");
	translate("#"+img);
	$("#"+img).addClass('deleted');
}

function fillTemplate(rhymes){
	var allElements = [];
	var place = "#contenedor";
	var temp = "#template";
	for (var x=0; x<4; x++){
		var group = rhymes[x];
		for (var i=0; i<2; i++){
	        t=$(temp).clone();
	        $(t).attr('id',x*10+i);
	        var name = group[i];
	        $(t).attr('name',name);
	        addSound(name);
	        $(t).prop("hidden",false);
	        $(t).css('display', 'inline');
	        $(t).mousedown(function(){
				playSound(this.name);
			});
	        allElements.push(t);
		}
		disorder(allElements);
		$(place).append(allElements);
	}
	setImage();
}



function stopAudio(){
	$.each($('audio'), function () {
		this.pause();
		this.currentTime = 0;
		});
}

function loadActivity(level){
	contador=4;
	$('#alertOk').delay( 100 ).fadeOut( 400 );
	$("article").show();
	config = getConfigByElement("rhymes",level,4,fillTemplate);
}

function functionInit(counter){
	level = "lev_1";
	if(counter==1){
		level="lev_2";
	}
	loadActivity(level);
	getConfig(1);
}


function areEqual(im1,im2){
	console.log("compare: "+im1+" con:"+ im2);
	if(im1==im2){return false;}
	x=Math.floor(parseInt(im1)/10);
	y=Math.floor(parseInt(im2)/10);
	if(x==y){return true;}
	return false;
}


function checkImg(img1,img2){
	if(areEqual(img1,img2)){
		window.setTimeout(removeImg, 1000,img1);
		window.setTimeout(removeImg, 1000,img2);
		contador=contador-1;
		if(contador==0){
			window.setTimeout(sessionCounter,1000);
		}
	}
	else{
	
		window.setTimeout(removeBackground, 1500,img1);
		window.setTimeout(removeBackground, 1500,img2);
	}
}

function setImage(){
	$('.imgMemory').click(function(){
		$(this).addClass("rotateToLeft");
		changeBackground(this);
		if(img1==null){
			img1=$(this).attr("id");
			
			}
		else{
			if(img2!=null)
				{
				removeImg(img1);
				removeImg(img2);
				return;
				}
			img2=$(this).attr("id");
			checkImg(img1,img2);
			img1=null;
			img2=null;
		}
		playSound($(this).attr("name"));
	});
}



