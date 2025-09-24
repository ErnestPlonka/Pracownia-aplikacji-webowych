let a = 3
let b = 5
const readline = require('node:readline');
function Power(x,y){
    let wynik = 1;
    for(let i = 0; i<y;i++){
        wynik = wynik * x;
    }
    return wynik;
}
function PrimeNumber(x){
    let i = 2;
    while(i<Math.sqrt(x)){
        if(x%i==0){
            return false;
        }
        i++;
    }
    return true;
}
console.log(Power(a,b));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(`What number do you want to check? \n`, c=>{
    console.log(PrimeNumber(parseInt(c)));
    rl.close();
});
