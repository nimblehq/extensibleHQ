import axios from 'axios'

const PIVOTAL_API_KEY = '2ae5a979b9cacdd7a60c6d319d3fe0d7';
const PIVOTAL_URL = 'https://www.pivotaltracker.com/services/v5/projects/1939533/stories/';

export default () => {
  let prTitles = [];
  let prLabels = [];
  const prNodes = document.querySelectorAll('.pull-request-title')
  
  prNodes.forEach((node) => prTitles.push(node.getAttribute('title')));

  const prIds = prTitles.map((title, index) => {
    return {
      id: title.match(/\[\#(\d+)\]/) && title.match(/\[\#(\d+)\]/)[1],
      node: prNodes[index]
    };
  });

  Promise.all(prIds.map((prId) => {
    const requestHeader = { headers: { XTrackerToken: PIVOTAL_API_KEY } }
    if (!!prId.id) {
      return axios.get(`${PIVOTAL_URL}${prId.id}`, requestHeader) 
    } else {
      Promise.resolve();
    }
  }))
  .then((responses) => {
    responses.map(response => {
      if (!!response) {
        response.data.labels.map((label) => {
          if (!!label.name.match(/\@/)) {
            prLabels.push({
              id: response.data.id,
              value: label.name.split('@')[1]
            });
          }
        })
      }
    })

    prIds.map((id) => {
      prLabels.map((prLabel) => {
        if (prLabel.id == id.id) {
          const label = document.createElement('div');
          label.classList.add('label-tag');
          const labelText = document.createTextNode(prLabel.value);
      
          label.append(labelText);
          id.node.closest('.title').append(label);
        }
      })
    })
  })
}