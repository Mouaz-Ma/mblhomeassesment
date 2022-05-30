const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
});

UserSchema.pre('save', function (next) {
    let user = this;
    if ((this.isModified('password') || this.isNew)) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                } else {
                    user.password = hash;
                    next();
                }
            })
        })
    } else {
        return next();
    }
})

UserSchema.methods.comparePassword = function(password, next){
    let user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);