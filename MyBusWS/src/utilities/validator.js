let Validator = {};

//To validate bus Id
Validator.validateCarId = function (carId) {
    let pattern = new RegExp("^[MSL][0-9]{3}$");
    if (carId.length != 5 && !(pattern.test(carId))) {
        let error = new Error("Error in car Id");
        error.status = 406;
        throw error;
    }
}

//To validate booking Id
Validator.validateBookingId = function (bookingId) {
    if (new String(bookingId).length != 4) {
        let error = new Error("Error in booking Id");
        error.status = 406;
        throw error;
    }
}

module.exports=Validator;