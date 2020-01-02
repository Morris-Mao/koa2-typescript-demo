export default {
    mongodb: {
        uri: 'mongodb://127.0.0.1:27017/my-data-base',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true, // If this option is false, program won't create indexes automatically
            poolSize: 20
        }
    },
    koa: {
        port: 8000 // Koa Http Listen Port
    },
    morgan: 'tiny' // Log Type
};
