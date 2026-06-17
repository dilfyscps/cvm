export const DISCORD_USER_ID = "1385995532505317526";

export type DiscordProfile = {
  id: string;
  displayName: string;
  username: string;
  avatarUrl: string;
};

export function discordDefaultAvatarUrl(userId: string) {
  const index = Number((BigInt(userId) >> 22n) % 6n);
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

export function discordAvatarUrl(userId: string, avatarHash: string | null | undefined) {
  if (avatarHash) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=256`;
  }
  return discordDefaultAvatarUrl(userId);
}

export function fallbackDiscordProfile(userId = DISCORD_USER_ID): DiscordProfile {
  return {
    id: userId,
    displayName: "CVMSCPS",
    username: "cvmscps",
    avatarUrl: discordDefaultAvatarUrl(userId),
  };
}
