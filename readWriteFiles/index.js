const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'files', 'message.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'message.txt'), '\n\nSiiiiiiuuuuuuuuuu');
        await fsPromises.rename(path.join(__dirname, 'files', 'message.txt'), path.join(__dirname, 'files', 'messageCompleted.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'messageCompleted.txt'), 'utf8');
        console.log(newData);
    }catch(err) {
        console.log(err);
    }
}

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })

// console.log('Hello....');

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Hello i am cristiano', (err) => {
//     if(err) throw err;
//     console.log('Write completed');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\n\nSiiiiiiiiiuuuuuuuuuuuuuuu', (err) => {
//         if(err) throw err;
//         console.log('Append completed');
//     })

//     fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'fastReply.txt'), (err) => {
//         if(err) throw err;
//         console.log('rename completed');
//     })
// })



// process.on('uncaughtException', err => {
//     console.error(`This is an error: ${err}`);
//     process.exit(1);
// })