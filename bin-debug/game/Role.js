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
var Role = (function (_super) {
    __extends(Role, _super);
    function Role(container, posX, posY, type, balloonCount, hero) {
        if (hero === void 0) { hero = null; }
        var _this = _super.call(this, {
            mass: type == 1 ? 1 : 1,
            fixedRotation: true
        }) || this;
        _this.hero = hero;
        _this.roleType = type;
        _this.container = container;
        _this.balloonCount = balloonCount;
        _this.position = PhysicsTool.convertToPhysicsPos(posX, posY);
        _this.createShape();
        return _this;
    }
    //获取bitmap显示
    Role.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    //创建形状
    Role.prototype.createShape = function () {
        var _this = this;
        var displayName;
        if (this.roleType == 0) {
            displayName = "enemy_png";
            this.group = config.gameGroup.ENEMY;
        }
        else if (this.roleType == 1) {
            displayName = "role_png";
            this.group = config.gameGroup.PLAYER;
        }
        var display = this.createBitmapByName(displayName);
        var p2Shape = new p2.Box({
            width: PhysicsTool.convertToPhysicsLength(display.width),
            height: PhysicsTool.convertToPhysicsLength(display.height)
        });
        this.addShape(p2Shape);
        this.displays = [display];
        this.container.addChild(display);
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        //
        if (this.roleType == 0) {
            setInterval(function () {
                _this.autoAttack();
            }, 100);
        }
    };
    //frame事件
    Role.prototype.onEnterFrame = function (dt) {
        if (this.velocity[0] > 0) {
            this.displays[0].scaleX = -1;
        }
        else if (this.velocity[0] < 0) {
            this.displays[0].scaleX = 1;
        }
        else {
            //doNoting
        }
        //如果是敌人 去打你
    };
    Role.prototype.autoAttack = function () {
        if (this.position[1] < 2) {
            var forceY = Math.random() * 100 + 50;
            var gravity = p2.vec2.fromValues(0, forceY);
            this.applyForce(gravity, [0, 0]);
        }
        else {
            var dx = this.hero.position[0] - this.position[0];
            var dy = this.hero.position[1] - this.position[1];
            var distance = global.Math.sqrt(dx * dx + dy * dy);
            var kValue = 10;
            var gravity = p2.vec2.fromValues(kValue * dx / distance, kValue * dy / distance);
            this.applyForce(gravity, [0, 0]);
            console.log("" + dx / distance + "" + dy / distance);
        }
    };
    return Role;
}(p2.Body));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map