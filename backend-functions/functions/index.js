const functions = require('firebase-functions')
const app = require('express')()
const admin = require('firebase-admin')
admin.initializeApp()

const firebaseConfig = {
  apiKey: "AIzaSyCKeWDaIYsKHM_XSzBti7P-ml58wYtpIsc",
  authDomain: "social-media-app-c6a0e.firebaseapp.com",
  databaseURL: "https://social-media-app-c6a0e.firebaseio.com",
  projectId: "social-media-app-c6a0e",
  storageBucket: "social-media-app-c6a0e.appspot.com",
  messagingSenderId: "817706573148",
  appId: "1:817706573148:web:bf4e6e73d9295013d17599",
  measurementId: "G-ZYYM0L96H3"
};

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const db = admin.firestore()

app.get('/screams', (req, res) => {
  db.firestore().collection('screams').orderBy('createdAt', 'desc').get()
    .then(data => {
      let screams = []
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandler: doc.data().userHandler,
          createdAt: doc.data().createdAt
        })
      })
      return res.json(screams)
    })
    .catch(err => console.log(err))
})

app.post('/scream' , (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandler: req.body.userHandler,
    createdAt: new Date().toISOString()
  }

  db.firestore().collection('screams').add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully`})
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong'})
    })
})

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  let token, userId

  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken'})
      }
      else {
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then(idToken => {
      token = idToken
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      }
      return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
      return res.status(201).json({ token })
    })
    .catch(err => {
      console.error(err)
      if(err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' })
      }
      else {
        return res.status(500).json({ error: err.code})
      }
    })
})

exports.api = functions.https.onRequest(app)