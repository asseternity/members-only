const pool = require('../db/pool');
const bcryptjs = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getIndex = async (req, res, next) => {
    res.render('membership');
}

const postIndex = async (req, res, next) => {
    try {
        const currentPasscode = process.env.PASSCODE || 'supersecretpasscode';
        if (req.body.passcode === currentPasscode) {
            const currentUser = req.user;

            if (!currentUser) {
                return res.status(401).send("User not authenticated");
            }

            await prisma.user.update({
                where: { id: req.user.id },
                data: { membershipStatus: "gold" }
            });

            res.redirect('/');
        } else {
            return res.status(403).send("Invalid passcode");
        }
    } catch(err) {
        return next(err);
    }
}

module.exports = { getIndex, postIndex }