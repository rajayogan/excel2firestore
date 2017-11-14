const functions = require('firebase-functions');

const convertExcel = require('excel-as-json').processFile;
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const projectId = "myapp-4eadd";
const bucketName = `${projectId}.appspot.com`;

const gcs = require('@google-cloud/storage')({
    projectId
})

const bucket = gcs.bucket(bucketName);

exports.excltojson = functions.database.ref('excelimport/newexcel').onWrite((snapshot) => {
    
  const filePath = 'goodfile';
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);  
    var file = fs.createWriteStream(tempLocalFile);
  var request = https.get(snapshot.data.val().thaturl, function(response) {
    response.pipe(file);
    file.on('finish', function() {
        file.close();  // close() is async, call cb after close completes.
        var options = {
    sheet: '1',
    isColOriented: false,
    omitEmtpyFields: false

        }



convertExcel(file.path, '/tmp/jsonfile.json', options, (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
    
        bucket.upload('/tmp/jsonfile.json', {metadata: {contentType: 'application/json'}}).then(() => {
            console.log('Uploaded');
        })

    }
 })        
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(tempLocalFile); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });

})

