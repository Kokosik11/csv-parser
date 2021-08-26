const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

let results = [];
let newCSV = [];

const deletePerson = [
    "Гиринский", "Гудель", "Ерашкова", "Зыкович", "Мудриченко",
    "Шматова", "Абмётко", "Волгина", "Калякин", "Кель", "Кувшинчиков",
    "Левданская", "Людчик", "Мозальков", "Мурашко", "Пацына"
]

fs.createReadStream('data/1.csv')
    .pipe(csv())
    .on('data', data => results.push(data))
    .on('end', () => {
        results.forEach((r, index) => {
            let csvkeys = Object.keys(r);
            console.log(csvkeys);
            let data = {};

            data[csvkeys[2]] = r[csvkeys[2]];
            data[csvkeys[3]] = r[csvkeys[3]];
            data[csvkeys[4]] = r[csvkeys[4]];
            data["Адрес электронной почты"] = r[csvkeys[1]];

            newCSV.push(data);

        })
        

        console.log(newCSV);

        const createCsvWriter = require('csv-writer').createObjectCsvWriter 

        const csvWriter = createCsvWriter({ 
            path: 'out.csv', 
            header: [ 
                {id: 'Фамилия', title: 'Фамилия'}, 
                {id: 'Имя', title: 'Имя'}, 
                {id: 'Отчество', title: 'Отчество'}, 
                {id: 'Адрес электронной почты', title: 'Адрес электронной почты'}, 
                ] 
        }); 

        csvWriter.writeRecords(newCSV) 
            .then(() => console.log('The CSV file was written successfully'));                                                          
    })

