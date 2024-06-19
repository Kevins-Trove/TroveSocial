const names = [
  'Aaron',
  'Kevin',
  'John',
  'Micheal',
  'Jennifer',
  'Robert',
  'Julie',
  'Coffee',
  'Java',
  'Bobbie',
  'Jason',
  'Alexi',
  'Rebecca',
  'Zen',
  'Bill',
  'Sue',
  'Great',
  'Bimal',
  'Greg',
  'Zion',
  'Terry',
  'Charlete',
  'Darrel',
  'Sarah',
  'Nat',
  'Park',
];

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
  'Yes popcorn',
  'Fire',
  'Testing our product',
  'Cooking app',
  'Jelly',
  'What are they talking about',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random user name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Gets a random user name
const getRandomEmail = () =>
  `${getRandomArrItem(names)}@${getRandomArrItem(names)}.com`;


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
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(appThroughts),
      username: getRandomName(),
      reactions: getRandomReactions(Math.floor(Math.random() * 6 + 1))
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { 
  getRandomName, 
  getRandomEmail, 
  getRandomThoughts, 
  getRandomReactions
 };
