import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../../types/profile';

describe('getProfileValidateErrors', () => {
    test('should work with filled state', () => {
        const validateErrors = [
            ValidateProfileError.SERVER_ERROR,
            ValidateProfileError.NO_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_CITY,
            ValidateProfileError.INCORRECT_USERNAME,
            ValidateProfileError.INCORRECT_USER_DATA,
        ];
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(validateErrors);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});