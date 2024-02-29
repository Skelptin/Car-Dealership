//@ts-nocheck
import { writable, get } from 'svelte/store';
import { browser } from "$app/environment"
import { backendURL } from '../config/config.js';


export const token = writable(browser && localStorage.getItem('token') || null);
export const user = get(writable(browser && JSON.parse(localStorage.getItem('user')) || null));

console.log('token', token)
console.log('user', user);


export const login = async (credentials) => {
    try {
        const response = await fetch(`${backendURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        console.log(JSON.stringify(data.user))
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); 
        token.set(data.token);
        user.set(data.user);

        const userResponse = await fetch(`${backendURL}/api/users/${data.user._id}`, { // Adjust the endpoint to include the user ID
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        const userData = await userResponse.json();
        user.set(userData);
    } catch (error) {
        console.error('Login failed:', error);
    }
};


// Function to logout
export const logout = () => {
    localStorage.removeItem('token');
    token.set(null);
    user.set(null);
};