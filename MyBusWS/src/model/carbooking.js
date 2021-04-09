class CarBooking {
    constructor ( obj ) {
        this.customerId = obj.customerId;
        this.bookingId = obj.bookingId;
        this.price = obj.price;
        this.carId = obj.carId;
        this.dateOfBooking = obj.dateOfBooking;
        //this.cartype = obj.cartype;
    }
}

module.exports = CarBooking;