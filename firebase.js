import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
    limit
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
const firebaseConfig = {
    apiKey: 'AIzaSyCRBXwHAHWy0eFcv77AKNr8DN6iFzE3uzI',
    authDomain: 'cuphead-pp.firebaseapp.com',
    projectId: 'cuphead-pp',
    storageBucket: 'cuphead-pp.appspot.com',
    messagingSenderId: '577093620603',
    appId: '1:577093620603:web:18828992663e55db39e3de',
    measurementId: 'G-1FET3QDPH9'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore()
const leaderboard = collection(db, 'leaderboard')
export async function addEntry(level, time) {
    let username = localStorage.getItem('username')
    if (username) {
        const docRef = await addDoc(leaderboard, {
            name: username,
            time,
            level
        })
        return docRef.id
    }
}
export async function getLeaderboard(level) {
    let topQ = query(
        leaderboard,
        where('level', '==', level),
        orderBy('time', 'asc'),
        limit(10)
    )
    let myQ = null
    if (localStorage.getItem('username')) {
        myQ = query(
            leaderboard,
            where('level', '==', level),
            where('name', '==', localStorage.getItem('username')),
            orderBy('time', 'asc'),
            limit(1)
        )
    }
    let [topRef, myRef] = await Promise.all([
        getDocs(topQ),
        myQ ? getDocs(myQ) : null
    ])
    let top = []
    let my = {}
    if (topRef) {
        topRef.forEach((doc) => {
            top.push(doc.data())
        })
    }
    if (myRef) {
        myRef.forEach((doc) => {
            my = doc.data()
        })
    }

    return { top, my }
}
