const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    reservationDate: { type: Date, default: Date.now },
    expirationDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ["pending", "confirmed", "canceled"], 
        default: "pending"
    },
    passengerInfo: { 
        firstName: { type: String, default: null },
        lastName: { type: String, default: null },
        nationalCode: { type: String, default: null },
        birthday: { 
            day: { type: Number, default: null },
            month: { type: Number, default: null },
            year: { type: Number, default: null },
        },
        gender: { type: String, enum: ["male", "female", "other"], default: null },
    }
}, { timestamps: true });

const Reservation = model('reservation', reservationSchema);

module.exports = Reservation;
