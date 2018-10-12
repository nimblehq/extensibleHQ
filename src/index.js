import {
  isPullRequest,
  isCreatePullRequestURL
} from './pageDetect';

import prTemplate from './prTemplate';
import commentToggle from './commentToggle'
import darkMode from './darkMode'

function init() {
  document.addEventListener("DOMContentLoaded", function() {
    if(isPullRequest()) {
      commentToggle();
      darkMode();
    } else if (isCreatePullRequestURL) {
      prTemplate();
    } else {
      console.log('Page not detected')
    }
  });
}

init();