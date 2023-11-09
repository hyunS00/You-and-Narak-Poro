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

const pick1Img = document.querySelector('pick1-img');
const pick2Img = document.querySelector('pick2-img');
const pick3Img = document.querySelector('pick3-img');
const pick4Img = document.querySelector('pick4-img');
const pick5Img = document.querySelector('pick5-img');
const pick6Img = document.querySelector('pick6-img');
const pick7Img = document.querySelector('pick7-img');
const pick8Img = document.querySelector('pick8-img');
const pick9Img = document.querySelector('pick9-img');
const pick10Img = document.querySelector('pick10-img');
const pick11Img = document.querySelector('pick11-img');
const pick12Img = document.querySelector('pick12-img');
const pick13Img = document.querySelector('pick13-img');
const pick14Img = document.querySelector('pick14-img');
const pick15Img = document.querySelector('pick15-img');
const pick16Img = document.querySelector('pick16-img');
const pick17Img = document.querySelector('pick17-img');
const pick18Img = document.querySelector('pick18-img');
const pick19Img = document.querySelector('pick19-img');
const pick20Img = document.querySelector('pick20-img');

const pick1Name = document.querySelector('pick1-name div');
const pick2Name = document.querySelector('pick2-name div');
const pick3Name = document.querySelector('pick3-name div');
const pick4Name = document.querySelector('pick4-name div');
const pick5Name = document.querySelector('pick5-name div');
const pick11Name = document.querySelector('pick11-name div');
const pick12Name = document.querySelector('pick12-name div');
const pick13Name = document.querySelector('pick13-name div');
const pick14Name = document.querySelector('pick14-name div');
const pick15Name = document.querySelector('pick15-name div');

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
                pick1Img.clas;
                return randomChamps;
            });
    });
