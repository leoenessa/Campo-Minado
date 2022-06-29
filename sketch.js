let INICIANTE = 10;
let MEDIO = 15;
let AVANCADO = 20;

let colunas = INICIANTE;
let linhas = INICIANTE;
let lado;

let BOMBAS;
if(colunas!=20){
  BOMBAS=colunas+5;
}else{
  BOMBAS = 60;
}

// let colunas = 5;
// let linhas = 5;
// let lado = 80;
let grid = [];
let espacoDisponivelBomba = [];

function criaArray2D(col,lin){
  let arr = new Array(col);
  for(let i=0;i<col;i++){
    arr[i] = new Array(lin);
  }
  return arr;
}

function setup() {
  createCanvas(401, 401);
  lado =floor(width/colunas);
  
  //Povoando com celulas
  grid = criaArray2D(colunas,linhas);
  for(let i=0;i<colunas;i++){
    for(let j=0;j<linhas;j++){
      grid[i][j] = new Cell(i,j, lado);
      espacoDisponivelBomba.push({i,j});
    }
  }
  
  //Incluindo bombas
  for(let c=0;c<BOMBAS;c++){
    let indiceAleatorio = floor(random(espacoDisponivelBomba.length));
    let escolha = espacoDisponivelBomba[indiceAleatorio];
    espacoDisponivelBomba.splice(indiceAleatorio,1);
    grid[escolha.i][escolha.j].setarBomba();
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
  if(grid[i][j].temBomba()){
    gameOver(false);
  }
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
  if(!grid[i][j].aberto){
    grid[i][j].marcar();
  } 
}

function checarStatusJogo(){
  let celulasFechadas = 0;
  let celulasMarcadas = 0;
  
  for(let i=0;i<colunas;i++){
    for(let j=0;j<linhas;j++){
      if(grid[i][j].fechado){
        celulasFechadas++;
      }
      if(grid[i][j].marcada){
        celulasMarcadas++;
      }
    }
  } 
  //Se não há mais celulas fechadas e a quantidade de celulas marcadas
  //for igual à quantidade de bombas
  if(celulasFechadas==0 && celulasMarcadas==BOMBAS){
    let contadorBombasMarcadas = 0;
      for(let i=0;i<colunas;i++){
        for(let j=0;j<linhas;j++){
          //Se a celula tem bomba e esta marcada, conta uma bomba marcada
          //corretamente
          if(grid[i][j].marcada && grid[i][j].temBomba()){
            contadorBombasMarcadas++;
          }
        }
      }
    
      if(contadorBombasMarcadas==BOMBAS){
        gameOver(true);
      }
  }
}

function gameOver(ganhou){
  //noLoop();
  let resultP = createP('');
  resultP.style('font-size', '32pt');
    
  if(ganhou){
    resultP.html(`PARABÉNS!`);
  }else{
    resultP.html(`BOOM!!!!`);
  }
}

function mousePressed(){
  
  let i = floor(mouseX/lado);
  let j = floor(mouseY/lado);
  
  if(keyIsDown(ALT)){
     marcarBloco(i,j);
  }else{
    abrirBloco(i,j);
  }
  
  checarStatusJogo();
}
