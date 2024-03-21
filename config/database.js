const mongoose = require("mongoose");
let User;

const connectDatabase = async () => {
  try {
    if (!User) {
      User = mongoose.model("User", require("../models/userModel").schema);
    }

    await mongoose
      .connect(
        "mongodb+srv://angelicamhg31:WT4x3IQdRU5Lu3Qn@cluster0.7ypadtm.mongodb.net/"
      )
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
