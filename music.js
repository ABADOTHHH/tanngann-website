(function () {
  const MUTE_KEY = 'tanngann-muted';
  let ytPlayer = null;

  function isMuted() {
    // Default: not muted on first visit
    return localStorage.getItem(MUTE_KEY) === '1';
  }

  function setMuted(val) {
    localStorage.setItem(MUTE_KEY, val ? '1' : '0');
  }

  function extractVideoId(url) {
    const w = url.match(/[?&]v=([^&]+)/);
    const s = url.match(/youtu\.be\/([^?&]+)/);
    return (w && w[1]) || (s && s[1]) || null;
  }

  function updateBtn() {
    const btn = document.getElementById('music-btn');
    if (!btn) return;
    btn.textContent = isMuted() ? '[ ♪ off ]' : '[ ♪ on ]';
    btn.classList.toggle('music-muted', isMuted());
  }

  function toggleMute() {
    setMuted(!isMuted());
    if (ytPlayer) {
      if (isMuted()) {
        ytPlayer.mute();
      } else {
        ytPlayer.unMute();
        ytPlayer.playVideo();
      }
    }
    updateBtn();
  }

  // Called by YouTube IFrame API when ready
  window.onYouTubeIframeAPIReady = function () {
    const meta = document.querySelector('meta[name="post-music"]');
    if (!meta || !meta.content.trim()) return;
    const videoId = extractVideoId(meta.content.trim());
    if (!videoId) return;

    const container = document.createElement('div');
    container.id = 'yt-player';
    container.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    document.body.appendChild(container);

    ytPlayer = new YT.Player('yt-player', {
      videoId,
      playerVars: { autoplay: 1, loop: 1, playlist: videoId },
      events: {
        onReady: function (e) {
          if (isMuted()) {
            e.target.mute();
          } else {
            e.target.unMute();
          }
          e.target.playVideo();
        },
      },
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    updateBtn();

    const btn = document.getElementById('music-btn');
    if (btn) btn.addEventListener('click', toggleMute);

    // Load YouTube IFrame API only on pages that have a music link
    const meta = document.querySelector('meta[name="post-music"]');
    if (meta && meta.content.trim()) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }
  });
})();
