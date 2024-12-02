const emailValidator = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value === null || emailRegex.test(value);
  };
  
  const nationalCodeValidator = (value) => {
    const nationalCodeRegex = /^\d{10}$/;
    return value === null || nationalCodeRegex.test(value);
  };
  
  const shabaNumberValidator = (value) => {
    const shabaRegex = /^IR\d{24}$/;
    return value === null || shabaRegex.test(value);
  };
  
  const cardNumberValidator = (value) => {
    const cardNumberRegex = /^\d{16}$/;
    return value === null || cardNumberRegex.test(value);
  };

  const mobileValidator = (value) => {
    const mobileRegex = /^09\d{9}$/;
    return mobileRegex.test(value);
  };
  
  module.exports = {
    emailValidator,
    nationalCodeValidator,
    shabaNumberValidator,
    cardNumberValidator,
    mobileValidator
  };
  