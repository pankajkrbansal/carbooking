const { model } = require("mongoose");
const dbModel = require("../utilities/connection");
const CarBooking = require("./carbooking");
const UserRegister = require('./userregister');
const logind = require('./userlogin');
const carBookingDb = {};

// Generate Id
carBookingDb.generateId = async() =>{
    let model = await dbModel.getBookingCollection();
    let ids = await model.distinct("bookingId");
    let bookId = Math.max(...ids);
    return bookId + 1;
}
//gennerate user id
carBookingDb.generateuid = async()=>{
    let model = await dbModel.getCustomerCollection();
    let uids = await model.distinct("customerId");
    let uid = Math.max(...uids);
    return uid+1;
}

//customer registration process
carBookingDb.register = async(UserRegister)=>{
    let model = await dbModel.getCustomerCollection();
    let uid =await carBookingDb.generateuid();
    //console.log(uid);
    UserRegister.customerId = uid;
    let data = await model.find({},{_id:0});
    
    for (i of data){
        if(i.emailid == UserRegister.emailid){
            return false;
        }
    }
        let d = await model.insertMany({customerId: UserRegister.customerId,customerName:UserRegister.customerName, 
        emailid:UserRegister.emailid,pwd:UserRegister.pwd});
        if(d){
            return true;
        }else{
            return false;
        }
}

//login method
carBookingDb.login = async(logind)=>{
    let m = await  dbModel.getCustomerCollection();
    let d = await m.find({},{_id:0});
    let f=0;
    for(let i of d){
       if(i.emailid == logind.emailid && i.pwd == logind.pwd){
            f=1;        
        }
    }
    if(f==1){
        return true;
    }else{
        return null;
    }
}

//get all carDB
carBookingDb.getAllCar = async() =>{
    let model = await dbModel.getCarCollection();
    let data = await model.find({});
    if(data.length>0){
        return data;
    }else{
        return null;
    }
}


//Getting all bookings
carBookingDb.getAllBookings = async () =>{
    let model = await dbModel.getBookingCollection();
    let booking = await model.find({}, { _id:0 });
    if(!booking || booking.length == 0) return null;
    else return booking;
}

//Check Customer
carBookingDb.checkCustomer = async (customerId) =>{
    let model = await dbModel.getCustomerCollection();
    let customer = await model.findOne({ customerId: customerId});
    if (customer) { 
        return customer;
    }
    else {
        return null;
    }
}

//Check Availability
carBookingDb.checkAvailability = async (carId,dateOfBooking) => {
    //console.log("Received date "+dateOfBooking)
    let model = await dbModel.getBookingCollection();
    let carAvailability = await model.find({
            carId:carId
    });
    let f=0;
    let y = new Date(dateOfBooking).getFullYear();
    let m = new Date(dateOfBooking).getMonth();
    let d1 = new Date(dateOfBooking).getDate();

    //console.log("Given date : "+typeof(d));
    for(d of carAvailability){
        // console.log(d.dateOfBooking);
        let year = new Date(d.dateOfBooking).getFullYear();
        let month = new Date(d.dateOfBooking).getMonth();
        let date = new Date(d.dateOfBooking).getDate();
        //console.log(" Date : "+d);
        if(y==year && m==month && d1==date){
            console.log("H");
            f=1;
            break;
        }
    }
    console.log("f = "+f );
    if (f==0) {
        return carAvailability;
    }
    else {
        return null;
    }
}

//To book the car
carBookingDb.bookCar = async (carBooking) => {
    let model = await dbModel.getBookingCollection();
    let bookId = await carBookingDb.generateId();
    carBooking.bookingId = bookId;
    let c = model.countDocuments();
    //console.log(c);
    let data = await model.insertMany({bookingId: carBooking.bookingId, customerId:carBooking.customerId,
    carId:carBooking.carId,dateOfBooking:carBooking.dateOfBooking ,price:carBooking.price});
    //console.log(data);
    if (data){
            return carBooking.bookingId;
        }
    else{
        return null;
    }
    
}

//get booking by id
carBookingDb.getBookingById = async(bookingid)=>{
    let book = await dbModel.getBookingCollection();
    let data = await book.findOne({bookingId:bookingid});
    if(data.length>0){
        return data;
    }else{
        return null;
    }
}

carBookingDb.deletebooking = async(bookingid)=>{
    let book = await dbModel.getBookingCollection();
    let data = await book.findOne({bookingId:bookingid});
    if(data){
        let del = data.deleteOne({bookingId:bookingid});
        if(del.deletedCount){
            return true;
        }else{
            return false;
        }
    }
}
module.exports = carBookingDb