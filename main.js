const { Kafka, logLevel } = require('kafkajs');
const axios = require('axios');

// Get this information from the kafka instance you created
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const TOKEN_ENDPOINT_URL = '';
const BOOTSTRAP_SERVER = '';

const API_TOKEN_DATA = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

async function getToken() {
  const response = await axios.post(TOKEN_ENDPOINT_URL, API_TOKEN_DATA);
  return response.data.access_token;
}

const kafka = new Kafka({
	logLevel: logLevel.DEBUG,
  clientId: 'test-only',
  brokers: [BOOTSTRAP_SERVER],
	ssl: true,
  sasl: {
    mechanism: 'OAUTHBEARER',
    oauthBearerProvider: async () => {
      const token = await getToken();
      return {
        value: token,
      };
    },
  },
});

const numMessages = 10;

const producer = kafka.producer();

async function connect() {
  await producer.connect();
}

async function produce() {
  for (let i = 0; i < numMessages; i++) {
    const value = Buffer.from('value-' + i);

    await producer.send({
      topic: 'test-topic',
      messages: [{ key: 'the-key', value: value, partition: 0 }],
    });
  }
}

async function disconnect() {
  await producer.disconnect();
}

(async () => {
  await connect();
  await produce();
  await disconnect();
})();

