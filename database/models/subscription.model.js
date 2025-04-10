import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'subscription name is required'],
        trim: true,
        minlength: [3, 'subscription name must be at least 3 characters long'],
        maxlength: [20, 'subscription name must be at most 20 characters long']
    },
    price: {
        type: Number,
        required: [true, 'subscription price is required'],
        min: [0, 'subscription price must be at least 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        enum: ['basic', 'premium', 'enterprise'],
        default: 'basic',
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    paymentMethod: {
        type: String,
        enum: ['credit card', 'paypal', 'stripe', 'bitcoin', 'bank transfer'],
        required: [true, 'subscription payment method is required']
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: [true, 'subscription start date is required'],
        validate: {
            validator: (value) => (value <= Date.now()),
            message: props => `${props.value} is not a valid start date`
        }
    },
    renewalDate: {
        type: Date,
        required: [true, 'subscription renewal date is required'],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: props => `${props.value} is not a valid renewal date`
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'subscription user is required'],
        index: true,
    },
}, {timestamps: true});


SubscriptionSchema.pre('save', function(next) {
    // calculate renewal date based on startDate and frequency
    if (!this.renewalDate || this.isModified('startDate')) {
        const renewalPeriod = {
            'weekly': 7,
            'monthly': 30,
            'yearly': 365
        }
        this.renewalDate = new Date(this.startDate.getDate() + renewalPeriod[this.frequency]);
    }
    // update the status of subscription to expired if renewal Date has passed
    if (this.renewalDate < Date.now()) {
        this.status = 'expired';
    }

    next();
})

export default mongoose.model('Subscription', SubscriptionSchema);