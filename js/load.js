// 画像読込のシーン
var loadScene = new Phaser.Scene("loadScene");

loadScene.preload = function() {
    // スタート画像
    this.load.image('gamestart', 'assets/images/gamestart.gif');
    // ゲームオーバー画像
    this.load.image('gameover', 'assets/images/gameover.png');
    //マップ画像
    this.load.tilemapTiledJSON('map','assets/data/01.json');
    //tiles01のロード
    this.load.spritesheet('tiles','assets/data/tiles01.png',{frameWidth:70,frameHeight:70});

    this.load.image('airplane','assets/images/unko.jpg');
    
    // this.load.image('airplane2','assets/images/unko.png');
};

loadScene.create = function() {
    // 読み込み完了後にstartSceneを起動
    this.scene.start("startScene");
};
