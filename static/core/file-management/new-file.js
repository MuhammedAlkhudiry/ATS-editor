
/* -------------------------------- new file -------------------------------- */
document.getElementById('new-file-icon').addEventListener('click', createNewFile)

function createNewFile(e) {

    if (change.length() > 0) {

        new Note().unsavedFile().then((result) => {
            if (result.value) {
                
                cleanFile();
                new Note().info('ملف جديد');
            }
        })

    } else {
        cleanFile()
        new Note().info('ملف جديد');
    }
}

/* -------------------------------------------------------------------------- */
