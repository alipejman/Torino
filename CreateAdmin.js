const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminModel = require("./src/modules/admin/admin.model");

// عرفان جان برای ایجاد ادمین این فایلو ران کن (node CreateAdmin.js)

mongoose.connect("mongodb://localhost:27017/Torino")
    .then(async () => {
        const username = "admin";
        const password = "password123";
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new adminModel({
            username,
            password: hashedPassword,
            email: "admin@example.com",
            permissions: [
                "get-posts",
                "create-post",
                "update-post",
                "delete-post",
                "get_users",
                "delete_user",
            ],
        });

        await newAdmin.save();
        console.log("Admin Created SuccessFully ✅");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error(err);
        mongoose.connection.close();
    });
