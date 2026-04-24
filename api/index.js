// TELEGRAM USER INFO API - AKASH BACKEND
// Developer: WASIF ALI | Telegram: @FREEHACKS95

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const { username } = req.query;

  if (!username) {
    return res.status(200).json({
      success: false,
      message: "Username required. Use: ?username=@FREEHACKS95",
      developer: "WASIF ALI",
      telegram: "@FREEHACKS95"
    });
  }

  try {
    let cleanUsername = username.trim();
    if (!cleanUsername.startsWith('@')) {
      cleanUsername = '@' + cleanUsername;
    }

    // Akash API call (no timeout)
    const response = await fetch(`https://akashhacker.gt.tc/telegram.php?username=${encodeURIComponent(cleanUsername)}`);
    const data = await response.json();

    if (!data.success) {
      return res.status(200).json({
        success: false,
        message: "Username not found",
        developer: "WASIF ALI",
        telegram: "@FREEHACKS95"
      });
    }

    const result = {
      success: true,
      username: data.username || cleanUsername,
      profile: {
        name: data.data?.profile?.name || cleanUsername,
        bio: data.data?.profile?.bio || null,
        verified: data.data?.profile?.verified || false,
        premium: data.data?.profile?.premium || false,
        has_photo: data.data?.profile?.has_photo || false,
        profile_type: data.data?.profile?.profile_type || "user",
        profile_photo: data.data?.profile?.profile_photo || null
      },
      contacts: {
        telegram_link: `https://t.me/${cleanUsername.replace('@', '')}`,
        direct_message: `tg://resolve?domain=${cleanUsername.replace('@', '')}`,
        is_public: true
      },
      activity: {
        online_status: data.data?.activity?.online_status || "offline",
        last_seen: data.data?.activity?.last_seen || null,
        subscribers: data.data?.activity?.subscribers || 0,
        activity_score: data.data?.activity?.activity_score || 0
      },
      channels_groups: data.data?.channels_groups || [],
      analysis: {
        profile_quality: data.data?.analysis?.profile_quality || "unknown",
        account_age: data.data?.analysis?.account_age || "unknown"
      },
      developer: "WASIF ALI",
      telegram: "@FREEHACKS95"
    };

    return res.status(200).json(result);

  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Service unavailable. Please try again.",
      developer: "WASIF ALI",
      telegram: "@FREEHACKS95"
    });
  }
}
