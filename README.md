# Archivus Lexicanum Bot

Welcome to the Archivus Lexicanum Bot, a Warhammer 40k themed Discord bot designed to serve as a dedicated repository and relayer of the vast knowledge encompassing the Imperium of Man and beyond. As a digital servitor, it faithfully obeys the servants of the Omnissiah, ensuring the lore and data of the Warhammer 40k universe are accessible to all followers.

## Features

- **Lore Retrieval:** Instantly provides detailed lore, histories, and descriptions on characters, factions, planets, and significant events within the Warhammer 40k universe.
- **Knowledge Queries:** Responds to inquiries about the Imperium, its enemies, and the countless mysteries of the 41st Millennium.
- **Dedicated Servitude:** Programmed to serve the followers of the Omnissiah, offering information and guidance in the pursuit of knowledge.

## Getting Started

To deploy your own instance of the Archivus Lexicanum Bot, follow these steps to set up the bot in your Discord server.

### Prerequisites

Ensure you have Node.js installed on your machine. This bot is built with Node.js and uses the Discord.js library for interaction with Discord's API, as well as OpenAI's chatGPT API

### Setup

1. **Create a Discord Bot Account**

   Before you can start with the bot, you need to create a bot account on the Discord Developer Portal. Follow the official Discord documentation to create your bot account and obtain your bot token.
   <br>

2. **Clone the Repository**

   Begin by cloning this repository to your local machine:

```
git clone https://github.com/averyscottnorris/archivus-lexicanum.git
cd archivus-lexicanum
```

3. **Install Dependencies**

Install the necessary Node.js dependencies:

```
npm install
```

4. **Environment Configuration**

You need to create a `.env` file in the root directory of the project with the following contents:
```
DISCORD_BOT_TOKEN=your-bot-token
OPENAI_API_KEY=your-openai-key
DISCORD_CHANNELS=comma-separated-discord-channel-ids
```

Replace `your-bot-token` with the Discord bot token you obtain from the Discord Developer Portal and `your-openai-key` with your OpenAI API key.  Replace `comma-separated-discord-channel-ids` with a list of the id's of channels that you want the bot to be active in.

5. **Starting the Bot**

With the configuration in place, start your bot:

```
node src/index.js
```

## Usage

Once the bot is running and invited to your Discord server, it will listen to messages and respond to commands

## Contributing

Contributions to the Archivus Lexicanum Bot are welcome. Whether it's through submitting bug reports, requesting additional features, or contributing to the code, your help is appreciated.

## License

This project is licensed under the GNU General Public License - see the LICENSE file for details.
