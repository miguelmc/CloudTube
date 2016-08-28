var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
  title: {
    type: String,
    required: 'Title cannot be blank'
  },
  links: [String],
  user: {
    type: Schema.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Video', VideoSchema);
