//
// Routes for Record a Ghost Sighting – Spooky Accessibility Training
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Home and start pages
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/start', (req, res) => {
  res.render('start')
})

// QUESTION 1: Ghost spotter details
router.get('/question1', (req, res) => {
  res.render('question1', { data: req.session.data })
})
router.post('/question1', (req, res) => {
  req.session.data['full-name'] = req.body['full-name']
  req.session.data['email'] = req.body['email']
  res.redirect('/question2')
})

// QUESTION 2: Type of ghost sighting (checkboxes)
router.get('/question2', (req, res) => {
  res.render('question2', { data: req.session.data })
})
router.post('/question2', (req, res) => {
  const ghostTypes = req.body['sighting-type']
  req.session.data['sighting-type'] = Array.isArray(ghostTypes)
    ? ghostTypes
    : [ghostTypes].filter(Boolean)
  res.redirect('/question3')
})

// QUESTION 3: Date and location
router.get('/question3', (req, res) => {
  res.render('question3', { data: req.session.data })
})
router.post('/question3', (req, res) => {
  req.session.data['day'] = req.body['day']
  req.session.data['month'] = req.body['month']
  req.session.data['year'] = req.body['year']
  req.session.data['sightingLocation'] = req.body['sightingLocation']
  res.redirect('/question4')
})

// QUESTION 4: Description of ghost
router.get('/question4', (req, res) => {
  res.render('question4', { data: req.session.data })
})
router.post('/question4', (req, res) => {
  req.session.data['sightingDescription'] = req.body['sightingDescription']
  res.redirect('/question5')
})

// QUESTION 5: Activity intensity
router.get('/question5', (req, res) => {
  res.render('question5', { data: req.session.data })
})
router.post('/question5', (req, res) => {
  req.session.data['activity'] = req.body['activity']
  res.redirect('/question6')
})

// QUESTION 6: Evidence upload
router.get('/question6', (req, res) => {
  res.render('question6', { data: req.session.data })
})
router.post('/question6', (req, res) => {
  // Store uploaded file name or placeholder text
  req.session.data['ghostFile'] = req.body['ghostFile'] || 'No evidence uploaded'
  res.redirect('/checkanswers')
})

// CHECK ANSWERS
router.get('/checkanswers', (req, res) => {
  res.render('checkanswers', { data: req.session.data })
})
router.post('/checkanswers', (req, res) => {
  res.redirect('/confirmation')
})

// CONFIRMATION PAGE
router.get('/confirmation', (req, res) => {
  res.render('confirmation', { data: req.session.data })
})
router.post('/confirmation', (req, res) => {
  res.render('confirmation', { data: req.session.data })
})

// TASKLIST PAGE
router.get('/tasklist', (req, res) => {
  res.render('tasklist')
})

// GUIDANCE PAGES – spooky extras
router.get('/guidance', (req, res) => {
  res.render('guidance')
})

router.get('/guidance1', (req, res) => {
  res.render('guidance1')
})

router.get('/guidance2', (req, res) => {
  res.render('guidance2')
})

module.exports = router
