export class Car {
  model;
  hp;
  color;
  constructor(myCar) {
    this.model = myCar.model;
    this.hp = myCar.hp;
    this.color = myCar.color;
  }

  go = () => {
    console.log('출발하기');
  };

  stop = () => {
    console.log('정지하기');
  };
}
