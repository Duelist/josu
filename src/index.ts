const githubUtil = require('josu/utils/github')

console.log('test: get notifications')
githubUtil.getNotifications({
  owner         : 'pumpupapp',
  participating : false,
  repository    : 'pumpup',
}).then(response => {

  console.log('response')
  console.log(response)
  console.log('subjects')
  console.log(response.data.map(x => x.subject))

})



console.log('test: get pull requests')
githubUtil.getPullRequests({
  owner      : 'pumpupapp',
  repository : 'pumpup',
}).then(response => {

  const login        = 'duelist'
  const pullRequests = response.data

  console.log('pull requests')
  console.log(pullRequests.map(x => x.title))
  console.log('assignees')
  console.log(pullRequests.map(x => ({ [x.user.login]: x.assignees.map(a => a.login) })))
  console.log('assigned pull requests')
  console.log(
    pullRequests
      .filter(pullRequest => (
        pullRequest.assignees
          .map(assignee => assignee.login.toLowerCase())
          .find(assigneeLogin => assigneeLogin === login)
        !== undefined
      ))
      .map(pullRequest => ({
        title      : pullRequest.title,
        assignedBy : pullRequest.user.login,
        assignees  : pullRequest.assignees.map(assignee => assignee.login),
      }))
  )

})
