(function (global) {
    const defaultConfig = {
        enableClickAndPlay: false,
        enableKeyShortCuts: true,

        increaseSpeedKey: 'd',
        decreaseSpeedKey: 's',
        rewindKey: 'z',
        advanceKey: 'x',
        resetSpeedKey: 'r',
        preferredSpeedKey: 'G',

        increaseSpeed: 0.5,
        decreaseSpeed: 0.5,
        rewind: 10,
        advance: 10,
        preferredSpeed: 1.2,
    };

    const config = {...defaultConfig, ...global.audioTimestamperConfig};
    const allAudioPlayers = [];
    const log = (s) => console.log(`[audio-timestamper] ${s}`);

    const activate = () => {
        Array.from(document.getElementsByTagName('AUDIO'))
        .forEach(el => {
          if(el.closest('.rm-zoom-item') !== null){
            return; //ignore breadcrumbs and page log
          }

          allAudioPlayers.push(el);

          const block = el.closest('.roam-block-container');
          addTimestampButtons(block, el);
        });
    };

    const getControlButton = (block) => block.parentElement.querySelector('.audio-timestamp-control');

    const addTimestampButtons = (block, el) => {
        if (block.children.length < 2) return null;
        const childBlocks = Array.from(block.children[1].querySelectorAll('.rm-block__input'));
        childBlocks.forEach(child => {
          const timestamp = getTimestamp(child);
          const buttonIfPresent = getControlButton(child);
          const timestampChanged = buttonIfPresent !== null && timestamp != buttonIfPresent.dataset.timestamp;
          if (buttonIfPresent !== null && (timestamp === null || timestampChanged)) {
            buttonIfPresent.remove();
          }
          if (timestamp !== null && (buttonIfPresent === null || timestampChanged)) {
            addTimestampButton(child, timestamp, () => {
                el.currentTime = timestamp;
                if (config.enableClickAndPlay) {
                    el.play();
                }
            });
          }
        });
      };

      const addTimestampButton = (block, timestamp, fn) => {
        const button = document.createElement('button');
        button.innerText = '►';
        button.classList.add('audio-timestamp-control');
        button.dataset.timestamp = timestamp;
        button.style.borderRadius = '50%';
        button.addEventListener('click', fn);
        block.parentElement.insertBefore(button, block);
      };

      const getTimestamp = (block) => {
        var myspan = block.querySelector('span')
        if(myspan === null) return null;
        const blockText = myspan.textContent;
        const matches = blockText.match(/^((?:\d+:)?\d+:\d\d)\D/); // start w/ m:ss or h:mm:ss
        if (!matches || matches.length < 2) return null;
        const timeParts = matches[1].split(':').map(part => parseInt(part));
        if (timeParts.length == 3) return timeParts[0]*3600 + timeParts[1]*60 + timeParts[2];
        else if (timeParts.length == 2) return timeParts[0]*60 + timeParts[1];
        else return null;
      };

      const getCurrentPlayer = () => {
        const isPlaying = (player) => player && player.currentTime > 0 && !player.paused && !player.ended && player.readyState > 2;

        for (const player of allAudioPlayers) {
          if (isPlaying(player)) return player;
        }

        return null;
      };

      const mouseTrapReady = setInterval(() => {
        if (!config.enableKeyShortCuts) {
          clearInterval(mouseTrapReady);
          log("disabled key shourtcuts");
          return;
        }

        log("in mouseTrapReady");
        if (Mousetrap === undefined) return;
        log("found: mouseTrapReady");

        // Speed Up
        Mousetrap.bind(config.increaseSpeedKey, async (e) => {
          log("speed up");

          e.preventDefault();

          const player = getCurrentPlayer();
          if (player === null) {
            return false;
          }

          player.playbackRate += config.increaseSpeed;
          return false;
        });

        // Speed Down
        Mousetrap.bind(config.decreaseSpeedKey, async (e) => {
          log("speed down");
          e.preventDefault();

          const player = getCurrentPlayer();
          if (player === null) {
            return false;
          }

          player.playbackRate -= config.decreaseSpeed;
          return false;
        });

        // rewind
        Mousetrap.bind(config.rewindKey, async (e) => {
          log("rewind");
          e.preventDefault();
          const player = getCurrentPlayer();
          if (player === null) {
            return false;
          }

          player.currentTime -= config.rewind;

          return false;
        });

        // advance
        Mousetrap.bind(config.advanceKey, async (e) => {
          log("advance");
          e.preventDefault();
          const player = getCurrentPlayer();
          if (player === null) {
            return false;
          }

          player.currentTime += config.advance;

          return false;
        });

        // reset speed
        Mousetrap.bind(config.resetSpeedKey, async (e) => {
          log("reset speed");
          e.preventDefault();
          const player = getCurrentPlayer();
          if (player === null) {
            return false;
          }

          player.playbackRate = 1.0;

          return false;
        });

        // preferred speed
        Mousetrap.bind(config.preferredSpeedKey, async (e) => {
          log("preferred speed");
          e.preventDefault();
          const player = getCurrentPlayer();
          if (player === null) {
            return false;
          }

          player.playbackRate = config.preferredSpeed;

          return false;
        });

        clearInterval(mouseTrapReady);
        log("clearInterval");
      }, 1000)

      setInterval(activate, 1000);
}(this));
