const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const trainersRouter = require('./routes/trainers');
const customersRouter = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'API Gestione Palestra attiva' });
});

// Routers
app.use('/api/trainers', trainersRouter);
app.use('/api/customers', customersRouter);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trovata' });
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Errore interno del server' });
});

app.listen(PORT, () => {
  console.log(`server in ascolto su porta ${PORT}`);
});
