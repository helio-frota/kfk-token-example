# kfk-token-example
oauthbearer authentication example using Red Hat OpenShift Streams for Apache Kafka and KafkaJS

1. Go to [Get started with Red Hat OpenShift Streams for Apache Kafka](https://developers.redhat.com/products/red-hat-openshift-streams-for-apache-kafka/getting-started) 

2. Create kafka instance

3. Create a topic called test-topic (or change the topic name in the source code)

4. Save each required the information for the following constants:

```js
const CLIENT_ID = '';

const CLIENT_SECRET = '';

const TOKEN_ENDPOINT_URL = '';

const BOOTSTRAP_SERVER = '';
```

5. Run the code

```
npm i
node main.js
```

logLevel: logLevel.DEBUG

```
...
{"level":"DEBUG","timestamp":"2021-06-18T00:53:55.991Z","logger":"kafkajs","message":"[SASLOAuthBearerAuthenticator] SASL OAUTHBEARER authentication successful",
...
```