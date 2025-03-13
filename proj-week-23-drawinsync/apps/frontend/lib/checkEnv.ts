const requiredEnvVars = [
    'HTTP_SERVER_URL',
    'FRONTEND_URL',
    'NEXTAUTH_SECRET',
];

export const checkEnvVars = () => {
    let notDefined: string[] = [];
    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar])
            notDefined.push(envVar);
    })
    if (notDefined.length > 0)
        throw new Error(`Environment variable ${notDefined.toString()} not defined`);
}