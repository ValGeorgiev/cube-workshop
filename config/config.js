module.exports = {
    development: {
        port: process.env.PORT,
        privateKey: process.env.PRIVATE_KEY,
        databaseUrl: process.env.DATABASE_URL
    },
    production: {}
};