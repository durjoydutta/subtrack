import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'user name is required'],
        unique: [true, 'username is taken, please choose another one'],
        trim: true,
        minlength: [3, 'user name must be at least 3 characters long'],
        maxlength: [20, 'user name must be at most 20 characters long']
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: [true, 'email is taken, please choose another one'],
        trim: true,
        maxLength: [255, 'email must be at most 255 characters long'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/, 'please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'user password is required'],
        minLength: [6, 'password must be at least 6 characters long'],
        select: false,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character']
    },
}, {timestamps: true});

export default mongoose.model('User', UserSchema);