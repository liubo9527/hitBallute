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
        _this.skinName = "game";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //this.createBody();
    };
    Game.prototype.createBody = function () {
        var body = new p2.Body();
        var shapeRect = new p2.Circle(4);
        body.addShape(shapeRect);
        //world
        var world = new p2.World();
        world.addBody(body);
        egret.Ticker.getInstance().register(function (dt) {
            world.step(dt / 1000);
        }, this);
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
