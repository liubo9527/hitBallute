class Game extends eui.Component {
	time = 0;
	material1;
	material2;
	hero: Role;
	collisionGroup:eui.Group;//碰撞层活动层
	bgGroup:eui.Group;//背景层
	vj:VirtualJoystick;//虚拟摇杆
	public constructor() {
		super();
		this.skinName = "gameComponent";
	}
	childrenCreated(){
		super.childrenCreated();
		this.worldInit();
	}

	
 	playAnimation(target:egret.tween.TweenGroup,isLoop:boolean):void
	{
		if(isLoop)
		{
			for(var key in target.items)
			{
				target.items[key].props = {loop:true};
			}
		}
		target.play();
	}

	worldInit(){

		this.material1 = new p2.Material(1);
		this.material2 = new p2.Material(2);
	
		//物理世界与实际像素之间的转换系数
		var width = 750;
		var height = 1334;
		var factor: number = 50;
		var world:p2.World = new p2.World({
			 gravity : [0, -1]
		});
		var iceSteelContactMaterial = new p2.ContactMaterial(this.material1, this.material2);
		iceSteelContactMaterial.friction = 1;
		iceSteelContactMaterial.restitution = 0.1;
		world.addContactMaterial(iceSteelContactMaterial);

		//创建墙壁top
		this.createGround(world, this.bgGroup, 1, 0, 1334, 1, "", 667, 0);//top
		//创建左边台阶
		this.createGround(world, this.bgGroup, 2, 0, 302, 29, "step1_png", 145, 675	); 
		//创建右边台阶
		this.createGround(world, this.bgGroup, 3, 0, 302, 29, "step1_png", 1183, 675);
		//创建空中台阶
		this.createGround(world, this, 4, 0, 121, 29, "step2_png", 667, 250);
		//创建空中台阶
		this.createGround(world, this, 5, 0, 121, 29, "step2_png", 467, 400);
		//创建空中台阶
		this.createGround(world, this, 6, 0, 121, 29, "step2_png", 867, 400);

		//创建left right bottom墙壁
		this.createGround(world, this.bgGroup, 11, 0, 1, 750, "", 0, 375);
		this.createGround(world, this.bgGroup, 12, 0, 1, 750, "", 1334, 375);
		this.createGround(world, this.bgGroup, 13, 0, 1500, 1, "", 667, 730);
		
		egret.startTick((dt)=>{
			var now = dt;
        	var time = this.time;
        	var pass = now - time;
			this.time = now;
			if (pass < 10) {
                return;
            }
            if (pass > 1000) {
                return;
            }
			world.step(pass/1000);
			var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            for (var i: number = 0; i < l; i++) {
                var boxBody: p2.Body = world.bodies[i];
				if(boxBody.displays){
					var box: egret.DisplayObject = boxBody.displays[0];
					if (box) {
						box.x = boxBody.position[0] * factor;
						box.y = stageHeight - boxBody.position[1] * factor;
						box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
						if (boxBody.sleepState == p2.Body.SLEEPING) {
							box.alpha = 0.5;
						}
						else {
							box.alpha = 1;
						}
					}
					if(boxBody.type != p2.Body.STATIC){
						if(boxBody instanceof Role){
							(boxBody as Role).onEnterFrame(dt);
						}
					}
				}
            }
			return false;
		},this);

		this.hero = new Role(this.collisionGroup, 375, 600, 1, 1);
		world.addBody(this.hero);
		this.hero.shapes[0].material = this.material2;
		//增加敌人
		var enemy = new Role(this.collisionGroup, 200, 600, 0, 1, this.hero);
		world.addBody(enemy);
		//增加敌人
		var enemy = new Role(this.collisionGroup, 200, 100, 0, 1, this.hero);
		world.addBody(enemy);
		//增加敌人
		var enemy = new Role(this.collisionGroup, 200, 400, 0, 1, this.hero);
		world.addBody(enemy);
	
		//虚拟摇杆
		this.vj = new VirtualJoystick();
		this.vj.addEventListener("vj_start",this.onStart, this);
		this.vj.addEventListener("vj_move", this.onChange, this);
		this.vj.addEventListener("vj_end", this.onEnd, this);
		this.vj.start();	
	}

	//摇杆启动，人物开始根据摇杆移动
	private onStart(){
		// this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	//触摸摇杆的角度改变，人物的移动速度方向也随之改变
	private onChange(e:egret.Event){
		var angle = e.data;
		var speedX = Math.cos(angle)*10;
		var speedY = Math.sin(angle)*10;
		var gravity = p2.vec2.fromValues(speedX, -speedY);
		this.hero.applyForce(gravity, [0, 0]);
	}

	//停止摇杆，人物停止移动
	private onEnd(){
		// this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	
	//创建墙面
	private createGround(world:p2.World, container:egret.DisplayObjectContainer, id:number, vx:number, w:number, h:number, resid:string, posX:number, posY:number){
		var p2body:p2.Body = new p2.Body(
			{
				mass:1,
				fixedRotation: true,
				position: PhysicsTool.convertToPhysicsPos(posX, posY),
				type:p2.Body.STATIC,
				velocity: [vx, 0]
			}
		);
		p2body.id = id;
		console.log("位置：", p2body.position);
		world.addBody(p2body);
		var rectShape:p2.Box = new p2.Box({width:PhysicsTool.convertToPhysicsLength(w), height: PhysicsTool.convertToPhysicsLength(h)});
		p2body.addShape(rectShape);
		if(!!resid){
			var display = this.createBitmapByName(resid);
			display.width = w;
			display.height = h;
			display.anchorOffsetX = w/2;
			display.anchorOffsetY = h/2;
			p2body.displays = [display];
			container.addChild(display);
		}
		rectShape.material = this.material1;
		return p2body;
	}

	 /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

	 /**
     * 创建一个圆形
     */
    private createBall(r: number): egret.Shape {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(0, 0, r);
        shape.graphics.endFill();
        return shape;
    }
}