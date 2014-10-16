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
	$("#"+img).css('backgroundImage', 'url(images/fondo-estrellas.png)');
}	

function removeImg(img){
	console.log("img deleted:",img);
	translate(img);
	$("#"+img).addClass('deleted');
}

function fillTemplate(rhymes){
	var allElements = [];
	var place = "#contenedor";
	var temp = "#template";
	for (var x=0; x<4; x++){
		var group = rhymes[x];
		console.log("group:",group);
		for (var i=0; i<2; i++){
	        t=$(temp).clone();
	        $(t).attr('id',x*10+i);
	        $(t).attr('name',group[i]);
	        $(t).prop("hidden",false);
	        $(t).css('display', 'inline');
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

//function fillPage(elements){
//	$('#alertOk').delay( 100 ).fadeOut( 400 );
//	$("article").show();
//	fillTemplate2("#contenedor","#template",elements);
//	setImage();
//}

function loadActivity(){
	contador=4;
	$('#alertOk').delay( 100 ).fadeOut( 400 );
	$("article").show();
	config=getConfigByElement("rhymes","lev_1",4,fillTemplate);
}

function functInit(){
	loadActivity();
	getConfig(1);
}

//function getFirstActivity(config) {
//	activityQuantity = config.length-1;
//	return elements = config[activityNum];
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
						passed();
						window.setTimeout(congratulations, 1000);
						window.setTimeout(function(){$(".deleted").remove();},1000);
						window.setTimeout(functInit, 3000);
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



