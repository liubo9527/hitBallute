class Role extends p2.Body{
	balloonCount:number;//默认气球书
	roleType:number;//角色类型 0 敌人，1是玩家
	container:egret.DisplayObjectContainer;
	group;//游戏的碰撞group
	public constructor(container:egret.DisplayObjectContainer, posX:number, posY:number, type:number, balloonCount:number) {
		super({
			mass:1,
			fixedRotation:true
		});
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
			displayName = "enemy1_png";
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
	}
}