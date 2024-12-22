import fs from "fs";

export class ChatManager {
  constructor() {
    this.messages = [];
    this.path = "./src/data/messages.json";
  }

  // Get messages
  async getMessages() {
    const file = await fs.promises.readFile(this.path, "utf-8");
    const fileParse = JSON.parse(file);

    this.messages = fileParse || [];

    return this.messages;
  }

  // Save message
  async saveMessage(m) {
    await this.getMessages();

    const { user, message } = m;

    const newMessage = {
      user,
      message,
    };

    this.messages.push(newMessage);

    await fs.promises.writeFile(this.path, JSON.stringify(this.messages, null, 2));

    return newMessage;
  }
}