const githubApi = require('github')

const client = new githubApi({ debug: true })
client.authenticate({
  type     : 'basic',
  username : 'duelist',
  password : '',
})

module.exports = client
