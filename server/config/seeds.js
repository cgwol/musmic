const db = require('./connection');
const User = require('../models/User');
const mongoose = require('mongoose');
const readline = require('readline');
const { ObjectId } = mongoose.Types;

db.once('open', async () => {
    try {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question('This will wipe the existing Database, are you sure you want to proceed? (Y/n) ', (response) => {
            if (response.toLowerCase() === 'y') {
                console.log('Proceeding with Database seeding...');

                seed();

            }
            else {
                console.log('Operation canceled')
                process.exit();
            }

            rl.close();
        })


    }
    catch (error) {
        console.error('ERROR seedind database: ', error)
        process.exit();
    }
})

async function seed() {
    await User.deleteMany();

    const user1 = await User.create({
        username: 'user1',
        email: 'user1@email.com',
        password: 'password',
    });

    const user2 = await User.create({
        username: 'user2',
        email: 'user2@email.com',
        password: 'password',
    });

    console.log('Database seeded!')
    process.exit();
}