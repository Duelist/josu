const githubApi = require('github')

const client = new githubApi({ debug: true })
client.authenticate({
  type  : 'token',
  token : process.env.JOSU_GITHUB_TOKEN,
})

module.exports = client
