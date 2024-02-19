import { test, expect } from '@playwright/test';

var userId;
test.describe('API Basics', () => {

    test('Get User Request ', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users');
        console.log(await response.json());
        expect(response.status()).toBe(200);

    })
    test('Create User (Post) Request ', async ({ request }) => {
       const response = await request.post('https://reqres.in/api/users',
            {
                data: {
                    "name": "morpheus",
                    "job": "leader"
                },
                headers: {
                    "Accept": "application/json"
                }

            });
        console.log(await response.json());
        expect(response.status()).toBe(201);

        var res = await response.json();
        userId = res.id;


    })
    test('Update user (Patch) Request ', async ({ request }) => {
        const response = await request.put('https://reqres.in/api/users/'+userId,
            {
                data: {
                    "name": "morpheus",
                    "job": "painter"
                },
                headers: {
                    "Accept": "application/json"
                }

            });
        console.log(await response.json());
        expect(response.status()).toBe(200);

    })
    test('Delete User Request ', async ({ request }) => {
       const response = await request.delete('https://reqres.in/api/users/'+userId);
        expect(response.status()).toBe(204);

    })



});