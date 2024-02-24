var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function () {
    // 初期設定メソッド呼び出し
    this.config();
    
    // 背景色の設定
    this.cameras.main.setBackgroundColor('#99CCFF');
    
    //マップ作成
    this.createMap();
    //プレイヤー作成
    this.createPlayer();
    
    //警告作成
    this.createAlert();
    
    //状態表示
    this.createStatus();
    
    //キーボード
    this.keys = {};
    this.keys.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keys.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keys.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keys.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    this.keys.keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
    this.keys.keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.keys.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    this.keys.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.keys.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keys.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.keys.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    this.keys.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.keys.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.keys.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.keys.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.keys.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keys.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.keys.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.keys.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    this.keys.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.keys.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    this.keys.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.keys.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.keys.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.keys.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.keys.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.keys.key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.keys.key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
    this.keys.key7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);
    this.keys.key8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);
    this.keys.key9 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);
    this.keys.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
};

mainScene.config = function(){
    this.ascend = 0;
    
    this.resistance = 0;
    
    this.resistance2 = 0;
    
    this.lift1 = 0;
    
    this.lift2 = 0;
    
    this.angle = 0;
    
    this.speedX = 0;
    
    this.speedY = 0;
    
    this.addition = 0;
    
    this.auto = 0;
    
    this.alert = 0;
};

mainScene.update = function(){
    console.log(this.player.x);
    
    //対地接近警報系
    if(this.player.x <= 25200 && this.player.x >= 22000 && this.player.y >= 630){
        this.alert = 1;
    }else if(this.player.x <= 16660 && this.player.x >= 13400 && this.player.y >= 500){
        this.alert = 1;
    }else{
        this.alert = 0;
    }
    
    if(this.alert == 1){
        this.createAlert2();
    }
    
    //オートパイロット系設定
    if(this.keys.keyF.isDown){
        this.auto = 1;
    }
    
    if(this.keys.keyG.isDown){
        this.auto = 0;
        this.text99.setText("");
    }
    
    if( this.auto == 1 ){
        this.autopilot();
    }
    
    if( this.auto == 0 ){
        this.deleteAutopilot();
    }
    
    this.text2.setText('現在地：' + Math.floor(this.player.x));
    
    if(this.player.x <= 5720){
        this.text3.setText('滑走路終端まで：' + Math.floor(5720 - this.player.x));
    }else if(this.player.x > 5720 && this.player.x <= 29100){
        this.text3.setText('滑走路始端まで：' + Math.floor(29100 - this.player.x));
    }else if(this.player.x > 34700 ){
        this.text3.setText('過走');
    }else{
        this.text3.setText('滑走路終端まで：' + Math.floor(34700 - this.player.x));
    }
    
    if(this.player.y <= 800){
        this.text4.setText('高度：' + Math.floor(1300 - this.player.y));
    }else{
        this.text4.setText('高度：' + Math.floor(1300000 - 1000 * this.player.y) / 1000);
    }
    
    this.text5.setText('速度：' + Math.floor(this.speedX));
    
    if(this.keys.keyA.isDown){
        this.ascend += 3;
    }
    
    if(this.keys.keyA.isDown && this.keys.key1.isDown){
        this.ascend += 7;
    }
    
    if(this.ascend <= 0){
        this.ascend = 0;
    }
    
    if(this.keys.keyZ.isDown){
        this.ascend += 0;
    }
    
    if(this.keys.keyB.isDown){
        this.ascend -= 2;
    }
    
    if(this.keys.keyB.isDown && this.keys.key1.isDown){
        this.ascend -= 7;
    }

    if(this.keys.keyD.isDown){
        this.angle += 0.2;
    }
    
    if(this.keys.keyS.isDown){
        this.angle -= 0.2;
    }

    this.player.setAngle(this.angle);
    
    //this.player.refreshBody();
    
    this.addition = this.ascend - this.resistance - this.resistance2;
    
    this.speedX = this.addition;
    
    this.player.setVelocity(this.speedX,this.speedY);
    
    this.resistance = this.speedX * ( (this.player.y + 1400) / 2800 + 1) * 0.6;
    
    this.resistance2 = this.speedX * Math.cos(this.angle * Math.PI /180) * -0.3;
    
    this.lift1 = this.speedX * -0.3;
    //翼にかかる揚力
    
    if(this.speedX > 0 || this.speedX < 0){
        this.lift2 = this.speedX * Math.sin(this.angle * Math.PI /180) * 0.4; // 1度 = PI / 180 RAD // Math.PI
    }
    
    //console.log(Math.cos(this.angle * Math.PI /180));
    //機首上げ操作時
    this.speedY = this.lift1 + this.lift2;
};

mainScene.autopilot = function(){
    this.text99 = this.add.text(70, 20,'Auto Pilot',{
        font : '30px Open Sans',
        fill : '#ff0000',
    });
    
    this.text99.setScrollFactor(0);
    
    //離陸滑走
        if(this.player.x < 5720 && this.player.y > 1229){
            if(this.speedX < 100){
                this.ascend += 3;
            }else if(this.speedX >= 100 && this.speedY <1100){
                this.ascend += 7;
            }else{
                this.ascend += 0;
            }
        }
        
        if(this.player.x < 5720 && this.angle >-40){
            if(this.speedX > 800 && this.player.y > 1229){
                this.angle -= 0.2;
            }else if(this.player.y <= 1229){
                this.angle -= 0.2;
            }
        }
        
    if(this.player.x < 13090){
        if(this.player.y < 580 && this.angle < 0){
            this.angle += 0.2;
        }
    }
        
    //巡航時
    if(this.player.x >= 13090 && this.player.x <= 25410){
        //水平飛行
        if(this.player.y > 460){
            if(this.angle > 8){
                this.angle = this.angle - 1/4;
            }else{
                this.angle = this.angle - 1/6;
            }
        }else if(this.player.y < 430){
            this.angle = this.angle + 1/10;
        }
        
        if(this.player.y > 445){
            this.angle = this.angle - 1/10;
        }else if(this.player.y < 445){
            if(this.angle < 8){
                this.angle = this.angle + 1/20;
            }else{
                this.angle = this.angle;
            }
        }
    }
};

mainScene.createAlert2 = function(){
    this.angle = this.angle - 1/3;
    
    this.text98 = this.add.text(70, 50,'対地接近!!',{
        font : '30px Open Sans',
        fill : '#ff0000',
    });
    
    this.text98.setScrollFactor(0);
};

//mainScene.deleteAlert2 = function(){
//    this.text98.setText("");
//};

mainScene.deleteAutopilot = function(){
    this.text99 = this.add.text(70, 20,'',{
        font : '30px Open Sans',
        fill : '#ff0000',
    });
    
    this.text99.setScrollFactor(0);
    this.text99.setText('');
};

mainScene.createPlayer = function(){
    this.player = this.physics.add.image(300,1230,'airplane');

    this.player.setDisplaySize(180,60);
    
    this.player.setCollideWorldBounds(true);
    
    this.cameras.main.startFollow(this.player);
    this.player.setBounce(0);
    
    this.player.setCollideWorldBounds(true);
    
    this.player.direction = 'right';
    
    this.physics.add.collider(this.player,this.groundLayer,this.aaaa,null,this);
    
    //this.player.setAllowGravity(true);
};

mainScene.gameover = function(){
    this.addPicture = this.add.image(400,300,'gameover');
    
    console.log('iie');
    
    this.input.keyboard.on('keydown',function(event){
        this.scene.start('startScene');
    },this);
};

mainScene.aaaa = function(player,shogaibutsu){
    shogaibutsu.index;
    
    if(shogaibutsu.index == 6){
        this.gameover();
    } else if(shogaibutsu.index == 1){
        this.gameover();
    }
};

mainScene.createAlert = function(){
    //this.add.text(500, 900, "Alert" ,{
    //    font : "30px Open Sans",
    //    fill : "#ff0000",
    //});
    
    //this.text.setScrollFactor(0);
    //速度/燃料/失速
};
    
mainScene.createStatus = function(){
    this.text1 = this.add.text(550, 20,'Status',{
        font : '30px Open Sans',
        fill : '#ff0000',
    });
    
    this.text1.setScrollFactor(0);
    
    this.text2 = this.add.text(440, 50,'現在地' + Math.floor(this.player.x),{
        font : '30px Open Sans',
        fill : '#ff0000',
    });
    
    this.text2.setScrollFactor(0);
    
    this.text3 = this.add.text(440, 80,'滑走路終端まで' + Math.floor(5810 - this.player.x),{
        font : '30px Open Sans',
        fill : '#ff0000',
    });
    
    this.text3.setScrollFactor(0);
    
    this.text4 = this.add.text(440, 110,'高度' + Math.floor(1300 - this.player.y),{
        font : '30px Open Sans',
        fill : '#ff0000',
    });
    
    this.text4.setScrollFactor(0);
    
    this.text5 = this.add.text(440, 140,'速度' + Math.floor(this.speedX),{
        font : '30px Open Sans',
        fill : '#ff0000',
    });
    
    this.text5.setScrollFactor(0);
};

mainScene.createMap = function(){
    this.map = this.make.tilemap({key:'map'});
    
    var groundTiles = this.map.addTilesetImage('tiles');
    
    this.groundLayer = this.map.createDynamicLayer('ground',groundTiles,0,0);
    
    this.groundLayer.setCollisionByExclusion([-1]);
    
    this.physics.world.bounds.width = this.groundLayer.width;
    
    this.physics.world.bounds.height = this.groundLayer.height;
    
    this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    
    this.cameras.main.centerOn(300,1100);
};

//Lifting
//power = 切片 + 定数x

//警告表示位置はn（数）を用いて300+150n

//推力・フラップ角・機首上げ・逆噴射・お楽しみ要素・強制停止
//空気抵抗・高度の考慮

//ゲームオーバー 画像置き換え
