const express = require('express');
const router = express.Router();
const cykorctrl = require('../core/cykorctrl');
const cykorauth = require('../auth/cykorauth');

router.get('/', cykorctrl.read);
router.post('/', cykorauth, cykorctrl.add);
router.put('/:id', cykorauth, cykorctrl.edit);
router.delete('/:id', cykorauth, cykorctrl.del);

module.exports = router;
