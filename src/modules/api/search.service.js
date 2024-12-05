const autoBind = require("auto-bind");
const postModel = require("../post/post.model");
const createHttpError = require("http-errors");
const searchMessages = require("./search.messages");
class searchService {
  #postModel;
  constructor() {
    autoBind(this);
    this.#postModel = postModel;
  }
  async getTours(origin, destination, departureDate) {
    const { day, month, year } = departureDate;
    const tours = await this.#postModel.find({
        origin,
        destination,
        "day": day,
        "month": month,
        "year": year,
    }, {updatedAt: 0, createdAt: 0, __v: 0});

    if (tours.length === 0) {
        throw new createHttpError(404, searchMessages.notFoundTour);
    } else {
        return tours;
    }
}

}

module.exports = new searchService();
