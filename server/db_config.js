import mongoose from 'mongoose';

const connectionString = process.env.DBConnect;
export const DBConnect = () => {
    mongoose.connect(connectionString)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.error("Error connecting to the database:", err);
        });
};



