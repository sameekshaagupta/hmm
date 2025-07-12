const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Adjust regex if needed
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v); // Indian pincode format
      },
      message: props => `${props.value} is not a valid pincode!`
    }
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  points: {
    type: Number,
    default: 100
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.passwordHash;
      return ret;
    }
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare plain password with hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
