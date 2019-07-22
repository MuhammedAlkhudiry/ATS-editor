'use strict';

function showSuccessNote(msg) {
    const success = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4 * 1000
    });

    success.fire({
        type: 'success',
        title: msg
    })
}
function showFailedNote(msg) {
    const failed = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4 * 1000
    });

    failed.fire({
        type: 'error',
        title: msg
    })
}

function showUnsavedFileNote() {

    Swal.fire({
        title: 'المستند الحالي غير محفوظ. هل أنت متأكد؟',
        type: 'question',
        customClass: {
            icon: 'swal2-arabic-question-mark'
        },
        confirmButtonText: 'نعم',
        cancelButtonText: 'لا',
        showCancelButton: true,
        showCloseButton: true

    }).then((result) => {
        // if result.value means 'yes' pressed, else no.
        return result.value ? true : false;
    })
}