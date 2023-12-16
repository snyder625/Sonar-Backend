const asyncHandler = require('express-async-handler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Appointment = require('../models/appointmentModel')
const ErrorHandler = require('../utils/errorHandler');


exports.getAppointments = catchAsyncErrors(async(req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments
    })
})

exports.getAppointmentofASpecificBarber = catchAsyncErrors(async(req, res, next) => {
    const appointments = await Appointment.find({ barberName: req.params.name, salonName: req.params.sname });
    res.status(200).json({
        success: true,
        appointments
    })
})

exports.setAppointment = catchAsyncErrors(async(req, res, next) => {

    const appointment = await Appointment.create({
        customerName: req.body.customerName,
        salonName: req.body.salonName,
        barberName: req.body.name,
        price: req.body.price,
        date: req.body.date,
    })
    if (!req.body.customerName) {
        return next(new ErrorHandler("Please add a Text Field", 400));
    }
    res.status(200).json({
        success: true,
        appointment
    });
})

exports.deleteAppointment = catchAsyncErrors(async(req, res, next) => {
    const appointment = await Appointment.findById(req.params.id)
    if (!appointment) {
        return next(new ErrorHandler("Appointment  not found", 400))
    }
    await appointment.remove()
    res.status(200).json({
        success: true,
        id: req.params.id
    })
})