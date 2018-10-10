class Role extends p2.Body {
	balloonCount:number;//默认气球书
	roleType:number;//角色类型 0 敌人，1是玩家
	container:egret.DisplayObjectContainer;
	group;//游戏的碰撞group
	hero:Role;
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
		var p2Shape:p2.Box = new p2.Box({
			width: PhysicsTool.convertToPhysicsLength(display.width),
			height: PhysicsTool.convertToPhysicsLength(display.height)
		});
		this.addShape(p2Shape);
		this.displays = [display];
		this.container.addChild(display);
		display.anchorOffsetX = display.width/2;
		display.anchorOffsetY = display.height/2;
		//
		if(this.roleType == 0){
			setInterval(()=>{
				this.autoAttack();
			}, 100)
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
		//如果是敌人 去打你
		
			
	}

	autoAttack(){
		if(this.position[1] < 2){
			var forceY = Math.random()*100 +50; 
			var gravity = p2.vec2.fromValues(0,  forceY);
			this.applyForce(gravity, [0, 0]); 
		}else{
			var dx = this.hero.position[0] - this.position[0];
			var dy = this.hero.position[1] - this.position[1];
			var distance = global.Math.sqrt(dx*dx + dy*dy);
			var kValue = 10;
			var gravity = p2.vec2.fromValues(kValue * dx/distance,  kValue * dy/distance)
			this.applyForce(gravity, [0, 0]);
			console.log(""+dx/distance+""+dy/distance);
		}
	}
}