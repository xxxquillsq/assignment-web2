import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const PersonSchema = new Schema({
    adult: { type: Boolean },
    gender:{type:Number},
    id: { type: Number, required: true, unique: true },
    known_for_department: { type: String },
    name: { type: String },
    popularity:{type:Number},
    profile_path: { type: String },
});

PersonSchema.statics.findByPersonDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Persons', PersonSchema);

