import amqp from "amqplib";

let channel: amqp.Channel | null = null;

export async function getChannel(): Promise<amqp.Channel> {
  if (channel) return channel;

  const conn = await amqp.connect("amqp://localhost");
  channel = await conn.createChannel();
  return channel;
}

export async function publish(queue: string, message: object) {
  try {
    const ch = await getChannel();
    await ch.assertQueue(queue);
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  } catch (error) {
    console.error("Could not publish event");
  }
}
