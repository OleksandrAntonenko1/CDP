const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test1', {useNewUrlParser: true});
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const key = Buffer.alloc(32); // key should be 32 bytes
const iv = Buffer.alloc(16); // iv should be 16

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: false,
    },
});

UserSchema.pre('save', function (next) {
    const user = this;

    try {
        user.password = encrypt(user.password);
        next();
    } catch (e) {
        next(e);
    }
});

UserSchema.statics.authenticate = ({email, password}, callback) => {
    User.findOne({email: email})
        .exec(
            (err, user) => {
                if (err) {
                    return callback(err)
                } else if (!user) {
                    const err = new Error('User not found.');

                    err.status = 401;

                    return callback(err);
                }
                const decryptedPassword = decrypt(user.password);

                if (decryptedPassword === password) {
                    return callback(null, user);
                }
                return callback(new Error('Wrong password.'));
            });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(text, 'utf8', 'hex');

    crypted += cipher.final('hex');

    return crypted;
};

const decrypt = (text) => {
    const decipher = crypto.createCipheriv(algorithm, key, iv);
    let dec = decipher.update(text, 'hex', 'utf8');

    dec += decipher.final('utf8');

    return dec;
};