import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../model/user';
import SessionModel from '../../model/session';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

router.get('/login' , (req, res) => {
    return res.render('pages/login.pug')
})

router.post('/login', async (req, res) => {
    const user = await UserModel.findOne({
        username: req.body.email
    });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.render('pages/error.pug', {
            error: `Email not found to login`
        });
    }

    const currentUserSession = await SessionModel.findOne({
        'user._id': user._id
    });

    if (currentUserSession?.lock) {
        return res.render('pages/error', {
            error: 'Have some user using this account'
        })
    }

    const userInfomation = {
        _id: user._id,
        username: user.username
    }

    const uuid = uuidv4();
    const session = await SessionModel.create({
        user: userInfomation,
        lock: uuid
    });

    res.cookie('savedSession', {sessionId: session._id, lock: uuid}, {
        httpOnly: true,
        signed: true
    });
    return res.redirect('/');
});

export default router;