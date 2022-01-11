let email = 'codecamp@gmail.com';

let data = email.split('@');
data[0] = data[0].slice(0, data[0].length - 2) + '**';
data.join('@');

console.log(email); // codeca**@gmail.com
