export async function copyPageLink(path: string): Promise<boolean> {
  const url = `${window.location.origin}${path}`;

  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    window.prompt("Copy link:", url);
    return false;
  }
}
