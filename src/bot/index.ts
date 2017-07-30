const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
const RTM_EVENTS    = require('@slack/client').RTM_EVENTS

import { handleMessage } from 'josu/bot/handlers/message'
import { slackbot } from 'josu/clients/slackbot'
import { getNotifications, getPullRequests } from 'josu/utils/github'



slackbot.on(RTM_EVENTS.MESSAGE, handleMessage)

slackbot.start()
