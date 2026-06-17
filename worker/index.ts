import { buildOgResponse, isCrawler } from "./og";

const STATIC_ASSET = /\.(avif|css|gif|ico|jpeg|jpg|js|json|map|mjs|png|svg|webp|woff2?|txt|xml)$/i;

function isStaticAssetPath(pathname: string) {
  return STATIC_ASSET.test(pathname);
}

interface Env {
  ASSETS: Fetcher;
  DISCORD_WEBHOOK_URL: string;
  DISCORD_BOT_TOKEN?: string;
}

const RATE_LIMIT_SECONDS = 600;
const MIN_LENGTH = 10;
const MAX_LENGTH = 500;
const EMBED_COLOR = 0xf472b6;
const BRAND_ICON = "https://i.pinimg.com/736x/6c/0b/54/6c0b5493db88e9d033263a92ea3f8f6f.jpg";
const DISCORD_INVITE_CACHE_SECONDS = 300;
const DISCORD_PROFILE_CACHE_SECONDS = 300;
const DEFAULT_DISCORD_USER_ID = "1385995532505317526";

function escapeDiscord(text: string) {
  return text.replace(/```/g, "'''").replace(/@everyone/g, "@\u200beveryone").replace(/@here/g, "@\u200bhere");
}

function buildRequestEmbed(message: string) {
  const submittedAt = Math.floor(Date.now() / 1000);
  const safeMessage = escapeDiscord(message.slice(0, 2000));

  return {
    username: "CVMSCPS",
    avatar_url: BRAND_ICON,
    embeds: [
      {
        author: {
          name: "CVMSCPS · Request Form",
          icon_url: BRAND_ICON,
        },
        title: "New scenepack request",
        description: "A new pack request was submitted from the website.",
        color: EMBED_COLOR,
        fields: [
          {
            name: "Requested pack",
            value: `\`\`\`\n${safeMessage}\n\`\`\``,
            inline: false,
          },
          {
            name: "Submitted",
            value: `<t:${submittedAt}:F>`,
            inline: true,
          },
          {
            name: "Relative",
            value: `<t:${submittedAt}:R>`,
            inline: true,
          },
          {
            name: "Source",
            value: "[cvmscps.com/requests](https://cvmscps.com/requests)",
            inline: true,
          },
        ],
        thumbnail: { url: BRAND_ICON },
        footer: {
          text: "CVMSCPS · Scenepack requests",
          icon_url: BRAND_ICON,
        },
        timestamp: new Date(submittedAt * 1000).toISOString(),
      },
    ],
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/request") {
      if (request.method === "POST") {
        return handleRequestSubmit(request, env);
      }
      return json({ error: "Method not allowed." }, 405);
    }

    if (url.pathname === "/api/discord-invite" && request.method === "GET") {
      return handleDiscordInvite(request);
    }

    if (url.pathname === "/api/discord-profile" && request.method === "GET") {
      return handleDiscordProfile(request, env);
    }

    if (request.method === "GET" && isCrawler(request) && !isStaticAssetPath(url.pathname)) {
      return buildOgResponse(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleRequestSubmit(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const cache = caches.default;
  const cacheKey = new Request(`https://rate-limit.cvmscps/${ip}`);

  const cached = await cache.match(cacheKey);
  if (cached) {
    const retryAfter = cached.headers.get("Retry-After") ?? String(RATE_LIMIT_SECONDS);
    return json(
      { error: "Please wait before submitting another request.", retryAfter: Number(retryAfter) },
      429,
      { "Retry-After": retryAfter }
    );
  }

  let body: { message?: string; honeypot?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (body.honeypot?.trim()) {
    return json({ success: true });
  }

  const message = body.message?.trim() ?? "";
  if (message.length < MIN_LENGTH) {
    return json({ error: `Please enter at least ${MIN_LENGTH} characters.` }, 400);
  }
  if (message.length > MAX_LENGTH) {
    return json({ error: `Keep your request under ${MAX_LENGTH} characters.` }, 400);
  }

  if (!env.DISCORD_WEBHOOK_URL) {
    return json({ error: "Requests are temporarily unavailable." }, 503);
  }

  const discordRes = await fetch(env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildRequestEmbed(message)),
  });

  if (!discordRes.ok) {
    return json({ error: "Failed to submit request. Try again later." }, 502);
  }

  await cache.put(
    cacheKey,
    new Response("1", { headers: { "Retry-After": String(RATE_LIMIT_SECONDS) } }),
    { expirationTtl: RATE_LIMIT_SECONDS }
  );

  return json({ success: true, retryAfter: RATE_LIMIT_SECONDS });
}

async function handleDiscordInvite(request: Request): Promise<Response> {
  const code = new URL(request.url).searchParams.get("code")?.trim();
  if (!code || !/^[a-zA-Z0-9-]+$/.test(code)) {
    return json({ error: "Invalid invite code." }, 400);
  }

  const cache = caches.default;
  const cacheKey = new Request(`https://discord-invite.cvmscps/${code}`);

  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  const discordRes = await fetch(
    `https://discord.com/api/v10/invites/${encodeURIComponent(code)}?with_counts=true`,
    { headers: { "User-Agent": "CVMSCPS (https://cvmscp.com, 1.0)" } }
  );

  if (!discordRes.ok) {
    return json({ error: "Invite not found." }, discordRes.status === 404 ? 404 : 502);
  }

  const data = (await discordRes.json()) as {
    guild?: { name?: string; id?: string; icon?: string | null };
    approximate_presence_count?: number;
    approximate_member_count?: number;
  };

  if (!data.guild?.name) {
    return json({ error: "Invite not found." }, 404);
  }

  const payload = {
    name: data.guild.name,
    iconUrl:
      data.guild.id && data.guild.icon
        ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=128`
        : null,
    online: data.approximate_presence_count ?? null,
    members: data.approximate_member_count ?? null,
  };

  const response = json(payload, 200, {
    "Cache-Control": `public, max-age=${DISCORD_INVITE_CACHE_SECONDS}`,
  });

  await cache.put(cacheKey, response.clone(), { expirationTtl: DISCORD_INVITE_CACHE_SECONDS });
  return response;
}

function discordDefaultAvatarUrl(userId: string) {
  const index = Number((BigInt(userId) >> 22n) % 6n);
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

function discordAvatarUrl(userId: string, avatarHash: string | null | undefined) {
  if (avatarHash) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=256`;
  }
  return discordDefaultAvatarUrl(userId);
}

function fallbackDiscordProfile(userId: string) {
  return {
    id: userId,
    displayName: "CVMSCPS",
    username: "cvmscps",
    avatarUrl: discordDefaultAvatarUrl(userId),
  };
}

async function handleDiscordProfile(request: Request, env: Env): Promise<Response> {
  const userId = new URL(request.url).searchParams.get("id")?.trim() || DEFAULT_DISCORD_USER_ID;
  if (!/^\d{17,20}$/.test(userId)) {
    return json({ error: "Invalid user id." }, 400);
  }

  const cache = caches.default;
  const cacheKey = new Request(`https://discord-profile.cvmscps/v2/${userId}`);

  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  let payload = fallbackDiscordProfile(userId);
  let fromDiscord = false;
  const botToken = env.DISCORD_BOT_TOKEN?.trim();

  if (botToken) {
    const discordRes = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: { Authorization: `Bot ${botToken}` },
    });

    if (discordRes.ok) {
      const user = (await discordRes.json()) as {
        id: string;
        username: string;
        global_name?: string | null;
        avatar?: string | null;
      };

      payload = {
        id: user.id,
        displayName: user.global_name || user.username,
        username: user.username,
        avatarUrl: discordAvatarUrl(user.id, user.avatar),
      };
      fromDiscord = true;
    }
  }

  const response = json(payload, 200, {
    "Cache-Control": `public, max-age=${DISCORD_PROFILE_CACHE_SECONDS}`,
  });

  if (fromDiscord) {
    await cache.put(cacheKey, response.clone(), { expirationTtl: DISCORD_PROFILE_CACHE_SECONDS });
  }

  return response;
}

function json(data: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}
