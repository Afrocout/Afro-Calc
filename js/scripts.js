const preOperationText = document.querySelector("#previous-operation");
const curOperationText = document.querySelector("#current-operation");
const bttns = document.querySelectorAll("#buttons-group button");

class Extreme {
  constructor (preOperationText, curOperationText) {
    this.preOperationText = preOperationText;
    this.curOperationText = curOperationText;
    this.currentOperation = "";
  }

  //add digit to calculator screen
  addDigit(digit) {

    //Check if current operation already has a dot (Colocando apenas um ponto na calculadora)
    if(digit === "." && this.curOperationText.innerText.includes(".")){
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  //Process all calculator operations
  processOperation(operation){

    //check if current is empty
      if(this.curOperationText.innerText === "" && operation !== "C"){
        // change operation
 
        if(this.preOperationText.innerText !== ""){
          this.changeOperaion(operation);
          } 
          return;
      }
    

    //Get current and previous value
    let opValue;
    const prev = +this.preOperationText.innerText.split(" ")[0];
    const curr = +this.curOperationText.innerText;

    //Colocando os operadores para funcionar 
    switch(operation){
      case "+":
        opValue = prev + curr;
        this.updateScreen(opValue, operation, curr, prev);
          break;
            return;

            case "-":
              opValue = prev - curr;
              this.updateScreen(opValue, operation, curr, prev);
                break;
                  return;

                  case "/":
                    opValue = prev / curr;
                    this.updateScreen(opValue, operation, curr, prev);
                      break;
                        return;

                        case "*":
                          opValue = prev * curr;
                          this.updateScreen(opValue, operation, curr, prev);
                            break;

                            case "DEL": 
                            this.Delopprocess();
                                break;
                               case "CE":
                                this.pClearCurrentOp(); 
                                break;
                                case "C":
                                  this.ClearAllop(); 
                                  break;

                                  case "=":
                                    this.Equalsop(); 
                                    break;

                            default:
                              return;
    }
  }
// Change values of the calculator screen
  updateScreen(
    opValue = null,
    operation = null,
    curr = null,
    prev = null
  ) {
     
   if(opValue === null) {
    this.curOperationText.innerText += this.currentOperation;
   } else {
    // check if value is zero, if it is just add current value 
    if(prev === 0){
      opValue = curr;
    }
      //Add current value to previous
      this.preOperationText.innerText = `${opValue} ${operation}`;
      this.curOperationText.innerText = "";
   }
  }

  //change math operation
  changeOperaion(operation) {

    const mathOperation =["*","/","+","-"]

    if(!mathOperation.includes(operation)){
      return;
    }
    this.preOperationText.innerText =
     this.preOperationText.innerText.slice(0, -1) + operation;
  
  }
  //Delete te last digit
    Delopprocess(){
    this.curOperationText.innerText = 
     this.curOperationText.innerText.slice( 0, -1);
  }
  // clear current operation
  pClearCurrentOp(){
    this.curOperationText.innerText = "";
  }
// process all operations
  ClearAllop(){
    this.curOperationText.innerText = "";
    this.preOperationText.innerText = "";
  }

  //Process an operation
  Equalsop(){
  const operation =preOperationText.innerText.split(" ")[1];

  this.processOperation(operation);
  }
}


const AddUp = new Extreme(preOperationText, curOperationText);

/* Logica de metodos baseado no botao que o usario aperta*/
bttns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
   if(+value >= 0 || value === ".") {
    AddUp.addDigit(value);
   } else {
    AddUp.processOperation(value);
   }
   });
});
