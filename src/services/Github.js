import { authorize, revoke } from 'react-native-app-auth';

const REDIRECT_URL = 'my-scheme://my-host/'

const githubConfig = {
    id: '12345678910', // Your github id application
    secret: 'a1b2c3d4e5' // Your github secret application
}

export async function startAuthorize() {
  const config = {
    redirectUrl: REDIRECT_URL,
    clientId: githubConfig.id,
    clientSecret: githubConfig.secret,
    scopes: ['identity'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      revocationEndpoint:
        'https://github.com/settings/connections/applications/'+githubConfig.id
    }
  };
  
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