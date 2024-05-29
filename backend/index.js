const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const toolsRoutes = require('./routes/tools');
const responsiblesRoutes = require('./routes/responsibles');
const categoriesRoutes = require('./routes/categories');
const constructionsRoutes = require('./routes/constructions');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017/'; // Conexão local
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/tools', toolsRoutes);
app.use('/api/responsibles', responsiblesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/constructions', constructionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
