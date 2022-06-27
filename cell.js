class Cell{

    constructor(i,j,lado){
      this.i = i;
      this.j = j;
      this.lado = lado;
      this.bomba = true;
      this.aberto = random(1)<0.5;
      this.numBombas = floor(random(4));
    }
  
    desenhar(){
      if(this.aberto){
        strokeWeight(1);
        fill(200);
        rect(this.i*lado,this.j*lado,this.lado);
        fill(0);
        text(this.numBombas,this.i*lado+lado/2,this.j*lado+lado/2)
      }else{
        strokeWeight(1);
        noFill();
        rect(this.i*lado,this.j*lado,this.lado);
      }
    }
  
  abrir(){
    this.aberto=true;
  }
  
    
}
