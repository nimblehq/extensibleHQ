import onetime from 'onetime'

const getCleanPathname = () => location.pathname.replace(/^[/]|[/]$/g, '')

export const getRepoURL = onetime(() =>
    location.pathname
        .slice(1)
        .split('/', 2)
        .join('/')
)

const getRepoPath = () => {
  const match = /^[^/]+[/][^/]+[/]?(.*)$/.exec(getCleanPathname())
  return (match && match[1]) || ''
}

export const isPullRequest = () => /^pull-requests\/\d+/.test(getRepoPath())

export const isCreatePullRequestURL = () =>
  getRepoPath() === 'pull-requests/new'
  
export const isPullRequestList = () => getRepoPath() === 'pull-requests'