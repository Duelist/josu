const githubClient = require('josu/clients/github')
const TIME         = require('josu/constants/time')



/**
 * Handle Github utility errors.
 */
function _handleError(error) {
  console.error(error.message)
}



/**
 * Get the pull requests for a user in a specific repository.
 */
async function getPullRequests({
  owner,
  repository,
}: {
  owner      : string,
  repository : string,
}): Promise<Object[]> {

  return await githubClient.pullRequests.getAll({
    owner,
    repo: repository,
  })
    .catch(_handleError)

}



/**
 * Get the notifications for a user in a specific repository.
 */
async function getNotifications({
  owner,
  participating = true,
  repository,
  since = new Date(Date.now() - TIME.DAY),
}: {
  owner          : string,
  participating? : boolean,
  repository     : string,
  since?         : Date,
}): Promise<Object[]> {

  const args = {
    owner,
    participating,
    repo: repository,
  }

  if (since) {
    args['since'] = since.toISOString()
  }

  return await githubClient.activity.getNotificationsForUser(args)
    .catch(_handleError)

}



module.exports = {
  getPullRequests,
  getNotifications,
}
