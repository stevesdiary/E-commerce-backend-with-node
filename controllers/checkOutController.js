const { Cart, User, Product, Variation } = require('../models');
const { checkout } = require('../routes/variation');
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);


const checkOutController = {
  checkOut: async (req, res) => {
    try{
      const payload = {
        "tx_ref": "MC-1585230950508",
        "amount": "1500",
        "email": "johnmadakin@gmail.com",
        "phone_number": "054709929220",
        "currency": "NGN",
        "client_ip": "154.123.220.1",
        "device_fingerprint": "62wd23423rq324323qew1",
        "narration": "All star college salary for May",
        "is_permanent": false,
        "expires": 3600
    }

    const response = await flw.Charge.bank_transfer(payload)
    console.log(response);
      // const checkOutCart = await Cart.create()
    }
    catch(err){
      console.log('An error occoured!', err);
      res.status(500).send({message: 'Error showed up', err})
    };
  }
}

module.exports = checkOutController;