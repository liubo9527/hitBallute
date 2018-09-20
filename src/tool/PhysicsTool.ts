class PhysicsTool {
	static factor = 50;
	public constructor() {
	}
	static convertToPhysicsPos(posX, posY){
		return [posX / this.factor , (egret.MainContext.instance.stage.stageHeight - posY)/this.factor];
		//return [posX/this.factor, posY/this.factor]
	}

	static convertToPhysicsLength(length){
		return Math.floor(length / this.factor);
	}
}