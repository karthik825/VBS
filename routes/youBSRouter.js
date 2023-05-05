const express = require('express');
const router = express.Router();
const YouBSController = require('../controllers/youBSController');

router.get('/spoken', YouBSController.getSpoken);
router.get('/spoken/:id', YouBSController.getCertainVideoSpoken);
router.get('/navodaya', YouBSController.getNavodaya);
router.get('/navodaya/:id', YouBSController.getCertainVideoNavodaya);
router.get('/numerology', YouBSController.getNumerology);
router.get('/numerology/:id', YouBSController.getCertainVideoNumerology);
router.get('/horoscopy', YouBSController.getHoroscopy);
router.get('/horoscopy/:id', YouBSController.getCertainVideoHoroscopy);
router.get('/others', YouBSController.getOthers);
router.get('/others/:id', YouBSController.getCertainVideoOthers);


module.exports = router;
