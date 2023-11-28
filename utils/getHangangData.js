async function getHanganData() {
    try {
        const hangangData = await fetch('https://api.hangang.life/');
        return hangangData.json();
    } catch (error) {
        console.error('Error fetching champion data:', error);
        throw error; // Rethrow the error to handle it further, if needed.
    }
}

module.exports = {
    getHanganData,
};
