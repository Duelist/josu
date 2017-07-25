const githubUtil = require('josu/utils/github')

githubUtil.getNotificationsForUser({
  repository : 'pumpup',
  userName   : 'duelist',
}).then(response => {
  console.log(response)
})
