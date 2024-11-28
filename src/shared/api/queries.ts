import axios from 'axios';

import { API_URL } from '../consts';

export async function sendEmail(body: { hash: string; address: string; origin: boolean; decorative: boolean }) {
    try {
        return await axios.post(API_URL + '/api/email/send', body);
    } catch (error) {
        throw new Error(`send email error ${error}`);
    }
}

export async function generationDecorate(body: { hash: string; origin: boolean }) {
    try {
        return await axios.post(API_URL + '/api/generation/decorate', body);
    } catch (error) {
        throw new Error(`send email error ${error}`);
    }
}
