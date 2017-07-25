const github = require('josu/singletons/github')



async function getNotificationsForUser({
  repository,
  userName,
}: {
  repository : string,
  userName   : string,
}) {

  return await github.activity.getNotificationsForUser({
    owner : userName,
    repo  : repository,
  })

}



module.exports = {
  getNotificationsForUser,
}
