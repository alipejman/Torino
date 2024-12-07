const autoBind = require("auto-bind");
const tourService = require("./search.service");

class searchController {
  #tourService;
  constructor() {
    autoBind(this);
    this.#tourService = tourService;
  }
  async getToures(req, res, next) {
    console.log(req.body); // چاپ داده‌های ورودی
    const { origin, destination, departureDate } = req.body;
    console.log(`Origin: ${origin}, Destination: ${destination}, Departure Date: ${JSON.stringify(departureDate)}`); // چاپ مقادیر ورودی
    try {
        const tours = await this.#tourService.getTours(
            origin,
            destination,
            departureDate
        );
        return res.status(200).json(tours);
    } catch (error) {
        console.error(error); // چاپ خطا
        next(error);
    }
}

}

module.exports = new searchController();
