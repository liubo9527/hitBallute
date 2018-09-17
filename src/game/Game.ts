class Game extends eui.Component {
	public constructor() {
		super();
		this.skinName = "game";
	}
	childrenCreated(){
		super.childrenCreated();
		//this.createBody();
	}

	createBody(){
		var body:p2.Body = new p2.Body();
		var shapeRect:p2.Shape = new p2.Circle(4)
		body.addShape(shapeRect);
		//world
		var world:p2.World = new p2.World();
		world.addBody(body);

		egret.Ticker.getInstance().register((dt)=>{
			world.step(dt / 1000);
		}, this)
	}
}