import path from 'path';

export const MOCK_VIDEO_PATH = path.join(__dirname, '../assets/camera.mjpeg');
export const MOCK_IMAGE = 'tests/e2e/assets/id-card.jpg';
export const FLOW_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY}`;
export const HOME_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
