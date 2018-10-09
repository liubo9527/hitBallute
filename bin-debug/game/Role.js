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
        console.log(display.height);
        var p2Shape = new p2.Box({
            width: PhysicsTool.convertToPhysicsLength(display.width),
            height: PhysicsTool.convertToPhysicsLength(display.height)
        });
        this.addShape(p2Shape);
        this.displays = [display];
        this.container.addChild(display);
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        if (this.roleType == 0) {
            setInterval(function () {
                if (_this.velocity[1] < 0) {
                    var forceY = Math.random() * 50 + 50;
                    var gravity = p2.vec2.fromValues(0, forceY);
                    //this.applyForce(gravity, [0, 0]); 
                }
            }, 2000);
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
    };
    Role.prototype.autoAttack = function () {
        var forceX = Math.random() * 3 - 1.5;
        var forceY = Math.random() * 3 - 1.5;
        var gravity = p2.vec2.fromValues(forceX, forceY);
        this.applyForce(gravity, [0, 0]);
    };
    return Role;
}(p2.Body));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map