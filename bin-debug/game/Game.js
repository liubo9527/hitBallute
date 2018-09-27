var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.skinName = "gameComponent";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.worldInit();
    };
    Game.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    Game.prototype.worldInit = function () {
        var _this = this;
        this.material1 = new p2.Material(1);
        this.material2 = new p2.Material(2);
        //物理世界和实际像素之间的转换系数
        var width = 750;
        var height = 1334;
        var factor = 50;
        var world = new p2.World({
            gravity: [0, -1]
        });
        var iceSteelContactMaterial = new p2.ContactMaterial(this.material1, this.material2);
        iceSteelContactMaterial.friction = 1;
        iceSteelContactMaterial.restitution = 0.1;
        world.addContactMaterial(iceSteelContactMaterial);
        //创建墙壁top
        this.createGround(world, this.bgGroup, 1, 0, 1334, 1, "", 667, 0); //top
        //创建墙壁bottom
        this.createGround(world, this.bgGroup, 1, 0, 1334, 1, "", 667, 800); //top
        //创建左边台阶
        this.createGround(world, this.bgGroup, 2, 0, 302, 29, "step1_png", 145, 675); //left
        //创建右边台阶
        this.createGround(world, this.bgGroup, 3, 0, 302, 29, "step1_png", 1183, 675); //bottom
        //创建空中台阶
        //this.createGround(world, this, 4, 0, 10, 1334, "step2_png", 745, 667);//right
        egret.startTick(function (dt) {
            var now = dt;
            var time = _this.time;
            var pass = now - time;
            _this.time = now;
            if (pass < 10) {
                return;
            }
            if (pass > 1000) {
                return;
            }
            world.step(pass / 1000);
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            for (var i = 0; i < l; i++) {
                var boxBody = world.bodies[i];
                var box = boxBody.displays[0];
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
        }, this);
        this.hero = new Role(this.collisionGroup, 375, 600, 1, 1);
        world.addBody(this.hero);
        this.hero.shapes[0].material = this.material2;
        //增加敌人
        var enemy = new Role(this.collisionGroup, 200, 600, 0, 1);
        world.addBody(enemy);
        //按键处理
        // this.upControl.addEventListener(egret.TouchEvent.TOUCH_TAP,(event)=>{
        // 	var gravity = p2.vec2.fromValues(0, 200);
        // 	this.hero.applyForce(gravity, [0, 0]);
        // }, this);
        //虚拟摇杆
        this.vj = new VirtualJoystick();
        this.vj.x = 1080;
        this.vj.y = 600;
        this.addChild(this.vj);
        this.vj.addEventListener("vj_start", this.onStart, this);
        this.vj.addEventListener("vj_move", this.onChange, this);
        this.vj.addEventListener("vj_end", this.onEnd, this);
        this.vj.start();
    };
    //摇杆启动，人物开始根据摇杆移动
    Game.prototype.onStart = function () {
        // this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    //触摸摇杆的角度改变，人物的移动速度方向也随之改变
    Game.prototype.onChange = function (e) {
        // var angle = e.data;
        // this.speedX = Math.cos(angle)*this.speed;
        // this.speedY = Math.sin(angle)*this.speed;
    };
    //停止摇杆，人物停止移动
    Game.prototype.onEnd = function () {
        // this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    //创建墙面
    Game.prototype.createGround = function (world, container, id, vx, w, h, resid, posX, posY) {
        var p2body = new p2.Body({
            mass: 1,
            fixedRotation: true,
            position: PhysicsTool.convertToPhysicsPos(posX, posY),
            type: p2.Body.STATIC,
            velocity: [vx, 0]
        });
        p2body.id = id;
        console.log("位置：", p2body.position);
        world.addBody(p2body);
        var rectShape = new p2.Box({ width: PhysicsTool.convertToPhysicsLength(w), height: PhysicsTool.convertToPhysicsLength(h) });
        p2body.addShape(rectShape);
        var display = this.createBitmapByName(resid);
        display.width = w;
        display.height = h;
        display.anchorOffsetX = w / 2;
        display.anchorOffsetY = h / 2;
        p2body.displays = [display];
        container.addChild(display);
        rectShape.material = this.material1;
        return p2body;
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    Game.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
    * 创建一个圆形
    */
    Game.prototype.createBall = function (r) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(0, 0, r);
        shape.graphics.endFill();
        return shape;
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map