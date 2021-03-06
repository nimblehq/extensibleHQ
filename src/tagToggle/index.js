import firebase from 'firebase/app'
import 'firebase/database'

const repositoryName = () => {
  return JSON.parse(
    document.querySelector('body').getAttribute('data-current-repo')
  ).slug
}

const tagOptions = [
  { text: 'None' },
  { type: 'info', text: 'Revisit' },
  { type: 'warning', text: 'WIP' },
  { type: 'info', text: 'Ready for review' },
  { type: 'danger', text: 'Need to fix' },
]

const savePrTag = async (selectNode, pivotalTrackerId) => {
  if (selectNode.value !== 'None') {
    const selectedTag = tagOptions.filter(
      option => option.text == selectNode.value
    )
    const tag = selectedTag[0]

    firebase
      .database()
      .ref(`${repositoryName()}/prTags/${pivotalTrackerId}`)
      .set(tag)
  } else {
    firebase
      .database()
      .ref(`${repositoryName()}/prTags/${pivotalTrackerId}`)
      .set(null)
  }
}

export default () => {
  const pivotalTrackerId = document.querySelector('.pull-request-title a').text
  const prActions = document.querySelector('#pullrequest-actions')

  const tagSelect = document.createElement('select')
  tagSelect.className = 'tag-toggler'
  tagSelect.addEventListener('change', () =>
    savePrTag(tagSelect, pivotalTrackerId)
  )

  tagOptions.map(option => {
    const selectOption = document.createElement('option')
    selectOption.value = option.text
    selectOption.text = option.text
    tagSelect.append(selectOption)
  })

  prActions.append(tagSelect)
}
