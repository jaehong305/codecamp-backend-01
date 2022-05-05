const aaa = new Date();

console.log(aaa.getFullYear());
console.log(aaa.getMonth() + 1);

class Monster {
  power = 10;
  constructor(aaa) {
    this.power = aaa;
  }

  attack() {
    console.log('공격하자');
    console.log('내 공격력은 ' + this.power);
  }

  run = () => {
    console.log('도망가자!!');
  };
}

const myMonster1 = new Monster(50);
myMonster1.attack();
myMonster1.run();

const myMonster2 = new Monster(20);
myMonster2.attack();
myMonster2.run();
