const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmailSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    content: String,
    isRead: {
        typer: Boolean,
        default: false
    }
});


module.exports = mongoose.model('email', EmailSchema);