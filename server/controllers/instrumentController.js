const { Instruments } = require('../models');


const getInstruments = async (req, res) => {

    const instruments = await Instruments.findAll();
    res.json(instruments)

}

module.exports = {
    getInstruments
}