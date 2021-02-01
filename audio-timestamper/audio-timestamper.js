(function (global) {
    const config = global.audioTimestamperConfig;
    const activate = () => {
        Array.from(document.getElementsByTagName('AUDIO'))
        .forEach(el => {
          if(el.closest('.rm-zoom-item') !== null){
            return; //ignore breadcrumbs and page log
          }
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

      setInterval(activate, 1000);
}(this));
