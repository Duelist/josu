const RtmClient       = require('@slack/client').RtmClient
const MemoryDataStore = require('@slack/client').MemoryDataStore;



module.exports = new RtmClient(
  '',
  { dataStore: new MemoryDataStore() }
)
