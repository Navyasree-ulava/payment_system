import express from "express";
import authMiddleware from "../middleware.js";
import accountModel from "../accountModel.js";
import mongoose from "mongoose";
import zod from "zod";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await accountModel.findOne({
        userId: req.userId
    })

    if(!account){
        return res.status(404).json({
            message: "Account not found"
        })
    }

    res.json({
        balance: account.balance
    })
});

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
})

router.post("/transfer", authMiddleware, async (req, res) => {

    const { success } = transferSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Invalid inputs"
        })
    }

    const { to, amount } = req.body;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const account = await accountModel.findOne({
            userId: req.userId
        }).session(session);

        if(!account || account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await accountModel.findOne({
            userId: to
        }).session(session);

        if(!toAccount){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await accountModel.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session);

        await accountModel.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        }).session(session);

        await session.commitTransaction();
        session.endSession();

        res.json({
            message: "Transfer successful"
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            message: "Error while transferring"
        })
    }

})

export default router;
