import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    balance: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default model("Account", accountSchema);
