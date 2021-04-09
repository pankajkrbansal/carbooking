const collection = require("../utilities/connection");

const customerDb = [{
        customerId: 1001,
        customerName: "Sam",
        emailid:"sam@gmail.com",
        pwd:"sam@1001"
    }
    
];

const carDb = [{
        carId:"M001",
        cartype:"Mini",
        price:10000
},
    {
        carId:"S001",
        cartype:"Sedan",
        price:20000
    },
    {
        carId:"L001",
        cartype:"Luxury",
        price:30000
    }
];

const bookingDb = [
    {
        bookingId: 1001,
        customerId:1010,
        carId:"L001",
        dateOfBooking:Date(21/11/2021),
        // cartype:"Luxury",
        price:30000
    },
    {
        bookingId: 1002,
        customerId:1035,
        carId:"M001",
        dateOfBooking:Date(21/03/2021),
        // cartype:"Mini",
        price:10000
    },
  
];



exports.setupDb = async() => {
    let customer = await collection.getCustomerCollection();
    await customer.deleteMany();
    let customerData = await customer.insertMany(customerDb);
    
    let carBooking = await collection.getCarCollection();
    await carBooking.deleteMany();
    let carBookingData = await carBooking.insertMany(carDb)
    
    let booking = await collection.getBookingCollection();
    await booking.deleteMany();
    let bookingdata = await booking.insertMany(bookingDb); 


    if(customerData && carBookingData && bookingdata) {
        return "Insertion Successful"
    }
    else{
        let error = new Error("Insertion failed");
        error.status = 400;
        throw error;
    }    
}