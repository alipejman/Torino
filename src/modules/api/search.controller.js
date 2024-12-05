const autoBind = require("auto-bind");
const tourService = require("./search.service");

class searchController {
  #tourService;
  constructor() {
    autoBind(this);
    this.#tourService = tourService;
  }
  async getToures(req, res, next) {
    const { origin, destination, departureDate } = req.body;
    try {
      const tours = await this.#tourService.getTours(
        origin,
        destination,
        departureDate
      );
      return res.status(200).json(tours);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new searchController();
