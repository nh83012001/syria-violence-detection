
// ************Script for loading tweets

CALL apoc.load.json("file://tweets.json") YIELD value
UNWIND value.statuses as status

WITH status, status.user as u, status.entities as e

// create a node for the original tweet
MERGE(tweet: Tweet { id: status.id })
ON CREATE SET tweet.text = status.text, tweet.created_at = status.created_at, tweet.geo = status.geo, tweet.coordinates = status.coordinates, tweet.place = status.place, tweet.possibly_sensitive = status.possibly_sensitive, tweet.possibly_sensitive_appealable = status.possibly_sensitive_appealable, tweet.lang = status.lang

// create a node for the user
MERGE(user: User { name: u.screen_name })
ON CREATE SET user.location = u.location, user.id = u.id, user.lang = u.lang, user.verified = u.verified, user.geo_enabled = u.geo_enabled, user.created_at = u.created_at, user.time_zone = u.time_zone, user.statuses_count = u.statuses_count
MERGE(user) - [: POSTED] -> (tweet)

// add in all the entities the user mentions in the tweet
FOREACH(mention IN e.user_mentions | MERGE(mentionedUser: User { name: mention.screen_name }) MERGE(tweet) - [: MENTIONED_USER] -> (mentionedUser))
FOREACH(hashtag IN e.hashtags | MERGE(mentionedHashtag: Hashtag { text: hashtag.text }) MERGE(tweet) - [: MENTIONED_HASHTAG] -> (mentionedHashtag))
FOREACH(symbol IN e.symbols | MERGE(mentionedSymbol: Symbol { text: symbol.text }) MERGE(tweet) - [: MENTIONED_SYMBOL] -> (mentionedSymbol))
FOREACH(url IN e.urls | MERGE(mentionedUrl: Url { url: url.url }) MERGE(tweet) - [: MENTIONED_URL] -> (mentionedUrl))
FOREACH(media IN e.media | MERGE(mentionedMedia: Media { media_url: media.media_url, type: media.type }) MERGE(tweet) - [: MENTIONED_MEDIA] -> (mentionedMedia))


// // ************Script for loading keyword hierarchy
CALL apoc.load.json("file://keywords.json") YIELD value
UNWIND value.keywordHierarchy as subject
WITH subject
CALL apoc.create.node([subject.node], { words: subject.words }) YIELD node
RETURN subject

