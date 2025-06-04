const express = require('express');
const router = express.Router();
const cykoruserctrl = require('../core/cykoruserctrl');

router.post('/reg', cykoruserctrl.reg);
router.post('/login', cykoruserctrl.login);
router.get('/me', cykoruserctrl.me);

module.exports = router;
