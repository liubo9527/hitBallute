var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PhysicsTool = (function () {
    function PhysicsTool() {
    }
    PhysicsTool.convertToPhysicsPos = function (posX, posY) {
        return [posX / this.factor, (egret.MainContext.instance.stage.stageHeight - posY) / this.factor];
        //return [posX/this.factor, posY/this.factor]
    };
    PhysicsTool.convertToPhysicsLength = function (length) {
        return Math.floor(length / this.factor);
    };
    PhysicsTool.factor = 50;
    return PhysicsTool;
}());
__reflect(PhysicsTool.prototype, "PhysicsTool");
//# sourceMappingURL=PhysicsTool.js.map