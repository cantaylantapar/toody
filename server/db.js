const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Could not connect to database", error);
  }
};
