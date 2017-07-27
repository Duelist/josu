const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
const RTM_EVENTS    = require('@slack/client').RTM_EVENTS

const slackBotClient = require('josu/clients/slackbot')
const githubUtil     = require('josu/utils/github')



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



slackBotClient.on(CLIENT_EVENTS.RTM.AUTHENTICATED, data => {
  console.log('ibtest on start')
  console.log('My id: ', data.self.id)
  console.log('My name: ', data.self.name)
})
slackBotClient.on(RTM_EVENTS.MESSAGE, data => {
  console.log('ibtest', data)
  if (data.type === 'message' && data.subtype !== 'bot_message') {
    slackBotClient.sendMessage(
      [
        'Hi ',
        slackBotClient.dataStore.users[data.user].profile.first_name,
        '!'
      ].join(''),
      data.channel,
    )
  }
})

slackBotClient.start()
