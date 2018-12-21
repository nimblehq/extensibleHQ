import axios from 'axios'
import firebase from 'firebase/app';
import 'firebase/database';

const PIVOTAL_API_KEY = '2ae5a979b9cacdd7a60c6d319d3fe0d7';
const TAG_TYPE = {
  info: {
    tagClass: 'label-tag--info'
  },
  warning: {
    tagClass: 'label-tag--warning'
  },
  danger: {
    tagClass: 'label-tag--danger'
  }
}

const repositoryName = () => {
  return JSON.parse(document.querySelector('body').getAttribute('data-current-repo')).slug;
}

const appendReleaseTag = (node, value) => {
  const label = document.createElement('div');
  label.classList.add('label-tag');
  const labelText = document.createTextNode(value);

  label.append(labelText);
  node.closest('.title').append(label);
}

const appendStatusTag = (node, statusTag) => {
  const label = document.createElement('div');
  label.classList.add('label-tag');
  label.classList.add(TAG_TYPE[statusTag.type].tagClass);
  const labelText = document.createTextNode(statusTag.text);

  label.append(labelText);
  node.closest('.title').append(label);
}

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

  const getProjectStories = async () => {
    const projectId = await firebase.database().ref(`${repositoryName()}/pivotalTrackerId`).once('value');
    const pivotal_url = `https://www.pivotaltracker.com/services/v5/projects/${projectId.val()}/stories/`;
    const requestHeader = { headers: { XTrackerToken: PIVOTAL_API_KEY } };
    return await Promise.all(prIds.map(async (prId) => {
      if (!!prId.id) {
        const response = await axios.get(`${pivotal_url}${prId.id}`, requestHeader);
        return response.data;
      } else {
        return null;
      }
    })
  )};

  const getPrRelease = async () => {
    const projectStories = await getProjectStories();
    projectStories.map(story => {
    if (!!story) {
      story.labels.map((label) => {
        if (!!label.name.match(/\@/)) {
            prLabels.push({
                id: story.id,
                value: label.name.split('@')[1]
              });
          } else {
            prLabels.push({
              id: story.id,
              value: null
            });
          }
        })
      }
    })
  }

  const getPrStatusTags = async () => {
    const prStatusTags = await firebase.database().ref(`${repositoryName()}/prTags`).once('value');
    return prStatusTags.val();
  }

  const tagPrRelease = async () => {
    await getPrRelease();
    const prStatusTags = await getPrStatusTags();

    prIds.map((id) => {
      prLabels.map((prLabel) => {
        if (prLabel.id == id.id) {
          if (!!prLabel.value) {
            appendReleaseTag(id.node, prLabel.value);
          }
        }
      })
      
      if (!!prStatusTags[id.id]) {
        appendStatusTag(id.node, prStatusTags[id.id]);
      }
    })
  }
  
  tagPrRelease();
}