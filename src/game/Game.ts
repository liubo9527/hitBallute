class Game extends eui.Component {
	time = 0;
	material1;
	material2;
	cloud: egret.tween.TweenGroup;
	hero: eui.Image;
	leftControl: eui.Image;
	rightControl: eui.Image;
	upControl: eui.Image;
	heroPig;
	public constructor() {
		super();
		this.skinName = "game";
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
		//云层活动
		this.playAnimation(this.cloud, true);
		this.material1 = new p2.Material(1);
		this.material2 = new p2.Material(2);
	
		//物理世界和实际像素之间的转换系数
		var width = 750;
		var height = 1334;
		var factor: number = 50;
		var world:p2.World = new p2.World({
			 gravity : [0, -1]
		});
		var iceSteelContactMaterial = new p2.ContactMaterial(this.material1, this.material2);
		iceSteelContactMaterial.friction = 0;
		iceSteelContactMaterial.restitution = 1.1;
		world.addContactMaterial(iceSteelContactMaterial);

		//创建墙壁left
		this.createGround(world, this, 1, 0, 10, 1334, "wall_png", 5, 667);//left
		this.createGround(world, this, 2, 0, 750, 10, "wall_png", 375, 1329);//bottom
		this.createGround(world, this, 3, 0, 10, 1334, "wall_png", 745, 667);//right
		this.createGround(world, this, 4, 0, 750, 10, "wall_png", 375, 5);//top

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
            }
			return false;
		},this);

		this.createFillBall(world, this, 5, 1, 50, "wall_png", 375, 600);
		//按键处理
		this.upControl.addEventListener(egret.TouchEvent.TOUCH_TAP,(event)=>{
			var gravity = p2.vec2.fromValues(0, 50);
			this.heroPig.applyForce(gravity, [0, 0]);
		}, this);
		this.leftControl.addEventListener(egret.TouchEvent.TOUCH_TAP,(event)=>{
			var gravity = p2.vec2.fromValues(-50, 0);
			this.heroPig.applyForce(gravity, [0, 0]);
			this.hero.scaleX = 1;
		}, this);
		this.rightControl.addEventListener(egret.TouchEvent.TOUCH_TAP,(event)=>{
			var gravity = p2.vec2.fromValues(50,0);
			this.heroPig.applyForce(gravity, [0, 0]);
			this.hero.scaleX = -1;
		}, this);	
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
		world.addBody(p2body);
		var rectShape:p2.Box = new p2.Box({width:PhysicsTool.convertToPhysicsLength(w), height: PhysicsTool.convertToPhysicsLength(h)});
		p2body.addShape(rectShape);
		var display = this.createBitmapByName(resid);
		display.width = w;
		display.height = h;
		display.anchorOffsetX = w/2;
		display.anchorOffsetY = h/2;
		p2body.displays = [display];
		container.addChild(display);
		rectShape.material = this.material1;
		return p2body;
	}

	//创建小球
	private createFillBall(world:p2.World, container:egret.DisplayObjectContainer, id:number, vx:number, r:number, resid:string, posX:number, posY:number){
		var p2body:p2.Body = new p2.Body(
			{
				mass:1,
				// fixedRotation: true,
				position: PhysicsTool.convertToPhysicsPos(posX, posY),
				// angularVelocity: vx
			}
		);
		p2body.id = id;
		console.log("位置：", p2body.position);
		world.addBody(p2body);
		var circleShape:p2.Circle = new p2.Circle({radius:PhysicsTool.convertToPhysicsLength(r)});
		circleShape.material = this.material2;
		p2body.addShape(circleShape);
		var display = this.hero;
		display.width = r*2;
		display.height = r*2;
		display.anchorOffsetX = r;
		display.anchorOffsetY = r;
		p2body.displays = [display];
		//container.addChild(display);
		this.heroPig = p2body;
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