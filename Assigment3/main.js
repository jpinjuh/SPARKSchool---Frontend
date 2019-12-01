// creating uploadZone with div element
const uploadZone = document.createElement('div');
uploadZone.className = 'upload-zone';
document.body.appendChild(uploadZone);

// adding class dragover to uploadZone when we drag file to the uploadZone
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.className = 'upload-zone dragover';
}, false);

// removing class dragover when we drag file out of the uploadZone
uploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadZone.className = 'upload-zone';
}, false);

// calculates the difference in days between two dates
function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.abs(Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)));
}

// prints the file information when it is dropped
uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    
    for(let i = 0; i < files.length; i++){
        if(e.dataTransfer.types[i] === 'Files'){
            let d1 = new Date(files[i].lastModified);
            console.log(`
                Ime datoteke: ${files[i].name}
                Veličina datoteke: ${(files[i].size/1024/1024).toFixed(2)}MB
                Tip datoteke: ${e.dataTransfer.types[i]}
                Datoteka je zadnji put modificirana prije ${dateDiffInDays(new Date, new Date(files[i].lastModified))} dana.
            `);
        } else{
            console.log(`It's not a file!!!`);
        }
    }
    
    uploadZone.className = 'upload-zone drop';
}, false);