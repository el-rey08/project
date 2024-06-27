const StaffModel = require("../model/model");

//create staff information
exports.createStaff = async (req, res) => {
  try {
    const {
      fullname,
      age,
      MaritalStatus,
      address,
      gender,
      academicQualification,
      stateOfOrigin,
      password,
      email,
    } = req.body;
    const data = {
      fullname: fullname.trim(),
      age,
      MaritalStatus,
      address,
      gender,
      academicQualification,
      stateOfOrigin,
      password,
      email,
    };

    // Check if a staff with the same email already exists
    const existingStaff = await StaffModel.findOne({ email });
    if (existingStaff) {
      return res
        .status(400)
        .json({ message: "Staff with this email already exists" });
    }

    const newStaff = await StaffModel.create(data);
    res
      .status(201)
      .json({ message: "Staff info is successfully created", data: newStaff });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get all staff information
exports.getAllStaffInfo = async (req, res) => {
  try {
    const allStaffInfo = await StaffModel.find();
    res.status(200).json({
      message: "below is all the staff information",
      data: allStaffInfo,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get a particular staff information
exports.getStaffInfo = async (req, res) => {
  try {
    let id = req.params.id;
    const staffInfo = await StaffModel.findById(id);
    res.status(200).json({
      message: "below is the requested staff information",
      data: staffInfo,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update a staffinformation
exports.updateStaffInfo = async (req, res) => {
  try {
    let id = req.params.id;
    const { MaritalStatus, address, } = req.body;
    const data = {
      MaritalStatus,
      address,
    };
    const updateStaff = await StaffModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json({
      message: "staff is successfully updated",
      data: updateStaff,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//checking in time
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await StaffModel.findOne({ email: email });

    if (!staff) {
      return res.status(400).json("invalid Email");
    }

    if (staff.password != password) {
      return res.status(400).json("invalid password");
    }
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    staff.loginTime = `${date}, ${time}`;

    await staff.save();
    res.status(200).json({
      message: "login successful and and resumption time saved ",
      data: staff,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//checking out time
exports.logout = async (req, res) => {
  try {
    const { email } = req.body;
    const data = {
      email,
    };

    const staff = await StaffModel.findOne(data, { email });
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    staff.logOutTime = `${date}, ${time}`;
    await staff.save();
    res.status(200).json({
      message: "staff successufully loggedout",
      data: staff,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Replacing a staff
exports.replaceStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedStaff = await StaffModel.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ message: `Staff with id ${id} does not exist` });
    }
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
