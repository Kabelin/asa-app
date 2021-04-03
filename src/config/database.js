module.exports = {
  dialect: 'postgres',
  // change to docker host when using docker-compose
  host: '127.0.0.1',
  username: 'postgres',
  password: '123',
  database: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}