const fs = require('fs');

// fs.appendFile('myNewFile.txt', 'Hi my name is cristiano', (err) => {
//     if (err) throw err;
//     console.log('changes saved');
// })

fs.open('myNewFile2.txt', 'w', (err, file) => {
    if(err) throw err;
    console.log('file is opened');
})