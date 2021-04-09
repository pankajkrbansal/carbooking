class BusBooking {
    constructor ( obj ) {
        this.passengerId = obj.passengerId;
        this.bookingId = obj.bookingId;
        // this.numberOfTickets = obj.numberOfTickets;
        this.bookingCost = obj.bookingCost;
        this.busId = obj.busId;
        this.bookingDate = obj.bookingDate;
    }
}

module.exports = BusBooking;