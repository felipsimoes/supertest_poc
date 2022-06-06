const Joi = require('@hapi/joi')
const single_city_schema = Joi.object({
   coord: Joi.object({
     lon: Joi.number(),
     lat: Joi.number()
   }),
   weather: Joi.array().items({
      id: Joi.number(),
      main: Joi.string(),
      description: Joi.string(),
      icon: Joi.string()
   }),
   base: Joi.string(),
   main: Joi.object({
     temp:  Joi.number(),
     feels_like:  Joi.number(),
     temp_min:  Joi.number(),
     temp_max:  Joi.number(),
     pressure:  Joi.number(),
     humidity: Joi.number()
   }),
   visibility: Joi.number(),
   wind: Joi.object({
     speed: Joi.number(),
     deg: Joi.number()
   }),
   clouds: Joi.object({
     all: Joi.number()
   }),
   dt: Joi.number(),
   sys: Joi.object({
     type: Joi.number(),
     id: Joi.number(),
     country: Joi.string(),
     sunrise: Joi.number(),
     sunset: Joi.number()
   }),
   timezone: Joi.number(),
   id: Joi.number(),
   name: Joi.string().required(),
   cod: Joi.number()
})

module.exports = single_city_schema