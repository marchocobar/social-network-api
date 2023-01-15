const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomReaction, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [];
    

    for (let i = 0; i < 20; i++) {
        const thoughts = getRandomThoughts(10);
        const username = getRandomName();
        const email = `${username}${'@mail.com'}`;
        const friends = getRandomName(3)
            
        users.push({
            username,
            email,
            thoughts,
            friends
        });
      }
    
      await User.collection.insertMany(users);
      await Thought.collection.insertMany(thoughts);

      console.table(users);
      console.table(thoughts);
      console.info('Seeding complete! 🌱');
      process.exit(0);

});