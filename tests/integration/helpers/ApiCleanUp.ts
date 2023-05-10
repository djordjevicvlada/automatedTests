import {expect} from "@playwright/test";

export class ApiCleanUp {

    constructor() {
    }

    async deleteCreatedUser(user: String, {request}) {
        let response = await request.delete('/api/users/' + user);
        expect(response.status).toBe(204)
    }
}