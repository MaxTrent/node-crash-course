const fs = require('fs');

//reading files
fs.readFile('./docs/text1.txt', (err, data)=>{
if(err){
    console.log(err);
}
console.log(data.toString());
});

//writing files
fs.writeFile('./docs/text1.txt', 'hello world', ()=>{
    console.log('fle has been written');
});

fs.writeFile('./docs/text2.txt', 'hello, again', ()=>{
    console.log('file has been created and written');
});

//directories
if (!fs.existsSync('./assets')){
    fs.mkdir('./assets/', (err)=>{
        if (err){
            console.log(err);
        }
        console.log('folder created');
    });
}
else {
    fs.rmdir('./assets/', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder removed');
    })
}

// delete files

if (fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err)=>{
        if (err){
            console.log(err);
        }
        console.log('file deleted');
    });
}
