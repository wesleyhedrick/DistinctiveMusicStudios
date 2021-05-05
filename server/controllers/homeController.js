const { Teacher } = require('../models');
const bcrypt = require('bcryptjs');

const checkSession = async (req, res) => {
    if (req.session.user_id) {
        console.log('valid session')
        res.json(req.session.user_id)
    } else {
        res.json('null')
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    // console.log('Username: ', username)
    //Store username in session
    // req.session.username = username;
    // Check to see if they exist in the database. If so redirect to quiz selection page

    const teacher = await Teacher.findOne({
        where: {
            email
        }
    })

    if (teacher) {

        //Compare req.body.password with teacher.hash
        const isValid = bcrypt.compareSync(password, teacher.hash);

        //If password matches with hash
        if (isValid) {
            req.session.teacher_id = teacher.id;
            let id = teacher.id
            let first = teacher.first
            //CHANGE LINE BELOW TO A REACT ROUTE
            res.json({ status: 'success', id, first })
        } else {
            res.send({ status: 'no password' })
        }
    } else {
        res.send({ status: 'no teacheremail' })
    }

}

const signOut = async (req, res) => {
    req.session.destroy()
    console.log('session destroyed')
    res.send('goodbye')
}

const signUp = async (req, res) => {
    const { first, last, email, password, phone, instrument_1,
        instrument_2, instrument_3, instrument_4, instrument_5 } = req.body
    const hash = bcrypt.hashSync(password, 10);

    console.log(first, last, email, hash, phone,
        instrument_1, instrument_2, instrument_3,
        instrument_4, instrument_5)

    try {
        await Teacher.create({
            first, last, email, hash, instrument_1, instrument_2,
            instrument_3, instrument_4, instrument_5, phone
        });
        res.send('success')
    } catch (e) {
        if (e.name = 'SequelizeUniqueConstraintError') {
            res.send('user exists')
        }
    };


};

const userNameExists = (req, res) => {
    res.render('user-exists')
};

module.exports = {
    checkSession,
    signIn,
    signOut,
    signUp,
    userNameExists
};

