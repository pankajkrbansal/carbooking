const express = require("express");
const routing = express.Router();
const carBookingService = require("../services/users");
const UserRegister = require('../model/userregister');
const CarBooking = require("../model/carbooking");
const UserLogin = require('../model/userlogin');

// register route
routing.post('/register',async (req,res,next)=>{
    const userdata = new UserRegister(req.body);
    try{
        let d = await carBookingService.register(userdata);
        res.json(d);
    }catch(e){
        next(e);
    }
});

//login route
 routing.post('/login',async(req,res,next)=>{
    const logdata = new UserLogin(req.body); 
    try{
        let d = await carBookingService.login(logdata);
        res.json({'message':'Login successful'});
     }catch(e){
        next(e);
     }
 })



//showmy car database
routing.get("/show",async(req,res,next)=>{
    try{
        let data = await carBookingService.getAllCar();
        res.json(data);
    }catch{
        next(err);
    }
})

//Showing all details for the booking of car
routing.get("/getAllBookings",async(req,res,next)=>{
    //let bid = parseInt(req.params.bookingId);
    try{
        let bookings= await carBookingService.getAllBookings();
        res.json(bookings);
    }catch(err){
        next(err);
    }
})

// Inserting car booking
routing.post("/bookCar", async (req,res,next)=>{
    //console.log(req.body);
    const carBooking = new CarBooking(req.body);
    try{
        let bookingId = await carBookingService.bookCar(carBooking);
        res.json({ "message": "Car booking is successful with booking Id " + bookingId });
    }
    catch (error) {
        next(error);
    }
})

//delete booking
routing.put("/deleteBooking/:bookingId",async(req,res,next)=>{
    let bid = parseInt(req.params.bookingId);
    try{
        let d = await carBookingService.deleteById(bid);
        res.json("Your booking is deleted");
    }catch(err){
        next(err);
    }
})

//update route



module.exports = routing;