const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const { Client, Collection, REST, Routes } = require('discord.js');

// Create an instance of a Discord client
const client = (module.exports = new Client({ intents: [131071] }));

client.login(process.env.TOKEN);

const eventsPath = './events';
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = `./${eventsPath}/${file}`;
    const event = require(filePath);
    if (event.once == true) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();

const commands_json = [];

const connmandsCategoryPath = './commands';
const connmandsCategoryFiles = fs.readdirSync(connmandsCategoryPath);

for (const category of connmandsCategoryFiles) {
    const commandsPath = `./commands/${category}`;
    const commandsFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for (const file of commandsFiles) {
        const command = require(`./commands/${category}/${file}`);
        client.commands.set(command.data.name, command);
        commands_json.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(process.env.ID), { body: commands_json })
    .then((command) => console.log(`${command.length}개의 커멘드를 push했습니다.`))
    .catch(console.error());
