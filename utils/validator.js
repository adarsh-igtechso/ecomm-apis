export const validateName = (name) => {
    const regexName = new RegExp(/[a-zA-Z][a-zA-Z]+[a-zA-Z]$/)
    return regexName.test(name);
}

export const validateEmail = (email) => {
    const regexName = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    return regexName.test(email);
}

export const validatePassword = (pass) => {
  const regexName = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
  return regexName.test(pass);
};


export const  validateMobileNumber= (mobileNumber) => {
  const cleanedNumber = mobileNumber.replace(/\D/g, '');
  if (cleanedNumber.length === 10 && ['7', '8', '9'].includes(cleanedNumber[0])) {
    return parseInt(cleanedNumber, 10);
  } else {
    throw new Error('Invalid mobile number provided');
  }
}