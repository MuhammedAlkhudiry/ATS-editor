/* -------------------------------- new file -------------------------------- */
document.getElementById('new-file-icon').addEventListener('click', createNewFile)

function createNewFile(e) {

    if (change.length() > 0) {

        Swal.fire({
            title: 'الملف غير محفوظ. هل أنت متأكد؟',
            type: 'question',
            customClass: {
                icon: 'swal2-arabic-question-mark'
            },
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا',
            showCancelButton: true,
            showCloseButton: true

        }).then((result) => {

            if (result.value) {
                const newFileNote = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });

                newFileNote.fire({
                    type: 'info',
                    title: 'ملف جديد'
                });

                cleanFile();
                showSuccessNote('ملف جديد')
            }
        })

    } else {
        cleanFile()
        showSuccessNote('ملف جديد')
    }
}

/* -------------------------------------------------------------------------- */
