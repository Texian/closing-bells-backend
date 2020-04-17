const db = require('./models');

const items = [
    peach = [
    {
        name: 'Peach',
        price: 25,
        date: '2020-3-27',
    },
    {
        name: 'Peach',
        price: 35,
        date: '2020-3-27',
    },
    {
        name: 'Peach',
        price: 12,
        date: '2020-3-27',
    },
    {
        name: 'Peach',
        price: 29,
        date: '2020-3-28',
    },
    {
        name: 'Peach',
        price: 36,
        date: '2020-3-30',
    },
    {
        name: 'Peach',
        price: 55,
        date: '2020-3-30',
    }],
    seabass = [
    {
        name: 'Seabass',
        price: 100,
        date: '2020-3-30',
    },
    {
        name: 'Seabass',
        price: 102,
        date: '2020-4-2',
    },
    {
        name: 'Seabass',
        price: 10,
        date: '2020-4-2',
    },
    {
        name: 'Seabass',
        price: 99,
        date: '2020-4-3',
    }],
    tarantula = [
    {
        name: 'Tarantula',
        price: 300,
        date: '2020-3-30',
    },
    {
        name: 'Tarantula',
        price: 100,
        date: '2020-3-31',
    },
    {
        name: 'Tarantula',
        price: 3000,
        date: '2020-4-5',
    },
    {
        name: 'Tarantula',
        price: 50,
        date: '2020-4-5',
    },
    {
        name: 'Tarantula',
        price: 60,
        date: '2020-4-5',
    }],
];


const seedItems = async () => {
    try {
        await db.Item.deleteMany({});
        console.log('Deleted previous items');
        let createdItems = await db.Item.create(items);
        console.log(`Created ${createdItems.length} items`);
        process.exit();
    } catch (err) {
        console.log(`Seed Items error: ${err}`);
        process.exit(1);
    }
}

seedItems();