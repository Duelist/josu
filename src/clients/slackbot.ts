const RtmClient       = require('@slack/client').RtmClient
const MemoryDataStore = require('@slack/client').MemoryDataStore



const slackbot = new RtmClient(
  process.env.JOSU_SLACK_TOKEN,
  { dataStore: new MemoryDataStore() }
)



export { slackbot }
