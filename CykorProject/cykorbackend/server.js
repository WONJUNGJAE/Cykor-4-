const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cykorroute = require('./route/cykorroute');
const cykoruserroute = require('./route/cykoruserroute');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/cykor', cykorroute);
app.use('/api/user', cykoruserroute);

app.listen(5000, () => {
  console.log('서버가 5000번 포트에서 시작됨');
});
