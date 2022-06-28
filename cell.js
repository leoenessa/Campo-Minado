class Cell{

    constructor(i,j,lado){
      this.i = i;
      this.j = j;
      this.lado = lado;
      this.bomba = random(1)<0.2;
      this.aberto = false;
      this.numBombas = 0;
      this.marcada = false;
    }
  
    desenhar(){
      if(this.aberto){
        strokeWeight(1);
        fill(200);
        rect(this.i*lado,this.j*lado,this.lado);
        fill(50);
        if(this.bomba){
          circle(this.i*lado+lado/2,this.j*lado+lado/2,this.lado/2)
        }else{
          if(this.numBombas==0){
            
          }else{
            textSize(16);
            text(this.numBombas,this.i*lado+lado/2,this.j*lado+lado/2);    
          }
          
        }
        
      }else{
        strokeWeight(1);
        noFill();
        rect(this.i*lado,this.j*lado,this.lado);
      }
      
      if(this.marcada){
        strokeWeight(1);
        fill(color('red'));
        rect(this.i*lado,this.j*lado,this.lado);
      }
    }
  
    abrir(){
      this.aberto=true;
    }
  
    marcar(){
      this.marcada = !this.marcada;
    }
  
    setNumBombas(num){
      this.numBombas = num;
    }
  
    temBomba(){
      return this.bomba;
    }
}
