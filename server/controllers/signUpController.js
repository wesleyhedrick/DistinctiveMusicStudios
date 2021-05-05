const bcrypt = require('bcryptjs');
const { Teachers } = require('../models');

const createNewUser = async (req, res) => {
    const {
        first,
        last,
        email,
        password,
        instrument_1,
        instrument_2,
        instrument_3,
        instrument_4,
        instrument_5,
        phone

    } = req.body

    const hash = bcrypt.hashSync(password, 10);

    try {
        await Teachers.create({
            first,
            last,
            email,
            hash,
            instrument_1,
            instrument_2,
            instrument_3,
            instrument_4,
            instrument_5,
            phone
        });

        res.send('success')

    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {

            res.send('user exists')
        } else {
            console.log(e)
        }
    };
};

const userNameExists = (req, res) => {
    res.render('user-exists')
};

module.exports = {
    createNewUser,
    userNameExists
}