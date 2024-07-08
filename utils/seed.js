const connection = require('../config/connection');
const { Thought, User } = require('../models');

const { 
  getRandomName, 
  getRandomEmail, 
  getRandomThought
 } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Clear existing records
  const userResult = await User.deleteMany({});
  console.log('Deleted user count:', userResult.deletedCount);

  
  const thoughtResult = await Thought.deleteMany({});
  console.log('Deleted thought count:',  thoughtResult.deletedCount);

  // user array
  let usersList = [];

  // Create new Users with thoughts
 
 for (let i = 0; i < 10; i++) {

    const username = getRandomName();
    const email = getRandomEmail();
    
    let count = 2;// = [Math.floor(Math.random() * 6 +1)];
   
    let thoughtsNew = getRandomThought(Math.floor(Math.random() * 6 + 1), username);
    
    let thoughtData = await Thought.create(thoughtsNew);
      
    

    // Pick a random friend
    let friends = [];
    if (usersList.length > 0) {
      friends.push({ "_id" : usersList[Math.floor(Math.random() * usersList.length)]});
    }

    let userSingle = [{
      username: username,
      email: email,
      thoughts: [...thoughtData.map(({_id}) => _id)],
      friends: friends,
    }];

   
    console.log(userSingle);
    
    const UserData = await User.create(userSingle);
    

      // Save user ids for friends list
    if (i>0) {
      usersList.push( UserData[0]._id);

    }
    
  }

  

  console.info('---> Seeding done.');
  process.exit(0);
});
