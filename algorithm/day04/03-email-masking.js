let email = 'codecamp@gmail.com';

let data = email.split('@');
data[0] = data[0].slice(0, -2) + '**';
email = data.join('@');

console.log(email); // codeca**@gmail.com
