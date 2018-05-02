$(document).ready(function(){
	var cvs = document.getElementById("canvas");
	var ctx = cvs.getContext("2d");
	Comida.gerar();
});


let Grid = {	
	tamanhoDaCelula: 25,
	minCelulasX: 0,
	maxCelulasX: 19,
	minCelulasY: 0,
	maxCelulasY: 19
}

let Snake = {
	x: 0,
	y: 0,
	velocidadeX: 1,
	velocidadeY: 0,
	largura: 25,
	altura: 25,
	tamanho: 25,
	dir: "direita",

	mostrar: function(){
		ctx.fillStyle = "green";
		ctx.fillRect(Snake.x, Snake.y, Snake.largura, Snake.altura);
	},

	mover : function() {	 
		if(this.dir == "esquerda"){
    	this.x -= this.velocidadeX * this.tamanho;
  	}
  	if(this.dir == "cima"){
    	this.y -= this.tamanho;
  	}
  	if(this.dir == "baixo"){
    	this.y += this.tamanho;
  	}
  	if(this.dir == "direita"){
    		this.x += this.velocidadeX * this.tamanho;
  	}
  }

}

document.addEventListener("keydown", pegarEntrada);
function pegarEntrada(event){
	if(event.keyCode== 37){
		Snake.dir = "esquerda";
	}
	else if(event.keyCode== 38){
		Snake.dir = "cima";
	}
	else if(event.keyCode== 39){
		Snake.dir = "direita";
	}
	else if(event.keyCode== 40){
		Snake.dir = "baixo";
	}
}

let Comida = {
	x: 0,
	y: 0,
	largura: 25,
	altura: 25,
	tamanho: 25,

	mostrar: function(){
		ctx.fillStyle = "red";
		ctx.fillRect(Comida.x, Comida.y, Comida.largura, Comida.altura);
	},

	gerar: function(){
		this.x = Math.floor(Math.random()* Grid.maxCelulasX + Grid.minCelulasX) * this.tamanho;
		this.y = Math.floor(Math.random()* Grid.maxCelulasY + Grid.minCelulasY) * this.tamanho;
		return "X: "+ this.x +"   Y: "+this.y;
	}
}

function mostrarDistancia(xA, yA, xB, yB){
	return Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
}

function atualizar(){
	desenhar();
}

function desenhar(){
	cvs = document.getElementById("canvas");
	ctx = cvs.getContext("2d");
	
	Snake.mostrar();

	//para mover basta tira o comentario da linha abaixo.
	//Snake.mover(Snake.dir);

	Comida.mostrar();
}

setInterval(atualizar, 100);