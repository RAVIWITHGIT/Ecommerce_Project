const express = require("express");
const registerController = require("../controllers/authController");

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

// export default router;
module.exports = router;
