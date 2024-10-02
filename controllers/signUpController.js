const pool = require('../db/pool');
const bcryptjs = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getIndex = async (req, res, next) => {
    res.render('sign-up');
}

const postIndex = async (req, res, next) => {
    try {
        if (req.body.password !== req.body.cpassword) {
            return res.status(400).send("Passwords do not match");
        }
        bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
            await prisma.user.create({
                data: {
                    email: req.body.email,
                    firstName: req.body.fname,
                    lastName: req.body.lname,
                    membershipStatus: "basic",
                    password: hashedPassword,
                }
            });
            res.redirect('/');
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = { getIndex, postIndex };