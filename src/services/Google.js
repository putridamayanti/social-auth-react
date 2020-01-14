import { authorize, revoke } from 'react-native-app-auth';

const REDIRECT_URL = 'my-scheme://my-host/'

const googleConfig = {
    id: '12345',
}

export async function loginGoogle() {
    const config = {
        issuer: 'https://accounts.google.com',
        clientId: googleConfig.id,
        redirectUrl: REDIRECT_URL,
        scopes: ['openid', 'profile']
      };
      
      // Log in to get an authentication token
      const authState = await authorize(config);

  if (authState.accessToken) {
    return authState.accessToken;
  }
}

export async function logout(token) {
  const config = {
    clientId: githubConfig.id,
    redirectUrl: REDIRECT_URL,
    scopes: ['identity'],
    serviceConfiguration: {
      revocationEndpoint:
        'https://github.com/settings/connections/applications/'+githubConfig.id
    }
  };
  
  const result = await revoke(config, {
    tokenToRevoke: token,
    includeBasicAuth: true,
    sendClientId: true,
  });

  return result;
}