const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/app.routes');
const swaggerConfig = require('./src/config/swagger.config');
const cookieParser = require('cookie-parser');
const notFound = require('./src/common/exeption/not-found.handler');
const allExeptionHandler = require('./src/common/exeption/all-exeption.handler');


dotenv.config();


async function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    const PORT = process.env.PORT;
    app.use(router);
    swaggerConfig(app);
    require('./src/config/mongoose.config');


    notFound(app);
    allExeptionHandler(app);


    app.listen(PORT, () => {
        console.log(`Server Is Running On PORT : ${PORT} : http://localhost:${PORT}`);
    });
    
}

main()