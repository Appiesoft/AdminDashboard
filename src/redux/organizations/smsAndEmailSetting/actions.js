import SmsAndEmailActionTypes from './constant';

type AuthAction = { type: string, payload: {} | string };

// start employee list
export const smsAndEmail = (data): AuthAction => ({
    type: SmsAndEmailActionTypes.GET_SMS_AND_EMAIL_LIST,
    payload: { ...data },
});

export const smsAndEmailUpdate = (data): AuthAction => ({
    type: SmsAndEmailActionTypes.UPDATE_SMS_AND_EMAIL,
    payload: { ...data },
});
