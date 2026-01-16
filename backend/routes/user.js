import express from "express";
import zod from "zod";
import { User } from "../userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middleware.js";
import accountModel from "../accountModel.js";
dotenv.config();

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post('/signup', async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken /  Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    if(user) {
        return res.status(411).json({
            message: "Email already taken /  Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);

    const userId = dbUser._id;

    const account = await accountModel.create({
        userId,
        balance: 1+Math.random() * 10000
    })

    const token = jwt.sign({
        userId: userId
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })

    return res.status(201).json({
        message: "User created successfully",
        user: dbUser
    })
});

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post('/signin', async (req, res) => {
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if (!success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);

        res.json({
            token: token
        })

        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })

});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if(!success) {
        res.status(411).json({
            message: "Error while updating user"
        })
    }

    await User.updateOne(
        { _id: req.userId }, 
        { $set: req.body }
    )

    res.json({
        message: "User updated successfully"
    })
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
     _id: { $ne: req.userId }, 
     $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export default router;
