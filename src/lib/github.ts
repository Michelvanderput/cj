const REPO_OWNER = import.meta.env.VITE_GITHUB_OWNER ?? '';
const REPO_NAME = import.meta.env.VITE_GITHUB_REPO ?? '';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN ?? '';
const FILE_PATH = 'public/data/projects.json';

interface GitHubFileResponse {
  sha: string;
  content: string;
}

/**
 * Commits an updated projects.json to the GitHub repo.
 * Vercel will auto-rebuild on push.
 */
export async function commitProjectsJson(projects: unknown[]): Promise<void> {
  if (!REPO_OWNER || !REPO_NAME || !GITHUB_TOKEN) {
    throw new Error('GitHub configuratie ontbreekt. Stel VITE_GITHUB_OWNER, VITE_GITHUB_REPO en VITE_GITHUB_TOKEN in.');
  }

  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  // 1. Get current file SHA (required for updates)
  const getRes = await fetch(apiUrl, { headers });
  if (!getRes.ok) throw new Error(`Kan bestand niet ophalen: ${getRes.status}`);
  const fileData: GitHubFileResponse = await getRes.json();

  // 2. Encode new content as base64
  const jsonString = JSON.stringify(projects, null, 2) + '\n';
  const content = btoa(unescape(encodeURIComponent(jsonString)));

  // 3. Commit the update
  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `Update projecten via admin (${new Date().toLocaleDateString('nl-NL')})`,
      content,
      sha: fileData.sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    throw new Error(`GitHub commit mislukt: ${putRes.status} — ${(err as { message?: string }).message ?? ''}`);
  }
}
