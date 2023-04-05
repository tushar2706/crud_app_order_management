const express = require('express');
const Controller = require('../controllers/controller')
const validate = require('../middleware/validate')
require('dotenv').config();
const mongoString = process.env.DATABASE_URL;
const {
  orders
} = require('../model/model')

const router = express()

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the order.
 *         orderid:
 *           type: integer
 *           format: int32
 *           description: The ID of the order.
 *         datetime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created.
 *         totalfee:
 *           type: integer
 *           format: int32
 *           description: The total fee of the order.
 *         services:
 *           type: array
 *           items:
 *             type: integer
 *             format: int32
 *           description: The list of services provided in the order.
 */


/**
 * @swagger
 * /orders:
 *  get:
 *      summary: This api is used to get all the orders data from the database
 *      description: This api is used tp get all the orders data from the database
 *      responses:
 *          200:
 *                description: Success message confirming getting all the orders
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: '#components/schemas/Orders'
 */
router.get('/orders',Controller.getAllOrders)

/**
 * @swagger
 * /Order/{id}:
 *  get:
 *      summary: This api is used to get an order based on a id from the database
 *      description: This api is used to get a particular order based on id from the database
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *                type: integer
 *      responses:
 *          200:
 *                description: Success message confirming getting the required order
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: '#components/schemas/Orders'
 */

router.get('/order/:id',Controller.getOrderById)


/**
 * @swagger
 * /Order/{id}:
 *  delete:
 *      summary: This api is used to delete an order based on a id from the database
 *      description: This api is used to delete a particular order based on id from the database
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *                type: integer
 *      responses:
 *          200:
 *                description: Success message confirming the deletion of the order
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *
 */
router.delete('/order/:id',Controller.OrderDelete)


/**
 * @swagger
 * /order/new:
 *   post:
 *     summary: This API serves the purpose of creating a new order in the database, but with a condition. It checks whether more than 3 hours have passed since the most recent order was created in the database. Only if this condition is satisfied, the create operation will be allowed. Otherwise, the API will return an error response and prevent the operation from being executed.
 *     description: This API serves the purpose of creating a new order in the database, but with a condition. It checks whether more than 3 hours have passed since the most recent order was created in the database. Only if this condition is satisfied, the create operation will be allowed. Otherwise, the API will return an error response and prevent the operation from being executed.
 *     requestBody:
 *       description: JSON body with order data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Orders'
 *           example:
 *             orderid: 1
 *             totalfee: 500
 *             services: [1000, 2000]
 *     responses:
 *       200:
 *         description: Success message confirming the addition of the new order.
 *       '400':
 *         description: Please try again later!
 *       '500':
 *         description: Internal server error
 */

router.post('/order/new',validate.timeCheck,Controller.createOrder)

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: This API serves the purpose of updating an existing order in the database, but with a condition. It checks whether more than 3 hours have passed since the most recent order was created in the database. Only if this condition is satisfied, the update operation will be allowed. Otherwise, the API will return an error response and prevent the update from being executed.
 *     description: This API serves the purpose of updating an existing order in the database, but with a condition. It checks whether more than 3 hours have passed since the most recent order was created in the database. Only if this condition is satisfied, the update operation will be allowed. Otherwise, the API will return an error response and prevent the update from being executed.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *                type: integer
 *     requestBody:
 *       description: JSON body with order data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Orders'
 *           example:
 *             totalfee: 200
 *             services: [3000]
 *     responses:
 *       200:
 *         description: Success message confirming the updation of the order.
 *       '400':
 *         description: Please try again later!
 *       '500':
 *         description: Internal server error
 */
router.put('/order/:id' ,validate.timeCheck , Controller.updateOrder)




module.exports = router;