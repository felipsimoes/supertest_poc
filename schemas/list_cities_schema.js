const Joi = require('@hapi/joi')
const list_cities_schema = Joi.object({
  cnt: Joi.number(),
  list: Joi.array().items({
    coord: Joi.object({
      lon: Joi.number(),
      lat: Joi.number()
    }),
    sys: Joi.object({
      timezone: Joi.number(),
      country: Joi.string(),
      sunrise: Joi.number(),
      sunset: Joi.number()
    }),
    weather: Joi.array().items({
        id: Joi.number(),
        main: Joi.string(),
        description: Joi.string(),
        icon: Joi.string()
    }),
    main: Joi.object({
      temp:  Joi.number(),
      feels_like:  Joi.number(),
      temp_min:  Joi.number(),
      temp_max:  Joi.number(),
      pressure:  Joi.number(),
      humidity: Joi.number(),
      sea_level: Joi.number(),
      grnd_level: Joi.number()
    }),
    visibility: Joi.number().allow(null).optional(),
    rain: Joi.number().allow(null).optional(),
    snow: Joi.number().allow(null).optional(),
    wind: Joi.object({
      speed: Joi.number(),
      deg: Joi.number()
    }),
    clouds: Joi.object({
      all: Joi.number()
    }),
    dt: Joi.number(),
    id: Joi.number(),
    name: Joi.string().required(),
  })
})

module.exports = list_cities_schema