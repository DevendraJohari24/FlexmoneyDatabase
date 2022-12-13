const {validationResult} = require('express-validator');
const HttpError = require('../model/http-error');

const Plans = require("../model/Plan");


// Creating a Meal

const createPlan = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
  
    const {
        fname,
        lname,
        email,
        phoneNumber,
        gender,
        schedule,
        level,
        session,
        paymentId,
    } = req.body;

    const paymentDate = String(new Date());
    const createPlan = new Plans({
        fname,
        lname,
        email,
        phoneNumber,
        gender,
        schedule,
        level,
        session,
        paymentId,
        paymentDate,
    });

    try{
        await createPlan.save();
    }
    catch(err){
        const error = new HttpError(
            'Creating Category failed, please try again',
            500
        );
        return next(error);
    }

    return res.status(201).json({plan: createPlan});
}



// Getting Meals By MealsName

const getPlanByEmail = async (req, res, next) => {
    const email = req.params.email;

    let result;

     try{
        result = await Plans.findOne({email: email});
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!result){
        const error =  new HttpError('Could not find a Meal for the provided Name.', 404);
        return next(error);
    }

    res.json({result: result.toObject({getters: true})});
}



// Getting Category By categoryName

const getAllPlans = async (req, res, next) => {
    let plan;
    
     try{
      plan = await Plans.find();
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!plan){
        const error =  new HttpError('Could not find a Meal for the provided Name.', 404);
        return next(error);
    }

    res.json({plan: plan});
}





// Updating a Category
const updatePlan = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError(
        "Invalid inputs passed, please check your data.",
        422
      );
    }

    const {
        schedule,
        level,
        session,
        paymentId,
    } = req.body; 

    const sendEmail = req.params.email;

    let plan;
    try {
        plan = await Plans.findOne({email: sendEmail});
    } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update Meal.',
      500
    );
    return next(error);
  }

  plan.schedule = schedule;
  plan.level = level;
  plan.session = session;
  plan.paymentId = paymentId;
  plan.paymentDate = String(new Date());
  try {
    await plan.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update Meal.',
      500
    );
    return next(error);
  }

  res.status(200).json({ plan: plan.toObject({ getters: true }) });
}


// Deleting a Category

const deletePlan = async(req, res, next) => {
  const email = req.params.email;

  let plan;
  try {
    plan = await Plans.findOne({email: email});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Meal.',
      500
    );
    return next(error);
  }

   try {
    await plan.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Meal.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted Category.' });
}








exports.getAllPlans = getAllPlans;
exports.getPlanByEmail = getPlanByEmail;
exports.createPlan = createPlan;
exports.updatePlan = updatePlan;
exports.deletePlan = deletePlan;
