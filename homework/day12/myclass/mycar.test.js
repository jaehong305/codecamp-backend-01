import { Car } from './mycar.js';

const car1 = {
  model: '람보르기니',
  hp: '1000',
  color: 'white',
};
const mycar = new Car(car1);

console.log(mycar.model);
console.log(mycar.hp);
console.log(mycar.color);
mycar.go();
mycar.stop();
