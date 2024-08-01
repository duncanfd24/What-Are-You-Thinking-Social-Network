const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

mongoose.connect('mongodb://localhost:27017/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedData = async () => {
  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create users
  const users = await User.insertMany([
    { username: 'user1', email: 'user1@gmail.com' },
    { username: 'user2', email: 'user2@gmail.com' },
    { username: 'user3', email: 'user3@gmail.com' }
  ]);

  // Create thoughts
  const thoughts = await Thought.insertMany([
    { thoughtText: 'This is a thought by user1', username: 'user1' },
    { thoughtText: 'This is a thought by user2', username: 'user2' },
    { thoughtText: 'This is another thought by user1', username: 'user1' }
  ]);

  // Associate thoughts with users
  users[0].thoughts.push(thoughts[0]._id, thoughts[2]._id);
  users[1].thoughts.push(thoughts[1]._id);

  await users[0].save();
  await users[1].save();

  console.log('Database seeded!');
  process.exit(0);
};

seedData().catch(err => {
  console.error(err);
  process.exit(1);
});