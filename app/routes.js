//
// Routes for Record a Ghost Sighting – Spooky Accessibility Training
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Home and start pages
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/start', function (req, res) {
  res.render('start')
})

// QUESTION 1: Witness details
router.post('/question1', function (req, res) {
  req.session.data['full-name'] = req.body['full-name']
  req.session.data['email'] = req.body['email']
  res.redirect('/question2')
})

// QUESTION 2: Type of ghost sighting (checkboxes)
router.post('/question2', function (req, res) {
  // If a single checkbox is selected, wrap it in an array
  const ghostTypes = req.body['sighting-type']
  req.session.data['sighting-type'] = Array.isArray(ghostTypes)
    ? ghostTypes
    : [ghostTypes].filter(Boolean)
  res.redirect('/question3')
})

// QUESTION 3: Date and location
router.post('/question3', function (req, res) {
  req.session.data['day'] = req.body['day']
  req.session.data['month'] = req.body['month']
  req.session.data['year'] = req.body['year']
  req.session.data['sightingLocation'] = req.body['sightingLocation']
  res.redirect('/question4')
})

// QUESTION 4: Description of ghost
router.post('/question4', function (req, res) {
  req.session.data['sightingDescription'] = req.body['sightingDescription']
  res.redirect('/question5')
})

// QUESTION 5: Activity intensity
router.post('/question5', function (req, res) {
  req.session.data['activity'] = req.body['activity']
  res.redirect('/question6')
})

// QUESTION 6: Evidence upload
router.post('/question6', function (req, res) {
  req.session.data['evidence'] = req.body['evidence'] || 'None'
  res.redirect('/checkanswers')
})

// CHECK ANSWERS
router.post('/checkanswers', function (req, res) {
  res.redirect('/confirmation')
})

// CONFIRMATION PAGE
router.post('/confirmation', function (req, res) {
  res.render('confirmation', { data: req.session.data })
})

// TASKLIST PAGE
router.get('/tasklist', function (req, res) {
  res.render('tasklist')
})

// Guidance pages (for fun extras)
router.get('/guidance', function (req, res) {
  res.render('guidance')
})

router.get('/guidance1', function (req, res) {
  res.render('guidance1')
})

router.get('/guidance2', function (req, res) {
  res.render('guidance2')
})

module.exports = router
