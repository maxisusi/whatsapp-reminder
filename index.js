const alarm = require('alarm');
const movieQuote = require('popular-movie-quotes');
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const cancel = alarm.recurring(20000, function () {

    const send = () => {
        const text =
            [
                'Have you studied yet?',
                'Baby are you ready for your driving licence exam? No? Then get back to work',
                `Don't put this away and go study!`,
                'Remember one thing, pain is only temporary. Now GO STUDY!',
                'Only the meaningful things are hard and painful. Now GO STUDY!',
                `I may sometimes sound harsh but it's for your benefit. Go study and
                it will be over! trust me`,
                'We all want results right? Then we should all get back to work',
            ];
        return text[Math.floor(Math.random() * text.length-1) + 1];
    };
    

    const movieQ = movieQuote.getSomeRandom(1);
    client.messages.create({
        from: 'whatsapp:+14155238886',
        to: process.env.NUMBER,
        body: `"${movieQ[0].quote}" - ${movieQ[0].movie} \n \n${send()}`,
            
    }).then(message => console.log(message.sid));

});


