import { useEffect, useState } from "react";
import {
  DISCORD_USER_ID,
  fallbackDiscordProfile,
  type DiscordProfile,
} from "../lib/discordProfile";

const badges = [
  { label: "Scenepacks", tone: "gold" as const },
  { label: "GIF Packs", tone: "blue" as const },
];

export default function ProfileCard() {
  const [profile, setProfile] = useState<DiscordProfile>(() => fallbackDiscordProfile());

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const res = await fetch(`/api/discord-profile?id=${DISCORD_USER_ID}`);
        if (!res.ok) return;

        const data = (await res.json()) as DiscordProfile;
        if (!active || !data.displayName || !data.username) return;

        setProfile(data);
      } catch {
        // keep fallback
      }
    }

    void loadProfile();
    return () => {
      active = false;
    };
  }, []);

  return (
    <a
      href={`https://discord.com/users/${profile.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="profile-card"
    >
      <img
        src={profile.avatarUrl}
        alt=""
        className="profile-card__avatar"
        loading="lazy"
        decoding="async"
      />
      <h2 className="profile-card__name">{profile.displayName}</h2>
      <p className="profile-card__handle">@{profile.username}</p>
      <div className="profile-card__badges">
        {badges.map((badge) => (
          <span key={badge.label} className={`profile-card__badge profile-card__badge--${badge.tone}`}>
            {badge.label}
          </span>
        ))}
      </div>
    </a>
  );
}
