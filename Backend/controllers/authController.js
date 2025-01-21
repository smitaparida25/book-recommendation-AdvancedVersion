const nodemailer = require("nodemailer");
const mysql = require("mysql");
const crypto = require("crypto");

const db = mysql.createConnection({
    host: "localhost",
    user: "root@loacalhost",
    password: " 123456",
    database: "BookCommunityApp"
});
