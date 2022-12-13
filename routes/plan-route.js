const express = require("express");
const { check } = require("express-validator");

const plansController = require("../controllers/plans-controller");

const router = express.Router();

router.get("/", plansController.getAllPlans);

router.get("/email/:email", plansController.getPlanByEmail);


router.post(
  "/",
  [
    check("fname").not().isEmpty(),
    check("lname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("phoneNumber").isLength({max: 10, min: 10}),
    check("gender").not().isEmpty(),
    check("schedule").not().isEmpty(),
    check("level").not().isEmpty(),
    check("session").not().isEmpty(),
    check("paymentId").not().isEmpty(),
  ],
  plansController.createPlan
);

router.patch(
  "/:email",
  [
    check("schedule").not().isEmpty(),
    check("level").not().isEmpty(),
    check("session").not().isEmpty(),
    check("paymentId").not().isEmpty(),
  ],
  plansController.updatePlan
);

router.delete("/:email", plansController.deletePlan);

module.exports = router;
