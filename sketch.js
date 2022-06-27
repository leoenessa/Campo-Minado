let colunas = 20;
let linhas = 20;
let lado = 20;
let grid = [];

function criaArray2D(col,lin){
  let arr = new Array(col);
  for(let i=0;i<col;i++){
    arr[i] = new Array(lin);
  }
  return arr;
}

function setup() {
  createCanvas(401, 401);
  grid = criaArray2D(colunas,linhas);
  for(let i=0;i<colunas;i++){
    for(let j=0;j<linhas;j++){
      grid[i][j] = new Cell(i,j, lado);
    }
  }
}

function draw() {
  background(255);
  
  for(let i=0;i<colunas;i++){
    for(let j=0;j<linhas;j++){
      grid[i][j].desenhar();
    }
  } 
}

function abrirBloco(i,j){
  grid[i][j].abrir();
}

function mousePressed(){
  let i = floor(mouseX/lado);
  let j = floor(mouseY/lado);
  
  abrirBloco(i,j);
  
  
}