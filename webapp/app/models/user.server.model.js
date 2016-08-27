/* User schema
 * ===========
 *
 * For the purposes of this implementation, the user schema
 * can be simply composed of username, password, and an 
 * email in case of lost password.
 * Passport essentials are also added to the model.
 * Everything else is
 * superfluous, as we will only have the root user.
 */

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: "Username is required"
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  password: {
    type: String,
    validate: [
    function(password) {
      return password && password.length > 6;
    }, "Password should be longer"
    ]
  },
  admin: {
    type: Boolean,
    default: false
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {}, // OAuth support..
  created: {
    type: Date,
    default: Date.now
  }
});

// Method to avoid saving the raw password into the DB.
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000,
                           64).toString('base64');
}

// Method that passport will use to authenticate the user.
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
}

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', UserSchema);
