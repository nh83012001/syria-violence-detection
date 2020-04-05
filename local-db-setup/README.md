# Running local database/uploading json of tweets to it/getting setup for NLP and Algorithms playground

- Download Neo4j desktop (do an update if already installed)
- Start a database 3.5.17
- Add Apoc and Graph Algorithms plugins at the bottom of the summary page
- Click the 3 horizontal dots on summary page next to your database, choose ‘Manage’
- Click on settings and add the following statement
    `apoc.import.file.enabled=true`
- Put the json file in here inside of the folder that shows up when you Open Folder, then Import
- Start your database, click open on front page (‘open with neo4j browser’), Run top script “Script for loading tweets” in here
- Go [here](https://products.graphaware.com/) and download latest of nlp, graphaware server all, and nlp-stanfordnlp
- Go [here](https://stanfordnlp.github.io/CoreNLP/#download) and download the english (not english KBP) .jar file that is on top in the list
- Put all those in a folder called NLP locally
- Copy and paste them into the plugins folder by clicking plugins in the ‘open folder’ part of manage database
- Put these lines inside of your config file
```dbms.unmanaged_extension_classes=com.graphaware.server=/graphaware```
```com.graphaware.runtime.enabled=true```
```com.graphaware.module.NLP.1=com.graphaware.nlp.module.NLPBootstrapper```

```javascript
dbms.security.procedures.whitelist=ga.nlp._
```
Restart your database and open up your browser Run the following statements 1 by 1 in the browser

```CREATE CONSTRAINT ON (n:AnnotatedText) ASSERT n.id IS UNIQUE;```

```CREATE CONSTRAINT ON (n:Tag) ASSERT n.id IS UNIQUE;`CREATE CONSTRAINT ON (n:Sentence) ASSERT n.id IS UNIQUE; ```

```CREATE INDEX ON :Tag(value);```

```CALL ga.nlp.config.setDefaultLanguage('en')`CALL ga.nlp.processor.addPipeline({textProcessor: 'com.graphaware.nlp.processor.stanford.StanfordTextProcessor', name: 'customStopWords', processingSteps: {tokenize: true, ner: true, dependency: false}, stopWords: '+,result, all, during', threadNumber: 20})```

```CALL ga.nlp.processor.pipeline.default('customStopWords')```


Run these one at a time
```javascript
MATCH (t:Tweet)
CALL ga.nlp.detectLanguage(t.text)
YIELD result
SET t.language = result
RETURN count(t);
```

```javascript
MATCH (t:Tweet { language: "en" })
CALL ga.nlp.annotate({text: t.text, id: id(t), pipeline: 'customStopWords'})
YIELD result
MERGE (t)-[:HAS_ANNOTATED_TEXT]->(result)
RETURN count(result);
```




Good resources for much of the above are in the following articles
[Neo4j using NLP](https://medium.com/neo4j/using-nlp-in-neo4j-ac40bc92196f)
[Graph Data Science Library](https://medium.com/neo4j/the-graph-algorithms-playground-and-graph-data-science-library-69575a0fb329)
