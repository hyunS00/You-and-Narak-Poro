require('./server');

const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const { Client, Collection, REST, Routes } = require('discord.js');

// Create an instance of a Discord client
const client = (module.exports = new Client({ intents: [131071] }));

client.login(process.env.TOKEN);

//이벤트를 등록
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

// 커멘드를 등록
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

// 커멘드를 Dicord.js Rest API를 통해 Descord url에 전송하여 등록?
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(process.env.ID), { body: commands_json })
    .then((command) => console.log(`${command.length}개의 커멘드를 push했습니다.`))
    .catch(console.error());

// 몽고DB 연결
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// mongoose
//     .connect(process.env.MONGOURL, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//     })
//     .then(console.log('MONGO DB가 연결되었습니다.'));

// mongoose.connection.on('reconnected', () => {
//     console.log('MONGO DB가 다시 연결되었습니다.');
// });

// mongoose.connection.on('disconnected', () => {
//     console.log('MONGO DB의 연결이 끊어졌습니다.');
// });
