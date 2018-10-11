import {
  isPullRequest
} from './pageDetect'
import commentToggle from './commentToggle'

function init() {
  document.addEventListener('DOMContentLoaded',function(){
    if(isPullRequest()) {
      commentToggle();
    } else {
      console.log('Page not detected')
    }
  });
}

init();