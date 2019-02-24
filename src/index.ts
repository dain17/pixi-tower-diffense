import * as WebFont from 'webfontloader';
import 'example/Config';
import Resource from 'Resource';
import BattleScene from 'example/BattleScene';
import GameManager from 'example/GameManager';

let fontLoaded   = false;
let windowLoaded = false;

function initGame() {
  const width = 1136;
  const height = 640;

  const pixiAppOption: PIXI.ApplicationOptions = {
    backgroundColor: 0x222222
  };

  Debug: {
    // コンソールからオブジェクトを調査できるように window に生やす
    (window as any).GameManager = GameManager;

    // 画面キャプチャ
    pixiAppOption.preserveDrawingBuffer = true;
    document.body.addEventListener('keydown', (event) => {
      if (event.ctrlKey === true && event.key === 'c') {
        const a = document.createElement("a");

        a.setAttribute("href", GameManager.instance.game.view.toDataURL());
        a.setAttribute("download", `figure_${new Date().getTime()}`);
        a.click();
      }
    });
  }


  GameManager.start({
    glWidth: width,
    glHeight: height,
    option: pixiAppOption
  });
  // 最初のシーンの読み込み
  GameManager.loadScene(new BattleScene());
}

WebFont.load({
  custom: {
    families: [Resource.FontFamily.Default],
    urls: [Resource.FontFamily.Css]
  },
  active: () => {
    fontLoaded = true;
    if (windowLoaded) {
      initGame();
    }
  }
});

/**
 * エントリーポイント
 */
window.onload = () => {
  windowLoaded = true;
  if (fontLoaded) {
    initGame();
  }
}
