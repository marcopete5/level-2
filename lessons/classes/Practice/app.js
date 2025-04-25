class Player {
    constructor({ name, totalCoins, status, hasStar }) {
        this.name = name;
        this.totalCoins = totalCoins;
        this.status = status;
        this.hasStar = hasStar;
    }

    setName(namePicked) {
        this.name = namePicked === 'Mario' ? 'Mario' : 'Luigi';
    }

    gotHit() {
        if (this.hasStar) {
            this.hasStar = false;
            console.log(`${this.name}'s star protected them!`);
        } else if (this.status === 'Powered Up') {
            this.status = 'Big';
        } else if (this.status === 'Big') {
            this.status = 'Small';
        } else if (this.status === 'Small') {
            this.status = 'Dead';
        }
    }

    gotPowerup() {
        if (this.status === 'Small') {
            this.status = 'Big';
        } else if (this.status === 'Big') {
            this.status = 'Powered Up';
        } else if (this.status === 'Powered Up') {
            this.hasStar = true;
        }
    }

    addCoin() {
        this.totalCoins++;
    }

    print() {
        console.log(`
            Name: ${this.name}
            Status: ${this.status}
            Total Coins: ${this.totalCoins}
            Star Active: ${this.hasStar}
        `);
    }
}

// Random range function
function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Instantiate Player
const player = new Player({
    name: 'Mario',
    totalCoins: 0,
    status: 'Small',
    hasStar: false
});

// Set up game loop with setInterval
const gameInterval = setInterval(() => {
    const action = getRandomRange(0, 2);
    if (action === 0) {
        player.gotHit();
    } else if (action === 1) {
        player.gotPowerup();
    } else {
        player.addCoin();
    }
    player.print();
    if (player.status === 'Dead') {
        clearInterval(gameInterval);
        console.log('Game Over!');
    }
}, 1000);
