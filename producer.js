import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    brokers: ['steady-dove-7777-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'c3RlYWR5LWRvdmUtNzc3NyQsJbXiW5FWitZEutt_rUVjLtXms2G6hyj5yqEIucI',
      password: '38d288ee78c1430b8779a9ea374708c6',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'New message from producer',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
