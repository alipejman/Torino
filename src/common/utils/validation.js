const emailValidator = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const nationalCodeValidator = (v) => /^\d{10}$/.test(v);
const shabaNumberValidator = (v) => /^(?:IR)(?=.{24}$)[0-9]*$/.test(v);
const cardNumberValidator = (v) => /^\d+([\/.-]\d+)*$/.test(v);

module.exports = {
    emailValidator,
    nationalCodeValidator,
    shabaNumberValidator,
    cardNumberValidator
};
