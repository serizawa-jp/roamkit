(function (global) {
    const defaultConfig = {
        enableClickAndPlay: false,
        enableSpeedController: false,
        speed: [0.5, 1.0, 1.5, 2.0]
    };
    const config = {...defaultConfig, ...global.audioTimestamperConfig};

    const activate = () => {
        Array.from(document.getElementsByTagName('AUDIO'))
        .forEach(el => {
          if(el.closest('.rm-zoom-item') !== null){
            return; //ignore breadcrumbs and page log
          }
          const block = el.closest('.roam-block-container');
          addTimestampButtons(block, el);

          if (config.enableSpeedController) {
            addSpeedControlButtons(block, el);
          }
        });
    };

    const getControlButton = (block) => block.parentElement.querySelector('.audio-timestamp-control');
    const getSpeedControlButton = (block) => block.parentElement.querySelector('.audio-speed-control');

    const addSpeedControlButtons = (block, el) => {
        if (block.children.length < 2) return null;

        if (getSpeedControlButton(block) !== null) {
            return null;
        }

        const parent = document.createElement('div');
        config.speed.forEach(speed => addSpeedControlButton(parent, el, speed));

        const closestMainBlock = el.closest('.rm-block-main');
        closestMainBlock.parentElement.insertBefore(parent, closestMainBlock.nextSibling);
    };

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

      const addSpeedControlButton = (parent, el, speed) => {
        const button = document.createElement('button');
        button.innerText = speed.toFixed(1);
        button.classList.add('audio-speed-control');
        button.style.borderRadius = '50%';
        button.addEventListener('click', () => {
            el.playbackRate = speed;
        });
        parent.insertBefore(button, parent.nextSibling);
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

      setInterval(activate, 1000);
}(this));
