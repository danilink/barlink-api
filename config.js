module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URL || 'mongodb://localhost:27017/restaurant',
  auth: {
    secret: process.env.SECRET || 'apirestaurant',
  }
}
