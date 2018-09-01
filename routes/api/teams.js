const express = require('express');
const router = express.Router();

// Team Model
const Team = require('../../models/Team');

// @route   GET api/teams
// @desc    Get All Teams
// @access  Private
router.get('/', (req, res) => {
  Team.find()
    .then(teams => res.json(teams));
});

// @route   POST api/teams
// @desc    Create A Team
// @access  Private
router.post('/', (req, res) => {
  const newTeam = new Team({
    name: req.body.name
  });

  newTeam.save().then(team => res.json(team));
});

// @route   DELETE api/teams/:id
// @desc    Delete A Team
// @access  private
router.delete('/:id', (req, res) => {
  Team.findById(req.params.id)
    .then(team => team.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;