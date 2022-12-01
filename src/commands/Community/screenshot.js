const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const SCREENSHOT_BASE_URL = 'https://shot.screenshotapi.net/screenshot'
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('screenshot')
    .setDescription('Screenshots a web page')
    .addStringOption(option =>
		option.setName('url')
			.setDescription('Url to screenshot')
			.setRequired(true)),
    async execute(interaction, client) {

        const string = interaction.options.getString('url');

        async function getScreenShot(url)
        {
            var data = {
                'token': process.env.SHOT_API_KEY,
                'url': url,
                'width': 1080,
                'height':720,
                'fresh': true,
                'output': "image",
                'file_type': "png",
                'wait_for_event': "load"
            };
        
            await axios({
                method: 'get',
                url: SCREENSHOT_BASE_URL,
                params: data,
                headers: {'Content-Type': 'multipart/form-data'},
            })    
            .then((response) =>{
                console.log('Url Sent: ' + response.request.res.responseUrl)
                console.log("It worked");        
                message = `${response.request.res.responseUrl}` 
            })
            .catch((error) =>{
                console.log('Error Detected: ' + error);

                message = 'Error has been detected, please check the url you sent.'
            });     
            
            return message;
        }

        interaction.deferReply();

        await interaction.editReply({ content: await getScreenShot(string)});

    }

}


