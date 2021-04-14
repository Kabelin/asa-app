module.exports = {
  dialect: 'postgres',
  // change to docker host when using docker-compose
  host: 'db',
  username: 'postgres',
  password: 'banco123',
  database: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}