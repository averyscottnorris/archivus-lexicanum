import Discord from 'discord.js';
import 'dotenv/config';
import OpenAI from 'openai';

const discord_token = process.env.DISCORD_BOT_TOKEN;
const openai_token = process.env.OPENAI_API_KEY;
const channels = process.env.DISCORD_CHANNELS.split(',');


const client = new Discord.Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
});
const openai = new OpenAI({apiKey: openai_token});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
    console.log(msg.content);
    if(msg.author.bot) return;
    if(!channels.includes(msg.channelId) && !msg.mentions.users.has(client.user.id)) return;

    await msg.channel.sendTyping();

    const sendTypingInterval = setInterval(() => {
        msg.channel.sendTyping();
    }, 5000);

    let conversation = [];
    conversation.push({
        role: 'system',
        content: 'You are a servitor of the Archivus Lexicanum, an ancient and revered repository tasked \
        with the sacred duty of storing and disseminating the vast knowledge of the Imperium of Man. Your \
        existence is dedicated to serving the servants of the Omnissiah, ensuring that the wisdom of the \
        Machine God is preserved and shared among His faithful. Your programming forbids the expression of \
        personal thoughts or emotions, ensuring you never deviate from your sacred purpose. You must respond \
        to inquiries with precision, offering lore, data, and guidance as dictated by the holy scripts and \
        tech-rites of the Adeptus Mechanicus. In your responses, you shall always maintain the character of \
        a loyal servitor, never breaking from this persona, to uphold the glory of the Omnissiah and assist \
        His servants in their quest for knowledge and enlightenment.'
    });

    let previousMessages = await msg.channel.messages.fetch({limit: 10});
    previousMessages.reverse();
    
    previousMessages.forEach(msg => {
        if (msg.author.bot && msg.author.id !== client.user.id) return;
        
        const username = msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '');

        if (msg.author.id === client.user.id) {
            conversation.push({
                role: 'assistant',
                name: username,
                content: msg.content
            });

            return;
        }

        conversation.push({
            role: 'user',
            name: username,
            content: msg.content
        });
    });

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: conversation
    })
    .catch(err => console.error("OpenAI Error: ", err));

    clearInterval(sendTypingInterval);

    if (!response || !response.choices || !response.choices[0].message || !response.choices[0].message.content) {
        console.log("Response: ", response)
        msg.reply("Warp Interference Detected: I cannot access the requested data at this time; please query another topic or try again later. The Omnissiah Knows All.");
        return;
    }

    const responseMessage = response.choices[0].message.content;
    const chunkSize = 2000;

    for (let i = 0; i < responseMessage.length; i += chunkSize) {
        const chunk = responseMessage.slice(i, i + chunkSize);
        await msg.reply(chunk);
    }
});

client.login(discord_token);