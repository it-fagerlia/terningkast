// Global variable used in script file
var ctx;

function tegnStolperVertikalt(title,xData,yData,antall,cvx,cvy,widthPx,yScale){
	var x,y,barHeight;
  
	x = cvx;
	tegnTekst(title,cvx,25,"18px Arial");	// Tittel på diagrammet
	for (var i = 0; i < antall; i++){
		barHeight = yData[i]*yScale;
		y = cvy - barHeight;
		tegnFyltFirkant(x,y,widthPx,barHeight,"magenta");
		tegnTekst(String(xData[i]),x+0.5*widthPx,cvy+14,"12px Arial")	;	// X-verdi på stolpen
		tegnTekst(String(yData[i]),x+0.3*widthPx,y-14,"12px Arial");		// Y-verdi på stolpen
		x = x + 2*widthPx;
	}
}

function tegnTekst(tekst,x,y,font){
	ctx.font = "12px Arial" ;
	ctx.font = font;
	ctx.fillStyle = "black" ;
	ctx.textAlign = "left"  ;  // Can be left/rigth/center
	ctx.fillText(tekst,x,y)  ; // Alternative method strokeText
}

function roterCanvas(angle){
	ctx.rotate((angle/360)*2*Math.PI);
}
function tegnFirkant(x,y,bredde,hoyde,farge){
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = farge;
	
	ctx.moveTo(x,y);
	ctx.lineTo(x+bredde,y);
	ctx.lineTo(x+bredde,y+hoyde);
	ctx.lineTo(x       ,y+hoyde);
	ctx.lineTo(x,y);
	ctx.stroke();
}
 
function tegnFyltFirkant(x,y,bredde,hoyde,farge){
	ctx.beginPath();
	ctx.fillStyle = farge;
	
	ctx.moveTo(x,y);
	ctx.lineTo(x+bredde,y);
	ctx.lineTo(x+bredde,y+hoyde);
	ctx.lineTo(x       ,y+hoyde);
	ctx.lineTo(x,y);
	ctx.fill();
}
function tegnFyltTrekantA(x,y,bredde,hoyde,farge){
	ctx.beginPath();
	ctx.fillStyle = farge;
	
	ctx.moveTo(x,y);
	ctx.lineTo(x+bredde,y);
	ctx.lineTo(x+bredde,y+hoyde);
	ctx.lineTo(x,y);
		
	ctx.fill();
}
function tegnFyltTrekantB(x,y,bredde,hoyde,farge){
	ctx.beginPath();
	ctx.fillStyle = farge;
	
	ctx.moveTo(x,y);
	ctx.lineTo(x+bredde,y+hoyde);
	ctx.lineTo(x       ,y+hoyde);
	ctx.lineTo(x,y);
		
	ctx.fill();
}

function tegnFyltPolyLinje(x,y,antall,farge){
	 
	ctx.beginPath();
	ctx.fillStyle = farge;
		
	ctx.moveTo(x[0],y[0]); // Flytt til første punkt
	
	for (var i=1; i<=( antall-1); i++){
		ctx.lineTo(x[i],y[i]); // Tegn linje til de neste punktene
	}	 
	ctx.lineTo(x[0],y[0]); // Lukk ploygonet
	ctx.fill(); // og fyll med farge
}
function tegnRegulærMangekant(xs,ys,radius,antall,farge){
	var x=[],y=[],angle,dAngle;
	
	angle = 0.;
	dAngle = (2*Math.PI)/antall;
	for (i=0; i<=(antall-1);i++){
		x[i] = xs+radius*Math.cos(angle);
		y[i] = ys+radius*Math.sin(angle);
		angle = angle + dAngle;
	}
	tegnFyltPolyLinje(x,y,antall,farge);
}


function tilfeldigFigur(){
	var x,y,bredde,hoyde,indeks,type;
	
	x =  Math.random()*500;
	y =  Math.random()*500;
	bredde =  Math.random()*150;
	hoyde  =  Math.random()*150;
	indeks =  Math.floor(Math.random()* farger.length);
	type = Math.random();
	
	if (type  < 0.20) {
		tegnFirkant(x,y,bredde,hoyde,farger[indeks]);
	}
	else if (type>= 0.20 && type < 0.40 ) {
		tegnFyltFirkant(x,y,bredde,hoyde,farger[indeks]);
	}
	else if (type>= 0.40 && type < 0.50 ) {
		tegnFyltTrekantA(x,y,bredde,hoyde,farger[indeks]);
	}
	else if (type>= 0.50 && type < 0.60 ) {
		tegnFyltTrekantB(x,y,bredde,hoyde,farger[indeks]);
	}
	else if (type>= 0.60 && type < 1.00 ) {
		var numSider = 3;
		if (indeks > 3 ) numSider = indeks;
		tegnRegulærMangekant(x,y,bredde,numSider,farger[indeks]);
	}
	
}