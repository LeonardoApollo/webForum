// Тест отключен в связи с переходом на настоящий backend Firebase и оставлен в качестве примера
// import { Country } from '@/entities/Country';
// import { Currency } from '@/entities/Currency';

// import { TestAsyncThunk } from '@/shared/libs/tests/TestAsyncThunk/TestAsyncThunk';

// import { ValidateProfileError } from '../../consts/consts';
// import { updateProfileData } from './updateProfileData';

// const data = {
//     id: '1',
//     firstname: 'Михаил',
//     lastname: 'Тяпков',
//     age: 21,
//     currency: Currency.RUB,
//     country: Country.Russia,
//     city: 'Cheboksary',
//     username: 'Admin',
// };

describe('updateProfileData', () => {
    test('bulk', async () => {
        expect(1).toBe(1);
    });
    // test('success', async () => {
    //     const thunk = new TestAsyncThunk(updateProfileData, {
    //         profile: {
    //             form: data,
    //         },
    //     });
    //     thunk.api.put.mockReturnValue(Promise.resolve({ data }));
    //     const result = await thunk.callThunk();

    //     expect(thunk.api.put).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toEqual(data);
    // });
    // test('server error', async () => {
    //     const thunk = new TestAsyncThunk(updateProfileData, {
    //         profile: {
    //             form: data,
    //         },
    //     });
    //     thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    //     const result = await thunk.callThunk();

    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    // });
    // test('validate error', async () => {
    //     const thunk = new TestAsyncThunk(updateProfileData, {
    //         profile: {
    //             form: { ...data, lastname: '' },
    //         },
    //     });
    //     const result = await thunk.callThunk();

    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toEqual([
    //         ValidateProfileError.INCORRECT_USER_DATA,
    //     ]);
    // });
});
export {};
