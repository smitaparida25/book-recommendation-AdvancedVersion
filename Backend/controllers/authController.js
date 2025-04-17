const nodemailer = require("nodemailer");
const mysql = require("mysql");
const crypto = require("crypto");

const db = mysql.createConnection({
    host: "localhost",
    user: "root@localhost",
    password: "123456",
    database: "BookCommunityApp"
});

exports.signup = async(req, res) => {
    try{
        const {email} = req.body;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        console.log("Signup function called with email:", email);

        if(!email || !emailRegex.test(email)){
            return res.status(400).json({ message: "Please provide a valid email address"});
        }

        const generateSecureOtp = ()=>{
            const otp = crypto.randomInt(100000,1000000);
            return otp.toString();
        }
        const otp = generateSecureOtp();
        res.status(200).json({ message: "Email is valid" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
