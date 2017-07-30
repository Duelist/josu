const _ = require('lodash')

import { getNotifications, getPullRequests } from 'josu/utils/github'
import { slackbot } from 'josu/clients/slackbot'



async function handleMessage(data: Object) {

  if (data['type'] === 'message' && data['subtype'] !== 'bot_message') {


    console.log('test: get notifications')
    const notificationsResponse = await getNotifications({
      owner         : 'pumpupapp',
      participating : false,
      repository    : 'pumpup',
    })
    const notifications = notificationsResponse['data']

    if (!_.isEmpty(notifications)) {
      slackbot.sendMessage(
        notifications.map(x => x.subject).join(', ')),
        data['channel']
      )
    }



    const pullRequestsResponse = await getPullRequests({
      owner      : 'pumpupapp',
      repository : 'pumpup',
    })

    const login        = 'duelist'
    const pullRequests = pullRequestsResponse['data']
    const assignedPullRequests = pullRequests.filter(pullRequest => (
      pullRequest.assignees
        .map(assignee => assignee.login.toLowerCase())
        .find(assigneeLogin => assigneeLogin === login)
      !== undefined
    ))

    if (!_.isEmpty(assignedPullRequests)) {

      const formattedPullRequests = assignedPullRequests.map(
        pullRequest => pullRequest.title
      )

      slackbot.sendMessage(formattedPullRequests.join(', '), data['channel'])

    }

    if (_.isEmpty(notifications) && _.isEmpty(assignedPullRequests)) {

      slackbot.sendMessage(
        [
          'Nothing to report, ',
          slackbot.dataStore.users[data['user']].profile.first_name,
          '.'
        ].join(''),
        data['channel'],
      )

    }

  }

}



export { handleMessage }
