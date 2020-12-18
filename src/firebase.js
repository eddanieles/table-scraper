import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyCVHSMAtVumuAiabVJ5znLexELRTNIqd4g",
    authDomain: "sports-test-25e87.firebaseapp.com",
    projectId: "sports-test-25e87",
    storageBucket: "sports-test-25e87.appspot.com",
    messagingSenderId: "683965670903",
    appId: "1:683965670903:web:2786e992f29b9dbc40baf2"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const favoritesCollection = db.collection('favorites')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    favoritesCollection
}