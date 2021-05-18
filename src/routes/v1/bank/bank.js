import mongoose, { Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const bankSchema = new Schema(
  {
    bic: { type: String },
    name: { type: String },
    address: { type: String },
    swift: { type: String },
    apikey: { type: String }
  },
  { timestamps: true }
)

bankSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, deletedBy: true })
export default mongoose.model('Bank', bankSchema)