export default function getUser(res) {
  res.send([
    {
      email: 'codecamp@google.com',
      name: '철수',
      phone: '01012341111',
      personal: '990901',
      prefer: 'https://google.com',
    },
    {
      email: 'codecamp1@google.com',
      name: '영희',
      phone: '01012342222',
      personal: '990902',
      prefer: 'https://google.com',
    },
    {
      email: 'codecamp2@google.com',
      name: '훈이',
      phone: '01012343333',
      personal: '990903',
      prefer: 'https://google.com',
    },
    {
      email: 'codecamp3@google.com',
      name: '짱구',
      phone: '01012344444',
      personal: '990904',
      prefer: 'https://google.com',
    },
    {
      email: 'codecamp9@google.com',
      name: '맹구',
      phone: '01012349999',
      personal: '990909',
      prefer: 'https://google.com',
    },
  ]);
}
