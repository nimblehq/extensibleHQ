import {
  isPullRequest
} from './pageDetect'

function init() {
  if(isPullRequest()) {
    console.log('Pull Request page')
  } else {
    console.log('Page not detected')
  }
}

init();