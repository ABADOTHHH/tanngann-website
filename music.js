(function () {
  let ytPlayer = null;
  let apiLoaded = false;
  let playing = false;

  function extractVideoId(url) {
    const w = url.match(/[?&]v=([^&]+)/);
    const s = url.match(/youtu\.be\/([^?&]+)/);
    return (w && w[1]) || (s && s[1]) || null;
  }

  function setPlaying(state) {
    playing = state;
    const btn = document.getElementById('play-btn');
    if (!btn) return;
    if (playing) {
      btn.textContent = '[ ■ stop ]';
      btn.classList.add('playing');
    } else {
      btn.textContent = '[ ▶ play ]';
      btn.classList.remove('playing');
    }
  }

  window.onYouTubeIframeAPIReady = function () {
    const meta = document.querySelector('meta[name="post-music"]');
    if (!meta) return;
    const videoId = extractVideoId(meta.content.trim());
    if (!videoId) return;

    const container = document.createElement('div');
    container.id = 'yt-player';
    container.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    document.body.appendChild(container);

    ytPlayer = new YT.Player('yt-player', {
      videoId,
      playerVars: { autoplay: 0, loop: 1, playlist: videoId },
      events: {
        onReady: function (e) {
          e.target.playVideo();
          setPlaying(true);
        },
      },
    });
  };

  function handleClick() {
    if (!ytPlayer) {
      if (!apiLoaded) {
        apiLoaded = true;
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
      return;
    }
    if (playing) {
      ytPlayer.stopVideo();
      setPlaying(false);
    } else {
      ytPlayer.playVideo();
      setPlaying(true);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const meta = document.querySelector('meta[name="post-music"]');
    if (!meta || !meta.content.trim()) return;

    const header = document.querySelector('.post-header');
    if (!header) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'music-player';
    const btn = document.createElement('button');
    btn.id = 'play-btn';
    btn.textContent = '[ ▶ play ]';
    btn.addEventListener('click', handleClick);
    wrapper.appendChild(btn);
    header.insertAdjacentElement('afterend', wrapper);
  });
})();
