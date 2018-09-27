
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {};generateEUI.paths['resource/mySkins/gameComponent.exml'] = window.gameComponent = (function (_super) {
	__extends(gameComponent, _super);
	function gameComponent() {
		_super.call(this);
		this.skinParts = ["bg","cloud1","cloud2","bgGroup","collisionGroup"];
		
		this.height = 750;
		this.width = 1334;
		this.elementsContent = [this.bg_i(),this.bgGroup_i(),this.collisionGroup_i(),this._Image1_i()];
	}
	var _proto = gameComponent.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.fillMode = "repeat";
		t.height = 750;
		t.source = "bg_png";
		t.width = 1334;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bgGroup_i = function () {
		var t = new eui.Group();
		this.bgGroup = t;
		t.height = 750;
		t.width = 1334;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.cloud1_i(),this.cloud2_i()];
		return t;
	};
	_proto.cloud1_i = function () {
		var t = new eui.Image();
		this.cloud1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cloud_png";
		t.x = 197;
		t.y = 253.33;
		return t;
	};
	_proto.cloud2_i = function () {
		var t = new eui.Image();
		this.cloud2 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cloud_png";
		t.x = 860.03;
		t.y = 168.83;
		return t;
	};
	_proto.collisionGroup_i = function () {
		var t = new eui.Group();
		this.collisionGroup = t;
		t.height = 750;
		t.width = 1334;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "water_png";
		t.x = 0;
		t.y = 684;
		return t;
	};
	return gameComponent;
})(eui.Skin);generateEUI.paths['resource/mySkins/VirtualJoystickSkin.exml'] = window.VirtualJoystickSkin = (function (_super) {
	__extends(VirtualJoystickSkin, _super);
	function VirtualJoystickSkin() {
		_super.call(this);
		this.skinParts = ["circle","ball"];
		
		this.height = 242;
		this.width = 242;
		this.elementsContent = [this.circle_i(),this.ball_i()];
	}
	var _proto = VirtualJoystickSkin.prototype;

	_proto.circle_i = function () {
		var t = new eui.Image();
		this.circle = t;
		t.source = "circle_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.ball_i = function () {
		var t = new eui.Image();
		this.ball = t;
		t.source = "ball_png";
		t.x = 52;
		t.y = 52;
		return t;
	};
	return VirtualJoystickSkin;
})(eui.Skin);