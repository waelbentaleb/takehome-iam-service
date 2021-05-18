import mongoose, { Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const userSchema = new Schema(
  {
    fullName: { type: String },
    bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    email: { type: String, lowercase: true },
    address: { type: String },
    apikey: { type: String }
  },
  {
    timestamps: true
  }
)

userSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, deletedBy: true })
export default mongoose.model('User', userSchema)