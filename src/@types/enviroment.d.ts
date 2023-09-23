export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CS_CODE: string;
            DATABASE_URL: string;
            ENV: 'test' | 'dev' | 'prod';
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            PORT: number;
        }
    }
}