const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// router.get('/', (req, res) => {
//     // Since we're using a template engine, we can now use res.render and specify which template we want to use - in this case, that's the homepage. 
//     res.render('homepage', {
//         id: 1,
//         post_url: 'https://handlebarsjs.com/guide/',
//         title: 'Handlebars Docs',
//         created_at: new Date(),
//         vote_count: 10,
//         comments: [{}, {}],
//         user: {
//             username: 'test_user'
//         }
//     });
// });

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // loops over each Sequelize object into a serialized version of itself (preventing Handlebars from denying the object since it isn't its own property), saving in a new posts array. 
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
    //   If you're already logged in, automatically redirects you back to the homepage - should probably give some sort of notification, but doesn't right now. 
      if (req.session.loggedIn) {
          return res.redirect('/');
      }
    res.render('login');
})

module.exports = router;