const functions = require('firebase-functions')
const app = require('express')()

const fbAuth = require('./util/fbAuth')

const { getAllScreams, postOneScream, getScream, commentOnScream, likeScream, unlikeScream, deleteScream } = require('./handlers/screams')
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users')

//scream routes
app.get('/screams', getAllScreams)
app.post('/scream', fbAuth, postOneScream)
app.get('/scream/:screamId', getScream)
app.delete('/scream/:screamId', fbAuth, deleteScream)
app.get('/scream/:screamId/like', fbAuth, likeScream)
app.get('/scream/:screamId/unlike', fbAuth, unlikeScream)
app.post('/scream/:screamId/comment', fbAuth, commentOnScream)

//users routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', fbAuth, uploadImage)
app.post('/user', fbAuth, addUserDetails)
app.get('/user', fbAuth, getAuthenticatedUser)

exports.api = functions.https.onRequest(app)