//
// Record a Ghost Sighting prototype routes
// GOV.UK Prototype Kit – Department for Supernatural Affairs 👻
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ---------------------------------------------------------
// Start page
// ---------------------------------------------------------
router.get('/start', (req, res) => {
  res.render('start')
})

// ---------------------------------------------------------
// Question 1 – Witness details
// ---------------------------------------------------------
router.post('/question1', (req, res) => {
  const { 'full-name': fullName, email } = req.body
  req.session.data['full-name'] = fullName
  req.session.data['email'] = email
  res.redirect('/question2')
})

// ---------------------------------------------------------
// Question 2 – Type(s) of ghost sighting (checkboxes)
// ---------------------------------------------------------
router.post('/question2', (req, res) => {
  // Handle multiple checkbox values
  let sightings = req.body['sighting-type']
  if (!Array.isArray(sightings)) {
    sightings = sightings ? [sightings] : []
  }
  req.session.data['sighting-type'] = sightings
  res.redirect('/question3')
})

// ---------------------------------------------------------
// Question 3 – Date and location of sighting
// ---------------------------------------------------------
router.post('/question3', (req, res) => {
  const { day, month, year, 'sightingLocation': sightingLocation } = req.body
  req.session.data['day'] = day
  req.session.data['month'] = month
  req.session.data['year'] = year
  req.session.data['sightingLocation'] = sightingLocation
  res.redirect('/question4')
})

// ---------------------------------------------------------
// Question 4 – What did you see?
// ---------------------------------------------------------
router.post('/question4', (req, res) => {
  const { sightingDescription } = req.body
  req.session.data['sightingDescription'] = sightingDescription
  res.redirect('/question5')
})

// ---------------------------------------------------------
// Question 5 – How strong was the supernatural activity?
// ---------------------------------------------------------
router.post('/question5', (req, res) => {
  const { activity } = req.body
  req.session.data['activity'] = activity
  res.redirect('/question6')
})

// ---------------------------------------------------------
// Question 6 – Upload your ghost evidence
// ---------------------------------------------------------
router.post('/question6', (req, res) => {
  // For the prototype, we’ll just capture a filename or placeholder
  const { evidence } = req.body
  req.session.data['evidence'] = evidence || 'No file uploaded'
  res.redirect('/checkanswers')
})

// ---------------------------------------------------------
// Check your answers
// ---------------------------------------------------------
router.post('/checkanswers', (req, res) => {
  res.redirect('/confirmation')
})

// ---------------------------------------------------------
// Confirmation page
// ---------------------------------------------------------
router.get('/confirmation', (req, res) => {
  res.render('confirmation')
})

// ---------------------------------------------------------
// Task list (optional end page)
// ---------------------------------------------------------
router.get('/tasklist', (req, res) => {
  res.render('tasklist')
})

module.exports = router
