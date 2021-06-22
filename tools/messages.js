// All messages
module.exports = {
    INVALID_ID: {
        per: 'آی دی نا معتبر',
        eng: 'Invalid ID'
    },
    WRONG_RESUME_TYPE: {
        per: 'لطفا فیلد مورد نظر برای ویرایش را انتخاب کنید. (certificate, education, experience)',
        eng: 'Please select the field you want to edit. (certificate, education, experience)'
    },
    WRONG_OPERATION: {
        per: 'خطا نوع عملیات - لطفا برای حذف \"delete\" و برای ویرایش \"edit\" و برای اضافه کردن \"add\" را ارسال کنید',
        eng: 'Invalid Operation. Please send \"delete\" to Delete and \"edit\" To Edit and \"add\" to Add'
    },
    WRONG_FAVORITE_OPERATION: {
        per: 'خطا نوع عملیات - لطفا برای حذف \"delete\" و برای اضافه کردن \"add\" را ارسال کنید',
        eng: 'Invalid Operation. Please send \"delete\" to Delete and \"add\" to Add'
    },
    WRONG_INTROS_OPERATION: {
        eng: 'Invalid Operation. Please send \"delete\" to Delete and \"add\" to Add'
    },
    FILE_UPLOAD_ERROR: {
        per: 'خطا در آپلود فایل',
        eng: 'Error on Uplaoding File'
    },
    FILE_UPLOAD_SUCCESS: {
        per: 'آپلود موفق',
        eng: 'Successful Upload'
    },
    INVALID_CONDITION: {
        per: 'کاندیشن نامعتبر',
        eng: 'Invalid Condition'
    },
    INVALID_PRICE: {
        per: "قیمت نامعتبر",
        eng: "Invalid Price"
    },
    INVALID_DISPLAYNAME: {
        per: "یوزرنیم نامعتبر",
        eng: "Invalid Display Name"
    },
    YOU_HAVE_ANY_SOCIAL: {
        per: "لطفا یوزر شبکه اجتماعی وارد کنید",
        eng: "Please first Enter your Social"
    },
    PLEASE_SEND_ID_OR_DISPLAYNAME: {
        per: "لطفا یوزرنیم یا آی دی را ارسال کنید",
        eng: "Please Enter Display Name or ID"
    },
    YOU_CANNOT_FAVORITE_YOURSELF: {
        per: "نمی توانید خود را اضافه کنید",
        eng: "You Cannot mark you self as favorite"
    },
    INVALID_USER: 'کاربر غیر مجاز',
    SAVING_DATA_SUCCESS: 'اطلاعات با موفقت ثبت شد',
    SAVING_DATA_FAILURE: 'خطا در ثبت اطلاعات.',
    UPDATING_DATA_SUCCESS: 'اطلاعات با موفقیت بروزرسانی شد',
    UPDATING_DATA_FAILURE: 'خطا در بروز رسانی اطلاعات.',
    DELETING_DATA_SUCCESS: 'اطلاعات با موفقیت حذف شد',
    DELETING_DATA_FAILURE: 'خطا در حذف اطلاعات',
    GET_DATA_SUCCESS: 'اطلاعات با موفقیت یافت شد',
    GET_DATA_FAILURE: 'دیتایی یافت نشد',
    DUPLICATE_DATA: 'قبلا در دیتایس ثبت شده است',
    LOG_IN_INCORRECT_USER_NAME_OR_PASSWORD: 'نام کاربری یا رمز عبور اشتباه است.',
    LOGGED_IN_SUCCESS: {
        per: 'شما با موفقیت وارد شدید.',
        eng: 'You sucessfully logged in.'
    },

    DUPLICATE_DISPLAYNAME: {
        per: 'دیزپلی نیم تکراری.',
        eng: 'Display Name is Already Taken.'
    },
    UNAUTHORIZED_ACCESS: 'دسترسی غیر مجاز',
    NO_TOKEN: 'لطفا ابتدا لاگین کنید',
    BLOCK: 'اکانت شما بلاک شده است',
    YOU_CANT_EDIT_OTHERS_PROJECTS: 'شما اجازه تغییر در پروژه دیگران را ندارید',
    START_IS_GREATER_THAN_END: "زمان شروع بعد تر از زمان پایان می باشد",
    UPLOADER: {
        PLEASE_UPLOAD_A_FILE: {
            per: 'لطفا فایلی را ارسال کنید',
            eng: 'Please choose a file to upload.'
        },
        INVALID_FILE_OPERATION: {
            per: 'خطا نوع عملیات - لطفا برای حذف \"delete\" و برای ویرایش \"edit\" را ارسال کنید',
            eng: 'Invalid Operation. Please send \"delete\" to Delete and \"edit\" To Edit the File'
        },
        THERE_IS_NO_FILE_WITH_THIS_ID: {
            per: 'فایلی با این مشخصات وجود ندارد',
            eng: 'There is No file with this information'
        },
        ERROR_ON_DELETING_FILE: {
            per: 'خطا در روند حذف',
            eng: 'Error on Delete Process'
        },
        ERROR_ON_EDITING_FILE: {
            per: 'خطا در روند ویرایش',
            eng: 'Error on Edit Process'
        },
        SUCCESS_DELETE_FILE: {
            per: 'حذف فایل موفق',
            eng: 'Successful file deletion'
        },
        SUCCESS_EDIT_FILE: {
            per: 'ویرایش فایل موفق',
            eng: 'Successful file editing'
        },
    },
    MEMBERSHIP: {
        PLEASE_UPGRADE_YOUR_MEMBERSHIP: {
            per: 'شما به حد نصاب تشکیل کلاس رسیده اید. لطفا اکانت خود را ارتقا دهید',
            eng: 'You have reached the class limitation. Please upgrade your membership'
        },
        PURCHASE_MEMBERSHIP_FAILURE: {
            per: 'خطا در خرید ممبرشیپ',
            eng: 'Membership Purchase Failure'
        },
        PURCHASE_MEMBERSHIP_SUCCESS: {
            per: 'ممبرشیپ با موفقیت خریداری شد',
            eng: 'Membership Purchase Successfuly'
        },
        PURCHASE_MEMBERSHIP_SEMI_SUCCESS: {
            per: 'درحال اتصال به درگاه پرداخت ... (فعلا اینو به عنوان خرید موفق در نظر بگیرین و لازم نیست کار دیگه انجام بشه)',
            eng: 'You are Connecting to Gateway ...'
        }
    },
    CLASSROOM: {
        YOU_CANNOT_RESERVE_YOUR_OWN_CLASS: {
            per: 'شما نمی توانید کلاس خود را رزرو کنید',
            eng: 'You cannot reserve your own class.'
        },
        YOU_WAS_NOT_PRESENT: {
            per: 'شما در کلاس حضور نداشته اید',
            eng: 'You wa not Present in Class'
        },
        YOU_CANNOT_START_YOUR_OWN_CLASS: {
            per: 'شما نمی توانید کلاس خود را شروع کنید',
            eng: 'You cannot satrt your own class.'
        },
        YOU_CANNOT_REJECT_STUDENT: {
            per: 'دانش آموز تایید شده.  نمی توان ریجکت کرد',
            eng: 'Student has been Accpted. Cannot be Reject'
        },
        THIS_IS_NOT_YOUR_CLASS: {
            per: 'این کلاس متعلق به شما نیست',
            eng: 'This Class does not Belongs to You.'
        },
        THIS_IS_NOT_CORRECT_STUDENT: {
            per: 'دانش آموز مطابقت ندارد',
            eng: 'Student is not Correct'
        },
        THIS_IS_NOT_CORRECT_TEACHER: {
            per: 'معلم مطابفت ندارد',
            eng: 'Teache is not Correct'
        },
        THIS_CLASS_HAS_BEEN_RESERVED: {
            per: 'این کلاس قبلا رزرو شده است',
            eng: 'This class has been reserved.'
        },
        SUCCESS_REJECT_STUDENT: {
            per: 'دانش آموزی ریجکت شد',
            eng: 'Student Rejected'
        },
        ERROR_ON_REJECT_STUDENT: {
            per: 'خطا در ریجکت کردن دانش آموز',
            eng: 'Error on Rejecting Student'
        },
        SUCCESS_ACCEPT_STUDENT: {
            per: 'دانش آموز قبول شد',
            eng: 'Student Accpted'
        },
        ERROR_ON_ACCEPT_STUDENT: {
            per: 'خطا در قبول کردن دانش آموز',
            eng: 'Error on Accepting Student'
        },
        YOU_HAVE_NOT_ACCEPTED_YET: {
            per: 'کلاس در وضعیت شروع یا پایان قرار نگرفته است',
            eng: 'Class has not started or ended yet.'
        },
        YOU_HAVE_NOT_ACCEND: {
            per: 'شما هنوز به عنوان دانش آموز تایید نشه اید یا کلاس تمام شده است',
            eng: 'You Have not Accepted yet as Student of the Class or class is over.'
        },
        INVALID_RESERVE_REQUEST_DATE: {
            per: 'زمان برگزاری این کلاس گذشته یا نرسیده است',
            eng: 'The time for reserving this class is over or it\'s to sson for this work.'
        },
        YOU_ARE_NOT_CORRECT_USER: {
            per: 'اطلاعات شما مطابق کلاس نیست',
            eng: 'You Information is not related to this Class'
        },
        ERROR_ON_RESERVING_CLASS: {
            per: 'خطا در رزور کلاس',
            eng: 'Error on Reserving Class'
        },
        SUCCESS_CLASS_RESERVE: {
            per: 'کلاس با موفقیت رزرو شد',
            eng: 'Class has been Reserved'
        },
        ERROR_ON_REVIEW: {
            per: 'خطا در اتمام کلاس و ثبت نظر',
            eng: 'Error on end of Class and submit Review'
        },
        ERROR_ON_STARTING_CLASS: {
            per: 'خطا در شروع کلاس',
            eng: 'Error on Start of Class'
        },
        SUCCESS_CLASS_RESERVE: {
            per: 'کلاس با موفقیت شروع شد',
            eng: 'Class has been Started'
        }
    },
    VALIDATIONS: {
        EMPTY_FIELD: 'فیلد خالی است',
        EMPTY_ARRAY: {
            per: 'آرایه خالی است',
            eng: 'Empty Array'
        },
        INVALID_NUMBER: {
            per: 'عدد بفرستید',
            eng: 'Please Enter a valid number'
        },
        INVALID_EMAIL: 'ایمیل نامعتبر است',
        INVALID_FULLNAME: 'لطفا نام کامل خود را مشخص کنید',
        PASSWORD_MUST_BE_5_CHARACTERS: 'پسورد باید حداقل 6 حرف داشته باشد',
        CHECK_THE_FIELD: 'لطفا فیلد های مورد نظر را تصحبح کنید',
        WRONG_DATE: 'تاریخ نامعتبر است',
    }
}
