import axios from 'axios'

export default class Api {
  token = "413598fc984f5de6dd6e67a101b23288d7614eee7ef02a10a01353cac55f3911"

  async search(city) {
    const url =
      'https://api.meteo-concept.com/api/location/cities?token=' +
      this.token +
      '&search=' +
      city
    return await axios.get(url).then((response) => response.data)
  }

  async getMeteoForCityFor5Days(insee) {
    const url =
      'https://api.meteo-concept.com/api/forecast/daily?token=' +
      this.token +
      '&insee=' +
      insee

    const result = await axios.get(url).then((response) => response.data)

    return result.forecast.slice(0,6)
  }

  async getMeteoForCityForNextHour(insee) {
    const url =
      'https://api.meteo-concept.com/api/forecast/daily/periods?token=' +
      this.token +
      '&insee=' +
      insee
    return await axios.get(url).then((response) => response.data)
  }
}
