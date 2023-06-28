const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Vonage } = require('@vonage/server-sdk')
const cors = require('cors');
app.use(cors());
const vonage = new Vonage({
  apiKey: "bb0ef9dc",
  apiSecret: "vpcUD5yOYmvmBMyM"
})

async function sendSMS(to, from, text) {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

// Rutas
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para recibir los parámetros del formulario POST
app.post('/sendMessage', (req, res) => {
  const from = req.body.from;
  const message = req.body.message;
  const to = req.body.to;

  try {
    sendSMS(to, from, message);
    res.send('Mensaje Enviado');
    console.log('Form:', form);
    console.log('Message:', message);
  } catch(e) {
    res.send('Error enviando el mensaje');
  }  
});

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
