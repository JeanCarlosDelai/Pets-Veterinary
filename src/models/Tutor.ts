import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
interface Tutor extends Document {
  id: number;
  name: string;
  password: string;
  phone?: string;
  email: string;
  date_of_birth?: string;
  zip_code?: string;
  pets: mongoose.Types.ObjectId[];
}

const TutorSchema: Schema<Tutor> = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    maxlength: 50,
    minlength: 3,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Please provide phone'],
    maxlength: 20,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  date_of_birth: {
    type: String,
    trim: true,
    required: [true, 'Please provide date of birth'],
    maxlength: 30,
  },
  zip_code: {
    type: String,
    trim: true,
    required: [true, 'Please provide zip code'],
    maxlength: 20,
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
    },
  ],
});

TutorSchema.pre<Tutor>('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

TutorSchema.methods.comparePassword = async function (canditatePassword: any) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default mongoose.model<Tutor>('Tutor', TutorSchema);
