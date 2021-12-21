import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
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

export async function getLeaderboard() {
    let data = []
    let res = await getDocs(leaderboard)
    res.forEach((doc) => {
        data.push(doc.data())
    })
    return data
}
