export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = "c9c844a9c5f3406e81d06cb69d8f9674"; 
export const redirectUri = "https://vibematch-app-aws.s3.us-east-1.amazonaws.com/index.html";
export const scopes = [
  "user-read-private",
  "user-read-email",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
