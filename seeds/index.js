const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/camper-field', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random406 = Math.floor(Math.random() * 406)
        const price = Math.floor(Math.random() * 1000) + 1000
        const camp = new Campground({
            author: '61141c59a693fc1b7ca6751a',
            location: `${cities[random406].city}, ${cities[random406].admin_name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consequatur error quibusdam earum, nihil dicta obcaecati dignissimos adipisci perferendis incidunt vero ab, impedit vel sit illum officia corrupti dolores tempore',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random406].lng,
                    cities[random406].lat
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dcluytkqc/image/upload/v1628884452/Camper-Field/blmtb4cgbv0s7urpwqrl.jpg',
                    filename: 'Camper-Field/blmtb4cgbv0s7urpwqrl'
                },
                {
                    url: 'https://res.cloudinary.com/dcluytkqc/image/upload/v1628884452/Camper-Field/ufigk2gxdmrjcd0enohf.jpg',
                    filename: 'Camper-Field/ufigk2gxdmrjcd0enohf'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})