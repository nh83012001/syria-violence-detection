# syria-violence-detection

Using Neo4j algorithms to aggregate when, where, and data sources for attacks in Syria. Possible algorithms include a similarity measure between posts, so you can create a weighted network and apply community detection. Community detection to cluster posts into events. Centrality as a way to measure influence and dependence.

## Sample Data

The sample data sets are in the sample-datasets folder once complete. This is the order of how we are going to introduce data into neo4j. The example of how to load is in local-db-setup

1. simulated data in tweets.json file

2. [Geoparse data](https://revealproject.eu/geoparse-benchmark-open-dataset/)

3. [~500k tweets related to the Arab Spring in Yemen from](http://dfreelon.org/2012/02/11/arab-spring-twitter-data-now-available-sort-of/)

## Outline

Import data from different social media platforms, then use NLP and neo4j's builtin algorithms to determine the following:

1. Likelihood that the post is related to an attack
2. What kind of attack? (bombing, ied, airstrike)
3. Do we have other content related to this attack? (related time, location, type of attack)
4. Then finally decide on a who/when/where for the attack

### Sprint 1 (3/28-4/3)

#### Goal: Schema, database, data

##### Lane 1 (Complete)

Make all the github issues, create initial load of tasks

##### Lane 2 (Complete)

[Brainstorming algorithms](https://app.milanote.com/1JiuWT1FQqKd8x/hackathon-algorithms)
[Schema creation](https://miro.com/app/board/o9J_ku83kWs=/)

##### Lane 3 (Complete - but will iterate and make more)

Get fake data created in tweets.json

##### Lane 4 (Complete)

Get sample data into the graph (need completion of lane 2 & 3)
Spin up database (just doing locally, see setup in local)

### Sprint 2 (4/3-4/9)

#### Goal: Algorithms

Likelihood that the post is related to an attack
NLP from graphaware

What kind of attack? (bombing, ied, airstrike)
NLP from graphaware

Do we have other content related to this attack? (related time, location, type of attack)
Community detection algorithm

Then finally decide on a who/when/where for the attack
????

### Sprint 3 (4/10-4/15)

Goal: Bring it all together
Using geospatial to put it on a map
Maybe build some sort of 2 day frontend to display the data

## About Hala Systems

Hala is a social enterprise that does early warning systems to save civilian lives in conflict zones and to bring accountability for war crimes. Hala get their information about inbound planes from both people on the ground in Syria and remote sensors. We aggregate that information with previous data, then send warning to individuals via facebook/telegram and audio/visual warning systems (mostly in emergency response centers like hospitals and fire departments).The system reaches an estimated 2.3 million civilians, has saved hundreds of lives, and has prevented thousands of injuries. Sentry Syria, as the system is called, was developed with and for The White Helmets, provides 7-10 minutes of warning, and has reduced the lethality of airstrikes by an estimated 20%-30%.
