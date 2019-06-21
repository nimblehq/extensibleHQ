import {
  isPullRequest,
  isCreatePullRequestURL,
  isPullRequestList,
} from './pageDetect'

import prTemplate from './prTemplate'
import commentToggle from './commentToggle'
import diffToggle from './diffToggle'
import darkMode from './darkMode'
import draggablePrList from './draggablePrList'
import taggablePr from './taggablePr'
import tagToggle from './tagToggle'
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCaC1_ko4Pc21ZWbncVw2oVzTU9GWPkNTA',
  authDomain: 'extensible-hq.firebaseapp.com',
  databaseURL: 'https://extensible-hq.firebaseio.com',
  projectId: 'extensible-hq',
  storageBucket: 'extensible-hq.appspot.com',
  messagingSenderId: '553778494819',
}

function init() {
  document.addEventListener('DOMContentLoaded', function() {
    firebase.initializeApp(firebaseConfig)
    if (isPullRequest()) {
      tagToggle()
      commentToggle()
      diffToggle()
      darkMode()
    } else if (isCreatePullRequestURL()) {
      prTemplate()
    } else if (isPullRequestList()) {
      taggablePr()
      draggablePrList()
    }
  })
}

init()
