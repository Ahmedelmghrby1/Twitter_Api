import { model, Schema } from "mongoose"


const schema = new Schema({
    account: String,
    ticker: String,
    mentions: Number,
    timestamp: { type: Date, default: Date.now }
})

export const Mention = model ('Mention', schema)