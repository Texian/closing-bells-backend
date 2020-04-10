const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = ('../middleware/verification');