let colunas = 10;
let linhas = 10;
let lado = 40;
// let colunas = 5;
// let linhas = 5;
// let lado = 80;
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
  //Povoando com celulas
  grid = criaArray2D(colunas,linhas);
  for(let i=0;i<colunas;i++){
    for(let j=0;j<linhas;j++){
      grid[i][j] = new Cell(i,j, lado);
    }
  }
  
  //Percorrendo grid e descobrindo a quantidade de bombas ao redor
  for(let i=0;i<colunas;i++){
    for(let j=0;j<linhas;j++){
      let qtdeBomba = 0;
      
      for(let y=-1;y<2;y++){
        for(let x=-1;x<2;x++){
          let ioff = i+x;
          let joff = j+y;
          
          if(ioff<0 || joff<0 || ioff>=linhas || joff>=colunas ){
            continue;
          }
          if(ioff == i && joff==j){
            continue;
          }
          
          if(grid[ioff][joff].temBomba()){
             qtdeBomba++;
          }
        }  
      }
      
      grid[i][j].setNumBombas(qtdeBomba);  
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
  if(grid[i][j].numBombas == 0){
    floodFill(i,j);
  }
}

function floodFill(iInicial,jInicial){
  console.log("Iniciar FloodFill");
  for(let y=-1;y<2;y++){
    for(let x=-1;x<2;x++){
      let ioff = iInicial+x;
      let joff = jInicial+y;
          
        if(ioff<0 || joff<0 || ioff>=linhas || joff>=colunas ){
          continue;
        }
        if(ioff == iInicial && joff==jInicial){
          continue;
        }
          
        if(grid[ioff][joff].aberto){
          continue;
        }else{
          abrirBloco(ioff,joff);  
        }
        
    }  
  }
  
  
  
  
}

function marcarBloco(i,j){
  grid[i][j].marcar();
}

function mousePressed(){
  let i = floor(mouseX/lado);
  let j = floor(mouseY/lado);
  
  
  if(keyIsDown(ALT)){
     marcarBloco(i,j);
  }else{
    abrirBloco(i,j);
  }
  
  
}
