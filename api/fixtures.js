const mongoose = require('mongoose');
const {nanoid} = require("nanoid");

const config = require('./config');
const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
    await mongoose.connect(config.mongo.url, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();
    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [anna, john] = await User.create({
        googleId: '1',
        role: 'user',
        displayName: 'Anna',
        avatar: 'john.jpg',
        token: nanoid()
    }, {
        googleId: '2',
        role: 'admin',
        displayName: 'John',
        avatar: 'anna.jpg',
        token: nanoid()
    });

    await Cocktail.create({
        user: anna,
        name: 'Рафаэлло',
        image: 'raffaello.jpg',
        recipe: 'Рецепт коктейля Рафаэлло\n' +
            'Сделай на стопке окаемку из кокосовой стружки\n' +
            'Налей в шейкер ванильный сироп 15 мл, кокосовый ликер 15 мл и айриш крим 15 мл\n' +
            'Наполни шейкер кубиками льда и взбей\n' +
            'Перелей через стрейнер в стопку',
        isPublished: true,
        ingredients: [{
            ingredient: 'Айриш крим',
            amount: '15 мл'
        }, {
            ingredient: 'Кокосовый ликер De Kuyper',
            amount: '15 мл'
        }, {
            ingredient: 'Ванильный сироп',
            amount: '15 мл'
        }, {
            ingredient: 'Кокосовая стружка',
            amount: '5 г'
        }]
    }, {
        user: anna,
        name: 'Негрони',
        image: 'negori.jpg',
        recipe: 'Рецепт коктейля Негрони\n' +
            'Наполни рокс кубиками льда доверху\n' +
            'Налей в бокал красный вермут 30 мл и красный биттер 30 мл\n' +
            'Добавь джин 30 мл и размешай коктейльной ложкой\n' +
            'Укрась апельсиновой цедрой',
        isPublished: false,
        ingredients: [{
            ingredient: 'Лондонский сухой джин',
            amount: '30 мл'
        }, {
            ingredient: 'Красный вермут',
            amount: '30 мл'
        }, {
            ingredient: 'Красный биттер Campari',
            amount: '30 мл'
        }, {
            ingredient: 'Апельсиновая цедра',
            amount: '1 шт'
        }]
    }, {
        user: john,
        name: 'Белый русский',
        image: 'russ.jpg',
        recipe: 'Рецепт коктейля Белый русский\n' +
            'Наполни рокс кубиками льда доверху\n' +
            'Налей в бокал нежирные сливки 30 мл, кофейный ликер 30 мл и водку 30 мл\n' +
            'Размешай коктейльной ложкой, пока не замерзнут стенки',
        isPublished: true,
        ingredients: [{
            ingredient: 'Водка Finlandia',
            amount: '30 мл'
        }, {
            ingredient: 'Кофейный ликер De Kuyper',
            amount: '30 мл'
        }]
    }, {
        user: john,
        name: 'Летающий кузнечик',
        image: 'highres.jpg',
        recipe: 'Рецепт коктейля Летающий кузнечик\n' +
            'Налей в шейкер нежирные сливки 5 мл, мятный ликер зеленый 15 мл, какао ликер светлый 15 мл и водку 15 мл\n' +
            'Наполни шейкер кубиками льда и взбей\n' +
            'Перелей через стрейнер в стопку',
        isPublished: false,
        ingredients: [{
            ingredient: 'Водка Finlandia',
            amount: '15 мл'
        }, {
            ingredient: 'Мятный ликер зеленый De Kuyper',
            amount: '15 мл'
        }, {
            ingredient: 'Какао ликер светлый De Kuyper',
            amount: '15 мл'
        }, {
            ingredient: 'Нежирные сливки',
            amount: '5 мл'
        }, {
            ingredient: 'Лед в кубиках',
            amount: '200 гр'
        }]
    });

    await mongoose.connection.close();
};
run().catch((e) => console.error(e));