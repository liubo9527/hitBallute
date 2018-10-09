class Role extends p2.Body {
	balloonCount:number;//默认气球书
	roleType:number;//角色类型 0 敌人，1是玩家
	container:egret.DisplayObjectContainer;
	group;//游戏的碰撞group
	hero;
	public constructor(container:egret.DisplayObjectContainer, posX:number, posY:number, type:number, balloonCount:number, hero:Role = null) {
		super({
			mass:type == 1?1:1,
			fixedRotation:true
		});
		this.hero = hero;
		this.roleType = type;
		this.container = container;
		this.balloonCount = balloonCount;
		this.position = PhysicsTool.convertToPhysicsPos(posX, posY);
		this.createShape();
	}
	//获取bitmap显示
	private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
	//创建形状
	private createShape(){
		var displayName;
		if(this.roleType == 0){
			displayName = "enemy_png";
			this.group = config.gameGroup.ENEMY;
		}else if(this.roleType == 1){
			displayName = "role_png";
			this.group = config.gameGroup.PLAYER;
		}
		var display = this.createBitmapByName(displayName);
		console.log(display.height);
		var p2Shape:p2.Box = new p2.Box({
			width: PhysicsTool.convertToPhysicsLength(display.width),
			height: PhysicsTool.convertToPhysicsLength(display.height)
		});
		this.addShape(p2Shape);
		this.displays = [display];
		this.container.addChild(display);
		display.anchorOffsetX = display.width/2;
		display.anchorOffsetY = display.height/2;
		if(this.roleType == 0){
			setInterval(()=>{
				if(this.velocity[1] < 0){
					var forceY = Math.random()*50 +50; 
					var gravity = p2.vec2.fromValues(0,  forceY);
					//this.applyForce(gravity, [0, 0]); 
				}
			}, 2000)
		}
	}

	//frame事件
	onEnterFrame(dt){
		if(this.velocity[0] > 0){
			this.displays[0].scaleX = -1;
		}else if(this.velocity[0] < 0){
			this.displays[0].scaleX = 1;
		}else{
			//doNoting
		}
	}

	autoAttack(){
		var forceX = Math.random()*3 - 1.5;
		var forceY = Math.random()*3 - 1.5; 
		var gravity = p2.vec2.fromValues(forceX, forceY);
		this.applyForce(gravity, [0, 0]);
	}
}