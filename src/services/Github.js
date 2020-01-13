import { authorize, revoke } from 'react-native-app-auth';

const REDIRECT_URL = 'my-scheme://my-host/'

const githubConfig = {
    id: '52c2551c6ed6fbb92e10',
    secret: '74d465d6330fbb27821c565baac95fc67cf98c9e'
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

export async function getAccessToken() {
    const result = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: githubConfig.id,
        client_secret: githubConfig.secret,
        code: code
      }),
    });
    
    return result.json();
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