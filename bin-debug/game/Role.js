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
    function Role(container, posX, posY, type, balloonCount) {
        var _this = _super.call(this, {
            mass: 1,
            fixedRotation: true
        }) || this;
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
        var displayName;
        if (this.roleType == 0) {
            displayName = "enemy1_png";
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
    };
    return Role;
}(p2.Body));
__reflect(Role.prototype, "Role");
