const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/app.routes');
const swaggerConfig = require('./src/config/swagger.config');
dotenv.config();


async function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
    const PORT = process.env.PORT;
    require('./src/config/mongoose.config');
    swaggerConfig(app);

    app.listen(PORT, () => {
        console.log(`Server Is Running On PORT : ${PORT} : http://localhost:${PORT}`);
    });
    
}

main()