import {expect, test} from '@playwright/test';
import {ApiUrls} from '../helpers/ApiUrls'


test('Verify that user exist in the list', async ({request}) => {
    let issues;
    await test.step('Given GET users is invoked', async () => {
        issues = await request.get(ApiUrls.USERS + '?page=2');
    });
    await test.step('When response is retrieved and it is ok', async () => {
        expect(issues.ok()).toBeTruthy();
    });
    await test.step('Then user "Lindsay" is on the list', async () => {
        const response = await issues.json();
        expect(response.data[1].first_name).toBe('Lindsay')
    });
});

test('Second demo api with params', async ({request}) => {
    let issues;
    await test.step('step one', async () => {
        issues = await request.get(ApiUrls.USERS, {
            params: {
                'page': '2'
            }
        });
    });

    await test.step('Step two', async () => {
        expect(issues.ok()).toBeTruthy();
    });

    await test.step('Step three', async () => {
        const response = await issues.json();
        expect(response.data[1].first_name).toBe('Lindsay')
    });
});