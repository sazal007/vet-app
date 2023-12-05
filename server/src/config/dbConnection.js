const mongoose = require('mongoose')
const colors = require('colors');

module.exports = () => {
  try {
    mongoose.connect(process.env.DATABASE);
    console.log(`Connected to database...`.cyan.underline)
  } catch (error) {
    console.log('Could not connect to database...',error)
  }
}
