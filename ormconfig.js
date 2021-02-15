module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 2510,
    username: 'postgres',
    password: '251064ai',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations',
    }
};