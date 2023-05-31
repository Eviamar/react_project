import express from "express";
import Account from '../models/account.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const router = express.Router();

router.post("/createAccount", async(req,res)=>{
    const user = req.body.user;
    const id = new mongoose.Types.ObjectId();
    Account.findOne({email: user.email })
    .then(async account =>{
        if(account){
            return res.status(401).json({
                message: "Email already registered"
            })
        }
        else{
            const hash = await bcryptjs.hash(user.password,10);
            const _account = new Account(
                {
                    _id:id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: hash,
                    verificationCode: generateRandomIntegerInRange(1000,9999),
                    mobile: user.mobile,   
                }
            );
            _account.save()
            .then(accountCreated=>{
                return res.status(200).json({
                    message: accountCreated
                })
            })
            .catch(error=>{
                return res.status(500).json({
                    message: error.message
                })
            })
        }
    })
    .catch(error=>{
        return res.status(500).json({
            message: error.message
        })
    })
})

router.put('/getNewCode',async(req,res)=>{
    const verify =  req.body.user;
    Account.findOne({email:verify.email})
    .then(account=>{
        account.verificationCode=generateRandomIntegerInRange(1000,9999);
        //account.isVerified=false;
        account.save();
        return res.status(200).json({
            message: `${account.verificationCode}`
        })      
    })
    .catch(error=>{
        return res.status(500).json({
            message: error.message
        })
    })
})
router.put('/updatePassword',async(req,res)=>{
    const verify =  req.body.verify;
    const hash = await bcryptjs.hash(verify.password,10);
    Account.findOne({email:verify.email,verificationCode:verify.verificationCode})
    .then(account=>{
        
        account.password=hash;
        account.verificationCode=null;
        account.save();
        return res.status(200).json({
            message: `Account ${account.firstName} updated`
        })      
    })
    .catch(error=>{
        
        return res.status(500).json({
            message: error.message
        })
    })
})


router.put('/verifyAccount',async(req,res)=>{
    const verify =  req.body.verify;
    Account.findOne({email:verify.email,verificationCode:verify.verificationCode})
    .then(account=>{
        if(account.isVerified)
        {
            return res.status(200).json({
                message: `Account ${account.firstName} already verified`
            })
        }
        account.isVerified=true;
        account.verificationCode = null;
        account.save();
        return res.status(200).json({
            message: `Account ${account.firstName} verified`
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message: error.message
        })
    })
})

router.post("/login", async(req,res)=>{
    const user = req.body.user;
    Account.findOne({email:user.email})
    .then(async account=>{
        if(account)
        {
            const isMatch = await bcryptjs.compare(user.password,account.password);
            if(isMatch)
            {
                if(account.isVerified)
                {
                    const dataToToken = {
                        _id:account.id,
                        firstName:account.firstName,
                        lastName:account.lastName,
                        email:account.email,
                        isAdmin:account.isAdmin
                    }   
                    const token = await jwt.sign({dataToToken},process.env.JWT_KEY);
                    return res.status(200).json({
                        message: dataToToken //ask Eli how to work with passing token and decode in client side?
                    })

                }
                else
                {
                    return res.status(401).json({
                        message: 'Account is not verified'
                    })
                }
            }
            else
            {
                return res.status(401).json({
                    message: 'Incorrect password'
                })
            }
        }
        else
        {
            return res.status(401).json({
                message: 'Account not exist'
            })
        }

    })
    .catch(error=>{
        return res.status(500).json({
            message: error.message
        })
    })
})

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default router;