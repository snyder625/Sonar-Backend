const express = require('express')
const { getSalons, setSalon, updateSalon, deleteSalon, getSalon, getSalonCoordinates, getAdminSalons, createSalon, getSalonPic } = require("../controllers/SalonController");
const router = express.Router()

router.route("/").get(getSalons);
router.route("/coordinates/:id").get(getSalonCoordinates);
router.route("/:id").get(getSalon);
router.route("/url/:id").get(getSalonPic);
router.route("/").post(setSalon);
router.route("/:id").put(updateSalon);
router.route("/:id").delete(deleteSalon)
router.route("/salonowner/salons").get(getAdminSalons)
router.route("/salonowner/salon/new").post(createSalon);

module.exports = router;