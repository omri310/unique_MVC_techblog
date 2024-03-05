const router = require('express').Router();
const { User, Project } = require('../models');


router.get('/', async (req, res) => {
    try {
      const dbProjectData = await Project.findAll({
        include: [
          {
            model: User,
            
          },
        ],
      });
  
      const projects = dbProjectData.map((project) =>
        project.get({ plain: true })
      );
      res.render('homepage', {
        projects,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
module.exports = router;