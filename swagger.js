const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Orders Api Project',
            version: '1.0.0',
            description: 'This project involves building a CRUD application that allows users to perform various operations related to order management. The application supports a number of endpoints that can be accessed by other systems or teams. The endpoints include functionalities such as creating a new order, retrieving an order by its unique ID, getting all the existing orders, deleting an order, and updating an existing order. This allows users to perform various operations on the orders that have been created. In order to ensure that the data is accurate and up-to-date, the application has a feature that prevents users from creating or updating orders if less than 3 hours have passed since any order was created in the database. This helps to maintain the integrity of the data and ensures that the order management system is working effectively.',
        },
        servers: [
            {
                url: 'http://localhost:80/api',
            },
        ],
    },
    apis: ['./routes/route.js'], // Path to the API routes folder
};

const specs = swaggerJsDoc(options);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(specs));




module.exports = router;
