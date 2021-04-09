const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex',true);
const url = "mongodb://localhost:27017/CarBooking_DB";

//Schema for customer
const customerSchema = Schema({
    customerId: {type:Number,unique:true},
    customerName: String,
    // dateOfBooking:{type:Date, default:new Date()},
    emailid:String,
    pwd:String,
    // carType: String
},{ collection: "Customer" });

//Schema for Car booking
const bookingSchema = Schema ({
    customerId: { type: Number, required: true },
    carId: { type: String, required: true },
    bookingId: { type: Number, unique: true },
    dateOfBooking: { type: Date, default: new Date() },
    price: { type: Number, required: true},
    
});

//schema for bus
const carSchema = Schema({
    carId:String,
    carName:String,
    price:Number,
    carType:{ type: String , enum:['Mini', 'Sedan', 'Luxury']},
   },{collection:'Car'})


let collection = {};


collection.getCarCollection = async()=>{
    try{
        let dbConnection = await Mongoose.connect(url,{useNewUrlParser:true});
        let model = await dbConnection.model('Car',carSchema);
        return model;
    }catch(error){
        let err = new Error('Cannot connect to DB');
        err.status = 500;
        throw err;
    }
}

collection.getCustomerCollection = async()=>{
    try{
        let dbConnection = await Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        let model = await dbConnection.model('Customer', customerSchema);
        return model;
    }catch (error){
        let err = new Error("Unable to connect to the database");
        err.status = 500;
        throw err;
    }

}
collection.getBookingCollection = async()=>{
    try{
        let dbcon = await Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        let model = await dbcon.model('Booking',bookingSchema);
        return model;
    }catch(error){
        let err = new Error("Unable to connect to DB");
        err.status=500;
        throw err; 
    }
}




module.exports = collection;