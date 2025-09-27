const mongoose = require("mongoose");

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        // Use async/await for better error handling
        await mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Could not connect to database!", error);
        throw error; // Re-throw the error if you want calling code to handle it
    }
};
