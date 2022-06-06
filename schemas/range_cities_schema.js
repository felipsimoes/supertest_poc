const Joi = require('@hapi/joi')
const range_cities_schema = Joi.object({
  message: Joi.string(),
  cod: Joi.string(),
  count: Joi.number(),
  list: Joi.array().items({
    id: Joi.number(),
    name: Joi.string().required(),
    coord: Joi.object({
      lon: Joi.number(),
      lat: Joi.number()
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
    dt: Joi.number(),
    wind: Joi.object({
      speed: Joi.number(),
      deg: Joi.number()
    }),
    sys: Joi.object({
      country: Joi.string()
    }),
    rain: Joi.number().allow(null).optional(),
    snow: Joi.number().allow(null).optional(),
    clouds: Joi.object({
      all: Joi.number()
    }),
    weather: Joi.array().items({
        id: Joi.number(),
        main: Joi.string(),
        description: Joi.string(),
        icon: Joi.string()
    })
  })
})

module.exports = range_cities_schema