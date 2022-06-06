// dependencias
require('dotenv').config()
const expect = require('chai').expect
const request = require('supertest')
const logger = require('pino')()
const Joi = require('@hapi/joi')

// variaveis de ambiente
const apiKey = process.env.API_KEY
const app = 'https://api.openweathermap.org/data/2.5/'
const singleLocation = 'weather'
const groupOfLocations = 'group'
const citiesOnRange = 'find'

const singleCitySchema = require('./schemas/single_city_schema')
const listCitiesSchema = require('./schemas/list_cities_schema')
const rangeCitiesSchema = require('./schemas/range_cities_schema')

describe('Call current weather', () => {
  context('for single location', () => {
    it('responds by city name', async () => {
      let resp = await request(app)
        .get(singleLocation)
        .query({ q: 'London', apiKey: apiKey })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      const validationError = singleCitySchema.validate(resp.body).error
      expect(validationError).to.be.equal(undefined)
    });

    it('responds by city id', async () => {
      let cityId = '3448433'

      let resp = await request(app)
        .get(singleLocation)
        .query({ id: cityId, apiKey: apiKey })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const validationError = singleCitySchema.validate(resp.body).error
      expect(validationError).to.be.equal(undefined)
    });

    it('responds by city geographic coordinates', async () => {
      let longitude = '-43.2075'
      let latitude = '-22.902781'

      let resp = await request(app)
        .get(singleLocation)
        .query({ lat: latitude, lon: longitude, apiKey: apiKey })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const validationError = singleCitySchema.validate(resp.body).error
      expect(validationError).to.be.equal(undefined)
    });
  })

  context('for multiple location or given area', () => {
    it('responds by a list of city ids', async () => {
      let listOfIds = '3451189,3451205,3458449'

      let resp = await request(app)
        .get(groupOfLocations)
        .query({ id: listOfIds, units: 'metric', apiKey: apiKey })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      
      const validationError = listCitiesSchema.validate(resp.body).error
      expect(validationError).to.be.equal(undefined)
    })

    it('responds by cities in circle range', async () => {
      let longitude = '-43.2075'
      let latitude = '-22.902781'
      let numberOfCities = '10'

      let resp = await request(app)
        .get(citiesOnRange)
        .query({ lat: latitude, lon: longitude, cnt: numberOfCities, apiKey: apiKey })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const validationError = rangeCitiesSchema.validate(resp.body).error
      expect(validationError).to.be.equal(undefined)
    })
  })
});

describe('Behaviour on unsuccessful requests', () => {
  context('unauthorized request', () => {
    it('should reject a request without api key', function(done) {
      request(app)
        .get(singleLocation)
        .query({ q: 'London' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });

    it('should reject a request without a valid api key', function(done) {
      let apiKey = 'anyGIVENrandomKey'
      
      request(app)
        .get(singleLocation)
        .query({ q: 'London', apiKey: apiKey  })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  })
})


