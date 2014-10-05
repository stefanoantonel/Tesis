var img1=null;
var img2=null;
var contador=null;
var activityNum=0;
var activityQuantity=0;
var configuration;

function translate(target){
	$("#"+target).addClass("animateUpperCorner");
}


function removeBackground(img){
	//$(".btnMemory").css('background', 'transparent');
	$("#"+img).css('backgroundImage', 'url(images/fondo-estrellas.png)');
}	

function removeImg(img){
	//$("#"+img).remove();
	console.log("img deleted:",img);
	translate(img);
	$("#"+img).addClass('deleted');
	
}

function fillTemplate2(place,temp, elements){
	var allElements = [];
	for (var x=1; x<5; x++){
	//$(elements).each(function(ind,element){
		
		//ind=ind+1;
		
		var group = elements[x];
		for (var i=0; i<2; i++){
		//$(element).each(function(index,e){
	        t=$(temp).clone();
	        $(t).attr('id',x*10+i);
	        $(t).attr('name',group[i]);
	        $(t).prop("hidden",false);
	        $(t).css('display', 'inline');
	        //$(place).append(t);
	        allElements.push(t);
		}
		disorder(allElements);
		$(place).append(allElements);
	}
}
function stopAudio(){
	$.each($('audio'), function () {
		this.pause();
		this.currentTime = 0;
		});
}

function fillPage(elements){
	$('#alertOk').delay( 100 ).fadeOut( 400 );
	$("article").show();
	fillTemplate2("#contenedor","#template",elements);
	setImage();
}

function functInit(config,x){
	//cantidad de img que riman
	contador=4;
	//global
	configuration=config;
	fillPage(getFirstActivity(config));
}

function getFirstActivity(config) {
	activityQuantity = config.length-1;
	return elements = config[activityNum];
}

//function getNextActivity() {
//	if(activityQuantity==activityNum)
//	{cartelFelicitaciones();}
//	
//	activityNum+=1;
//}


function areEqual(im1,im2){
	console.log("compare: "+im1+" con:"+ im2);
	if(im1==im2){return false;}
	x=Math.floor(parseInt(im1)/10);
	y=Math.floor(parseInt(im2)/10);
	if(x==y){return true;}
	return false;
}

function setImage(){
	$('.imgMemory').click(function(){
		$(this).css({backgroundImage : 'url(images/activities/' + $(this).attr("name") + '.jpg)'});
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
			if(areEqual(img1,img2)){
					window.setTimeout(removeImg, 1000,img1);
					window.setTimeout(removeImg, 1000,img2);
				contador=contador-1;
				if(contador==0){
					console.log("comprar: aq con an",activityQuantity," - ",activityNum);
					window.setTimeout(congratulations, 1000);
					if(activityQuantity==activityNum)
						{endActivity();
						return;}
					contador=4;
					activityNum+=1;
					window.setTimeout(function(){$(".deleted").remove();},1000);
					window.setTimeout(fillPage, 3000,configuration[activityNum]);
					//fillPage(configuration[activityNum]);
				}
			}
			else{
			
				window.setTimeout(removeBackground, 1000,img1);
				window.setTimeout(removeBackground, 1000,img2);
			}
			img1=null;
			img2=null;
			
		}
		playSound($(this).attr("name"));
	});
}



