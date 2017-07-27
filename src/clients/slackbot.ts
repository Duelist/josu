const RtmClient       = require('@slack/client').RtmClient
const MemoryDataStore = require('@slack/client').MemoryDataStore;



module.exports = new RtmClient(
  process.env.JOSU_SLACK_TOKEN,
  { dataStore: new MemoryDataStore() }
)
