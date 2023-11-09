const axios = require('axios');
const { response } = require('express');

function shuffle(array) {
    let arr = [];
    for (let i = 0; i < 20; i++) {
        arr.push(array.splice(Math.floor(Math.random() * array.length - 1 - i), 1)[0]);
    }
    return arr;
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(shuffle(arr));

axios
    .get('https://ddragon.leagueoflegends.com/api/versions.json')
    .then((response) => {
        console.log(response.data[0]);
        return response.data[0];
    })
    .then((version) => {
        axios
            .get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`)
            .then((response) => {
                const championData = Object.values(response.data.data);

                // console.log(championData);
                const randomChamps = shuffle(championData);
                console.log(randomChamps);
                return randomChamps;
            });
    });
