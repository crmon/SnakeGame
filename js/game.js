$(document).ready(function(){
	var cvs = document.getElementById("canvas");
	var ctx = cvs.getContext("2d");
	Comida.gerar();
});


let Grid = {	
	x: 0,
	y: 0,
	tamanhoDaCelula: 25,
	minCelulasX: 0,
	maxCelulasX: 19,
	minCelulasY: 0,
	maxCelulasY: 19,
	largura: 500,
	altura: 500,

	mostrar: function(){
		ctx.fillStyle = "#3a3335";
		ctx.fillRect(Grid.x, Grid.y, Grid.largura, Grid.altura);
		ctx.strokeStyle = "black";
		ctx.strokeRect(Grid.x, Grid.y, Grid.largura, Grid.altura);
	}
}

let Snake = {
	x: 0,
	y: 0,
	largura: 25,
	altura: 25,
	tamanho: 25,
	dir: "direita",
	total: 0,

	mostrar: function(){
		ctx.fillStyle = "#63c132";
		ctx.fillRect(Snake.x, Snake.y, Snake.largura, Snake.altura);
		ctx.strokeStyle = "black";
		ctx.strokeRect(Snake.x, Snake.y, Snake.largura, Snake.altura);
	},

	mover : function() {	 
		if(this.dir == "esquerda"){
    	this.x -= this.tamanho;
  	}
  	if(this.dir == "cima"){
    	this.y -= this.tamanho;
  	}
  	if(this.dir == "baixo"){
    	this.y += this.tamanho;
  	}
  	if(this.dir == "direita"){
    		this.x += this.tamanho;
  	}
  },

  comer: function(){
  	this.total++;
  	Comida.gerar();
  },

	checarLimiteDaTela: function (){
		if(this.x < 0){
			this.alterarPos(500, this.y, "esquerda");
		}
		if(this.x > 500){
			this.alterarPos(0, this.y, "direita");
		}
		if(this.y < 0){
			this.alterarPos(this.x, 500, "cima");
		}
		if(this.y > 500){
			this.alterarPos(this.x, 0, "baixo");
		}
	},

	alterarPos: function(posX, posY, direcao){
		this.x = posX;
		this.y = posY;
		this.dir = direcao;
	}
}


document.addEventListener("keydown", pegarEntrada);
function pegarEntrada(event){
	if(event.keyCode== 37){
		Snake.dir = "esquerda";
	}
	else if(event.keyCode == 38){
		Snake.dir = "cima";
	}
	else if(event.keyCode == 39){
		Snake.dir = "direita";
	}
	else if(event.keyCode == 40){
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
		ctx.fillStyle = "#d33f49";
		ctx.fillRect(Comida.x, Comida.y, Comida.largura, Comida.altura);

		ctx.strokeStyle = "black";
		ctx.strokeRect(Comida.x, Comida.y, Comida.largura, Comida.altura);
	},

	gerar: function(){
		this.x = Math.floor(Math.random()* Grid.maxCelulasX + Grid.minCelulasX) * this.tamanho;
		this.y = Math.floor(Math.random()* Grid.maxCelulasY + Grid.minCelulasY) * this.tamanho;
	}
}


var Placar = {
	x: 30,
	y: 600,
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

	Grid.mostrar();

	Snake.mostrar();
	Snake.mover(Snake.dir);
	Snake.checarLimiteDaTela();

	Comida.mostrar();

	if(mostrarDistancia(Snake.x, Snake.y, Comida.x, Comida.y) < 1){
		Snake.comer();
	}

	$("#pontuacao").html("Total: " + Snake.total);
}

//para atualizar/parar basta comentar/descomentar da linha abaixo.
setInterval(atualizar, 100);
