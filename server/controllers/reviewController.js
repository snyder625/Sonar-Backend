
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Review = require('../models/reviewModel')
const Barber = require('../models/barberModel')
const ErrorHandler = require('../utils/errorHandler');

exports.getReviewsofASpecificBarber = catchAsyncErrors(async(req, res, next) => {
    const reviews = await Review.find({barberId: req.params.id });
    res.status(200).json({
        success: true,
        reviews
    })
})

exports.getAverageReviewsofASpecificBarber = catchAsyncErrors(async(req, res, next) => {
  const reviews = await Review.find({barberId: req.params.id });
  
  if (reviews.length==0) {
    res.status(200).json({
      success: true,
      average : ""
  })
  }
  if(reviews){
  const lastItem = reviews[reviews.length-1];
  const {average} = lastItem;
  
  res.status(200).json({
    success: true,
    average
})}
})
  
exports.setReview = catchAsyncErrors(async(req, res, next) => {
  if (!req.body.barberId) {
    return next(new ErrorHandler("Pleaaase add a Text Field", 400));
    
}
  const reviews= await Review.find({barberId:req.body.barberId});
 
  let val = 0;
  if(reviews.length==0){
    val= req.body.rating;
  }else{
  val =
    reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length
  }
    const review = await Review.create({


      barberId:req.body.barberId,
      customerName:req.body.customerName,
      rating: req.body.rating,
      comment:req.body.comment,
      average : val
    })
    const filter = { id: req.params.id };
    const update = { ratings: val };
    let barber = await Barber.findOneAndUpdate(filter , update)
   
    res.status(200).json({
        success: true,
        review,
        barber
    });

})