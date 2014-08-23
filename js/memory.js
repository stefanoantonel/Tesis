var img1=null;
var img2=null;
var contador=null;

function removeBackground(img){
	$(".btnMemory").css({backgroundImage:'none'});
	
}

function removeImg(img){
	$("#"+img).remove();
}


/*function fillTemplate2(place,temp, elemets){

    $(elemets).each(function(index,e){
        t=$(temp).clone();
        $(t).attr('id',e);
        $(t).prop("hidden",false);
        //$(t).css('display', 'block');
        $(t).css('display', 'inline');
        $(place).append(t);
       // $(place).append("<br/>");
        
    });
}
*/

function fillTemplate2(place,temp, config){
	var elements = config[0];
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

function functInit(conf,x){
	
	//Arreglar
	contador=4;
	//desordenado=disorder(conf)
	fillTemplate2("#contenedor","#template",conf)
	setImage();
	 
	/* $(".btnMemory").click(function(){
		stopAudio();	
		$(this).find("audio")[0].play();
	});
	$("#pause").click(function(){
		stopAudio();
	});
	 */
}

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
			console.log("valor:"+$(this));
			}
		else{
			img2=$(this).attr("id");
			if(areEqual(img1,img2)){
					window.setTimeout(removeImg, 1000,img1);
					window.setTimeout(removeImg, 1000,img2);
				contador=contador-1;
				if(contador==0){
					cartelFelicitaciones();
					console.log("cartel");
					//$("#alertOk").delay( 1100 ).fadeIn( 400 )
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
	});
}


	

