const express = require('express');
const router = express.Router();
router.get('/health', (_req, res) => res.json({ ok: true, service: 'zero-ghost-api', time: new Date().toISOString() }));
module.exports = router;
