const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');

// Public team routes
router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeamById);

// Admin team routes (if needed, add authentication middleware)
router.post('/', teamController.createTeam);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
