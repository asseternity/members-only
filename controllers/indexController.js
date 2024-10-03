const pool = require('../db/pool');
const bcryptjs = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');

const getIndex = async (req, res, next) => {
    const messages = await prisma.message.findMany({
        include: {
            user: true,
        }
    });
    res.render('index', { currentUser: req.user, messages: messages });
}

const postLogIn = async (req, res, next) => {
    try {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/",
        })(req, res, next);
    } catch(err) {
        return next(err);
    }
}

const getLogOut = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    });
}

const getCreateNewMessage = async (req, res, next) => {
    res.render('create-new-message', { user: req.user });  
}

const postCreateNewMessage = async (req, res, next) => {
    try {
        if (req.user) {
            const message = await prisma.message.create({
                data: {
                    title: req.body.title,
                    text: req.body.text,
                    userId: req.user.id,
                }
            });
            return res.redirect('/');
        } else {
            return res.status(401).send("User not authenticated");
        }
    } catch(err) {
        return next(err);
    }
}

module.exports = { getIndex, postLogIn, getLogOut, getCreateNewMessage, postCreateNewMessage };