class UserRegister {
    constructor ( obj ) {
        this.customerId = obj.customerId;
        this.customerName= obj.customerName;
        this.emailid = obj.emailid;
        this.pwd = obj.pwd;
        // this.dateOfBooking = obj.dateOfBooking;
    }
}

module.exports = UserRegister;