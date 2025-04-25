const clientId = "4448461456b9404b8b79a79361699294"; // ← Ganti kalau perlu
const redirectUri = "spotify-callback.html"; // ← Pastikan cocok
const scopes = "playlist-read-private user-read-private";

document.getElementById("spotify-login").addEventListener("click", async () => {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem("code_verifier", verifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
});

function generateCodeVerifier(length = 128) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
