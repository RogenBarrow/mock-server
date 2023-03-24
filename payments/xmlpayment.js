const axios = require('axios');
import xmlPaymentType1 from '../paymentsinfo/paytype1';

const sendXmlPayment = () => {
    axios.post('/', {xmlPaymentType1})
    try {
        (function (response) {
        console.log(response)
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = sendXmlPayment;