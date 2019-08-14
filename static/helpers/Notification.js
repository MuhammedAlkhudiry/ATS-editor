'use strict';
class Notification {


    constructor(msgType, msg = '') {
        switch (msgType) {
            case 'success':
                this.success(msg);
                break;
            case 'fail':
                this.fail(msg);
                break;
            case 'info':
                this.info(msg);
                break;
            case 'unsaved-file':
                return this.unsavedFile();
        }
    }

    success(msg) {
        const success = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 4 * 1000,
            width: '180px',
        });
        success.fire({
            type: 'success',
            title: msg
        });
    }

    fail(msg) {
        const failed = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 4 * 1000,
            width: '180px',
        });

        failed.fire({
            type: 'error',
            title: msg
        });
    }


    unsavedFile() {
        return Swal.fire({
            title: 'المستند الحالي غير محفوظ. هل أنت متأكد؟',
            type: 'question',
            customClass: {
                icon: 'swal2-arabic-question-mark'
            },
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا',
            showCancelButton: true,
            showCloseButton: true

        });
    }

    info(msg) {
        const infoNote = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        infoNote.fire({
            type: 'info',
            title: msg
        });
    }
}
