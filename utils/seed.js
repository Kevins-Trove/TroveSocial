const connection = require('../config/connection');
const { Thought, User } = require('../models');

const { 
  getRandomName, 
  getRandomEmail, 
  getRandomThoughts, 
  getRandomReactions
 } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    // let ThoughtCheck = await connection.db.listCollections({ name: 'Thoughts' }).toArray();
    // if (ThoughtCheck.length) {
    //   await connection.dropCollection('Thoughts');
    // }

    let UsersCheck = await connection.db.listCollections({ name: 'Users' }).toArray();
    console.log('UsersCheck');
    console.log(UsersCheck, UsersCheck.length);

    if (UsersCheck.length) {
      await connection.dropCollection('Users');
    }
    
  // Create empty array to hold the Users
  const Users = [];
  // Loop 20 times -- add Users to the Users array
  for (let i = 0; i < 1; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(1);

    const username = getRandomName();
    const email = getRandomEmail();
    const friends = [];
    
    const userSingle = [{
      username,
      email,
      thoughts,
      friends,
    }];
    console.log(userSingle);
    console.log(thoughts);
    console.log(thoughts.reactions);

    const UserData = await User.create(userSingle);
    console.log("--> ", UserData);
  }

  
  
  
  // Add Users to the collection and await the results
  const UserData = await User.create(Users);
  
  // Add Thoughts to the collection and await the results
  // await Thought.create({
  //   ThoughtName: 'UCLA',
  //   inPerson: false,
  //   Users: [...UserData.map(({_id}) => _id)],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(Users);
  console.info('---> Seeding done.');
  process.exit(0);
});
