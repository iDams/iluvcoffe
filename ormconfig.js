/* ormconfig.js */
module.exports = {
    type: 'postgres',
    host: '192.168.8.103',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  };
  