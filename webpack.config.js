const Dotenv = require('dotenv-webpack');
module.exports = {
    resolve: {
        fallback: {
            fs: false,
            path: false,
            os: false,
        }
    },
    plugins: [
        new Dotenv()
    ],
}