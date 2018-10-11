import {
  isPullRequest,
  isCreatePullRequestURL
} from './pageDetect';

import prTemplate from './prTemplate';
import commentToggle from './commentToggle'

function init() {
  document.addEventListener("DOMContentLoaded", function() {
    if(isPullRequest()) {
      commentToggle();
    } else if (isCreatePullRequestURL) {
      prTemplate();
    }
  });
}

init();