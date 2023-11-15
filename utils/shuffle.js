function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function divUser(users, user1, user2) {
    console.log(users);
    if (users.includes(user1) && users.includes(user2)) {
        //user1 0번쨰
        const dayoungIndex = users.indexOf(user1);

        let randomIndex = Math.floor(Math.random() * (3 - 0)) + 0;
        let tmp = users[randomIndex];
        users[randomIndex] = user1;
        users[dayoungIndex] = tmp;
        console.log(users);
        //user2 마지막
        const uniIndex = users.indexOf(user2);

        randomIndex = Math.floor(Math.random() * (users.length - 5)) + 5;
        tmp = users[randomIndex];
        users[randomIndex] = user2;
        users[uniIndex] = tmp;
        console.log(users);
    }
}

module.exports = { shuffle, divUser };
