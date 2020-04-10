const bcrypt = require('bcryptjs');
const db = require('./models');
const SEED_USER_PASSWORD = '12345678';

const users = [
    {
        username: 'Tom',
        email: 'tom@nooks.com',
        items: ['Peach', 'Seabass']
    },
    {
        username: 'Isabelle',
        email: 'izzy@newhorizons.gov',
        items: ['Tarantula']
    }
]

const items = [
    {
        name: 'Peach',
        price: 25,
        date: '2020-3-27',
    },
    {
        name: 'Seabass',
        price: 10,
        date: '2020-4-2',
    },
    {
        name: 'Tarantula',
        price: 300,
        date: '2020-3-30',
    },
];


const seedItems = async () => {
    try {
        await db.Item.deleteMany({});
        console.log('Deleted previous items');
        let createdItems = await db.Item.create(items);
        console.log(`Created ${createdItems.length} items`);
        return item._id;
    } catch (err) {
        console.log(`Seed Items error: ${err}`);
        process.exit(1);
    }
}

const seedUsers = async () => {
    try {
        let itemId = await seedItems();
        users.forEach(user => user.item = itemId);
        await db.User.deleteMany({});
        console.log('Deleted all users');
        let user;
        for (user of users) {
            const hash = await bcrypt.hash(SEED_USER_PASSWORD, 10);
            user.password = hash;
            user = await db.User.create(user);
        }
        console.log('Seeded users');
        process.exit();
    } catch (err) {
        console.log(`Seed Users error: ${err}`);
        process.exit(1);
    }
}

seedUsers();