const {
  createStaff,
  getStaffInfo,
  getAllStaffInfo,
  updateStaffInfo,
  login,
  logout,
  replaceStaff,
} = require("../controller/controller");

const validator = require("../controller/validator.js");

const router = require("express").Router();

router.post("/createstaffinfo", validator, createStaff);

router.get("/allstaff", getAllStaffInfo);

router.get("/staffinformation/:id", getStaffInfo);

router.put("/updateinfo/:id", validator, updateStaffInfo);

router.post("/login", login);

router.post("/logout", logout);

router.delete("/deletestaff/:id", replaceStaff);

module.exports = router;
