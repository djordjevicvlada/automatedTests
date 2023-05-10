import {expect, test} from "@playwright/test";
import * as fs from "fs";
import {ApiCleanUp} from "../helpers/ApiCleanUp";
import {JsonFilePaths} from "../helpers/JsonFilePaths";
import {ApiUrls} from "../helpers/ApiUrls";

let createdUserID;
const apiCleanUp = new ApiCleanUp()

test('POST - Create user form json data file', async ({request}) => {
    let response;

    await test.step('Send post request with request body from json file', async () => {
        const requestBody = fs.createReadStream(JsonFilePaths.CREATE_NEW_USER);
        response = await request.post(ApiUrls.USERS, {
            multipart: {
                fileField: requestBody
            }
        });
    });

    await test.step('Print out response', async () => {
        //  console.log(JSON.stringify(await response.json(), null, 3));
    });

    await test.step('Validate status code to be 201', async () => {
        expect(response.status()).toBe(201)
        const responseBody = await response.json();
        createdUserID = responseBody.id
    });
});

test.afterAll(async ({request}) => {
    await apiCleanUp.deleteCreatedUser(createdUserID, {request});
});