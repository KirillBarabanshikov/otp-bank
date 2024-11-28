import axios from 'axios';

import { API_URL } from '../consts';

export async function sendEmail(body: { address: string; origin: boolean; decorative: boolean }) {
    try {
        await axios.post(API_URL + '/api/email/send', body);
    } catch (error) {
        throw new Error(`send email error ${error}`);
    }
}

export async function fetchHash() {
    try {
        const response = await axios.get<string>(API_URL + '/api/generation/hash');
        return response.data;
    } catch (error) {
        throw new Error(`fetch hash error ${error}`);
    }
}

export async function fetchGenerationFile() {
    try {
        const response = await axios.get<{ generated_image: string; status: 'generate' | 'ready' | 'error' }>(
            API_URL + `/api/generation/file`,
        );
        return response.data;
    } catch (error) {
        throw new Error(`fetch generation file error ${error}`);
    }
}

export async function generationDecorate(body: { origin: boolean }) {
    try {
        const response = await axios.post<{ generated_image: string }>(API_URL + '/api/generation/decorate', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`generation decorate error ${error}`);
    }
}

export async function generationFile() {
    try {
        await axios.post(
            API_URL + '/api/generation/file',
            {},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
    } catch (error) {
        throw new Error(`generation file error ${error}`);
    }
}
