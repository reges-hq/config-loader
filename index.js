import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

async function loadToObject(obj, key, secretName) {
    const [secret] = await client.accessSecretVersion({
        name: secretName,
    });
    obj[key] = secret.payload.data.toString();
}

export async function loadSecrets(options) {
    const config = {};
    const promises = [];

    for (const [key, name] of Object.entries(options)) {
        promises.push(loadToObject(config, key, name));
    }

    await Promise.all(promises);

    return config;
}
