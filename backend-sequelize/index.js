require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const trainersRouter = require('./routes/trainers');
const customersRouter = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Gestione Palestra (Sequelize) attiva' });
});

app.use('/api/trainers', trainersRouter);
app.use('/api/customers', customersRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trovata' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Errore interno del server' });
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connessione al database riuscita.');
    app.listen(PORT, () => {
      console.log(`server in ascolto su porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Impossibile connettersi al database:', err.message);
    process.exit(1);
  });
