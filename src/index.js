import {
  isPullRequest,
  isCreatePullRequestURL,
  isPullRequestList
} from './pageDetect';

import prTemplate from './prTemplate';
import commentToggle from './commentToggle'
import darkMode from './darkMode'
import draggablePrList from './draggablePrList';
import taggablePr from './taggablePr';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCaC1_ko4Pc21ZWbncVw2oVzTU9GWPkNTA",
  authDomain: "extensible-hq.firebaseapp.com",
  databaseURL: "https://extensible-hq.firebaseio.com",
  projectId: "extensible-hq",
  storageBucket: "extensible-hq.appspot.com",
  messagingSenderId: "553778494819"
};

function init() {
  document.addEventListener("DOMContentLoaded", function() {
    if(isPullRequest()) {
      commentToggle();
      darkMode();
    } else if (isCreatePullRequestURL()) {
      prTemplate();
    } else if (isPullRequestList()) {
      draggablePrList();
      taggablePr();
    }
  });
}

init();
firebase.initializeApp(firebaseConfig);
firebase.database().ref('message/').set({
  message: 'Hello Pong Again',
  story_ids: [1,2,3,4,5]
});
