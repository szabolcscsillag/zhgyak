const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const userData = require('./services/user-data.service.js');

const ageGroups = userData.ageGroups;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.use(express.static('public/css'))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

const data = userData.users;
let countries = [];
let ids = [];

for (let i = 0; i < data.length; i++) {
    countries.push(data[i].location.country);
    ids.push(data[i].id.value);
}
var uniqueCountries = new Set(countries);
let q = Array.from(uniqueCountries);
const finalCountries = q.sort();

let agemin, agemax;

function d(korcsoport) {
    let arglen = arguments.length;
    console.log(arglen);
    let f = arguments[0];
    console.log(f);

    if (f == '20-39') {
        console.log(1);
        agemin = 20;
        agemax = 39;
    }
    else if (f == '40-59') {
        console.log(2);
        agemin = 40;
        agemax = 59;
    }
    else if (f == '60-79') {
        console.log(3);
        agemin = 60;
        agemax = 79;
    }
}

//d('40-59');
//console.log(agemin, agemax);

function nofilter() {
    return data;
}
//console.log(nofilter());
let list = [];
function getUserAge(min, max) {
    console.log(max);
    for (let i = 0; i < data.length; i++) {
        if (data[i].dob.age < max && data[i].dob.age > min) {

            list.push(data[i]);

        }
    }
    return list;
}
//console.log(getUserAge(70, 79));
let list2 = [];
function filterByCountry(orszagnev) {
    orszagnev = arguments[0];
    for (let i = 0; i < data.length; i++) {
        if (data[i].location.country == orszagnev) {

            list2.push(data[i]);
        }
    }
    return list2;
}
//console.log(filterByCountry('Netherlands'));

const qRouter = express.Router();
app.use(qRouter);

qRouter.get('/user', async (req, res, next) => {
    try {
        const ppl = await csvreader.getPeople()
        console.log(ppl);
        res.render('people', { ppl: ppl });
    } catch (e) {
        next(e)
    }
})
qRouter.get('/users', async (req, res, next) => {
    try {
        const ppl = await csvreader.getPeople()
        console.log(ppl);
        res.render('people', { ppl: ppl });
    } catch (e) {
        next(e)
    }
})