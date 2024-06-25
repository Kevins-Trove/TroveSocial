const names = [
  'aron', 'evin',  'ohn',  'icheal',  'ennifer',  'obert',  'ulie',  'offee',
  'ava',  'obbie',  'ason',  'lexi',  'ebecca',  'en',  'ill',  'ue',
  'reat',  'imal',  'reg',  'ion',  'erry',  'harlete',  'arrel',
  'arah',  'at',  'ark',  'harlie', 'iana', 'than'
  
];

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const appThroughts = [
  'Great thoughts',
  'Deep meaning',
  'My phone is more important',
  'This is a monopoly, do not user',
  'Entertaing',
  'Wow',
  'Stupid App',
  'Interesting',
  'Donkeys are funnier',
  'This could have been an Email',
  'Are you serious',
  'Yes popcorn',
  'I like puppies',
  'Get some sense',
  'I have seen better things in soap bubbles',
  'Reason number 64 to get a life',
  'Fire',
  'Testing our product',
  'Cooking app',
  'Jelly',
  'What are they talking about',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random user name
function getLetter (){
  return letters[Math.floor(Math.random() * letters.length)];
}

const getRandomName = () =>
  `${getLetter()}${getRandomArrItem(names)} ${getLetter()}${getRandomArrItem(names)}`;

// Gets a random user name
const getRandomEmail = () =>
  `${getLetter()}${getRandomArrItem(names)}@${getLetter()}${getRandomArrItem(names)}.${getLetter()}.com`;


// Function to generate random reactions that we can add to student object.
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(appThroughts),
      username: getRandomName(),
    });
  }
  return results;
};

// Function to generate random thoughts that we can add to student object.
const getRandomThought = (int, username) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(appThroughts),
      username: username,
      reactions: getRandomReactions(Math.floor(Math.random() * 6 + 1))
    });
  }
  return results;
   
};

// Export the functions for use in seed.js
module.exports = { 
  getRandomName, 
  getRandomEmail, 
  getRandomThought, 
  getRandomReactions
 };
