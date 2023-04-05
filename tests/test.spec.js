const request = require('supertest');
const router = require("../routes/route.js");
const Controller = require('../controllers/controller')
//const { MockExpressRequest } = require('mock-express-request');

const app = require("../server")
const {
    orders
  } = require('../model/model')


describe('Get order by id test', () => {
    it('testing /order/id endpoint', async() => {
        // specifying fieldname which we want to compare later
        const fieldName = 'orderid';

        // getting the stored document which we want to match with the response received
        const storedDocument = await orders.find({ orderid: 4 }).lean();

        // line 17-24 converting stored document such that data type can match with the response received
        const timestamp = storedDocument[0].datetime
        const dateObj = new Date(timestamp);
        const dateString = dateObj.toISOString();
        storedDocument[0].datetime = dateString;
        let idString = storedDocument[0]._id
        idString = idString.toString();
        storedDocument[0]._id = idString
        console.log('stored is',storedDocument)

        // getting the response from api request
        const response = await request(app).get("/api/order/4");
        console.log('response is',response.body)
        

        expect(response.statusCode).toBe(200);
        expect({ [fieldName]: response.body[0][fieldName] }).toEqual({ [fieldName]: storedDocument[0][fieldName] });
        expect(response.body).toEqual(storedDocument);
    }, 10000);
})


describe('Get all orders test', () => {
    it('testing /orders endpoint', async() => {

        const storedDocument = await orders.find({}).lean();

        const response = await request(app).get("/api/orders");
        console.log('response is',response.body)

        expect(response.statusCode).toBe(200);

    });
})


describe('createOrder', () => {
    it('should create a new order in the database and return it in the response', async () => {
      const mockReq = {
        canBeCreated: true,
        body: {
          orderid: 6,
          totalfee: 500,
          services: [1000, 2000]
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();
      await Controller.createOrder(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        orderid: 6,
        totalfee: 500,
        services: [1000, 2000]
      }));
    });
  
    it('should return a 400 response with an error message if the request cannot be created', async () => {
      const mockReq = {
        canBeCreated: false,
        body: {
          orderid: 6,
          totalfee: 500,
          services: [1000, 2000]
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();
      await Controller.createOrder(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        data: 'Please try again later!'
      }));
    });
  });


  describe('Update Order', () => {
    it('testing update endpoint', async() => {

        const mockReq = {
            canBeCreated: true,
            params: { id: 1 },
            body: {
              totalfee: 750,
              services: [1000, 2000, 3000]
            }
          };
          const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
          const mockNext = jest.fn();
          await Controller.updateOrder(mockReq, mockRes, mockNext);
          expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            orderid: 1,
            totalfee: 750,
            services: [1000, 2000, 3000]
          }));
  });
});


describe('Delete Order', () => {
    it('should delete an existing order', async () => {
        const response = await request(app)
          .delete(`/api/order/6`)
          .send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          success: true,
          message: 'Order got deleted!',
        });
      });
});
  


