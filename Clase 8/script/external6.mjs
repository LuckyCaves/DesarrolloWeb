import chalk from 'chalk';
import asciiCats from 'ascii-cats';


console.log(chalk.bgBlue.underline("SPECS: "));
console.log(`
CPU: ${chalk.red.bold.underline('90%')}
RAM: ${chalk.green.bold.underline('40%')}
DISK: ${chalk.yellow.bold.underline('70%')}
`);


console.log(chalk.blue(asciiCats('nyan')));

import * as fs from 'node:fs';

let fileReadedCb = function(error, data)
{
    if(error)
        console.log(error);
    else
        console.table(JSON.parse(data));
}

let getAverage = function(error, data)
{
    if(error)
        console.log(error);
    else
    {
        let users = JSON.parse(data);
        let total = 0;
        users.forEach(user => {
            total += user.edad;
        });
        console.log(`Average: ${total / users.length}`);
    }
}

let getLongest = function(error, data)
{
    if(error)
        console.log(error);
    else
    {
        let users = JSON.parse(data);
        let longest = users[0];
        users.forEach(user => {
            if(user.name.length > longest.name.length)
                longest = user;
        });
        console.log(longest.name);
    }
}

let deleteUser = function(error, data)
{
    if(error)
        console.log(error);
    else
    {
        let id = 1;
        let users = JSON.parse(data);
        users = users.filter(user => user.id != id);
        fs.writeFileSync('Clase 8/files/usersFile.txt', JSON.stringify(users), 'utf-8', fileReadedCb);
    }
}

// fs.readFile('Clase 8/files/usersFile.txt', 'utf-8', deleteUser);