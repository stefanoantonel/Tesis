var img1=null;
var img2=null;
var contador=null;
var activityNum=0;
var activityQuantity=0;
var configuration;

function removeBackground(img){
	$(".btnMemory").css({backgroundImage:'none'});
	
}

function removeImg(img){
	//$("#"+img).remove();
	console.log("img deleted:",img);
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
	fillTemplate2("#contenedor","#template",elements);
	setImage();
}

function functInit(configuration,x){
	//cantidad de img que riman
	contador=4;
	fillPage(getFirstActivity(configuration));
}

function getFirstActivity(configuration) {
	activityQuantity = configuration.length-1;
	return elements = configuration[activityNum];
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
					if(activityQuantity==activityNum)
						{cartelFelicitaciones();}
					contador=4;
					activityNum+=1;
					window.setTimeout(function(){$(".deleted").remove();},1000);
					window.setTimeout(fillPage, 1000,configuration[activityNum]);
					//fillPage(configuration[activityNum]);
				}
			}
			else{
			
				window.setTimeout(removeBackground, 1000,img1);
			}
			img1=null;
			img2=null;
			
		}
		playSound($(this).attr("name"));
	});
}



