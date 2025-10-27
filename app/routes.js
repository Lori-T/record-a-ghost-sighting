//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// -------------------------------------------
// RECORD A GHOST SIGHTING JOURNEY
// -------------------------------------------

// Question 1: Witness details
router.post('/question1', function (req, res) {
  req.session.data['full-name'] = req.body['full-name']
  req.session.data['email'] = req.body['email']
  res.redirect('/question2')
})

// Question 2: Type of ghost sighting
router.post('/question2', function (req, res) {
  req.session.data['sighting-type'] = req.body['sighting-type']
  res.redirect('/question3')
})

// Question 3: Date of sighting
router.post('/question3', function (req, res) {
  req.session.data['day'] = req.body['day']
  req.session.data['month'] = req.body['month']
  req.session.data['year'] = req.body['year']
  res.redirect('/question4')
})

// Question 4: What did you see? + Where did it happen?
router.post('/question4', function (req, res) {
  req.session.data['sightingDescription'] = req.body['sightingDescription']
  req.session.data['sightingLocation'] = req.body['sightingLocation']
  res.redirect('/question5')
})

// Question 5: How strong was the activity
router.post('/question5', function (req, res) {
  req.session.data['activity'] = req.body['activity']
  res.redirect('/question6')
})

// Question 6: Describe what happened
router.post('/question6', function (req, res) {
  req.session.data['activityDetails'] = req.body['activityDetails']
  res.redirect('/checkanswers')
})

// Check Answers
router.post('/checkanswers', function (req, res) {
  res.redirect('/confirmation')
})

// Confirmation
router.post('/confirmation', function (req, res) {
  setTimeout(() => {
    res.redirect('/confirmation')
  }, 500)
})

module.exports = router
