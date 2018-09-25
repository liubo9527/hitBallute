
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
		this.skinParts = ["cloud","hreoPIg","cloud1","cloud2","upControl","leftControl","rightControl"];
		
		this.height = 1334;
		this.width = 750;
		this.cloud_i();
		this.elementsContent = [this._Image1_i(),this.hreoPIg_i(),this.cloud1_i(),this.cloud2_i(),this._Image2_i(),this.upControl_i(),this.leftControl_i(),this.rightControl_i()];
		
		eui.Binding.$bindProperties(this, ["cloud1"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [5],[],this._Object1,"x");
		eui.Binding.$bindProperties(this, [318.83],[],this._Object1,"y");
		eui.Binding.$bindProperties(this, [64.3],[],this._Object2,"x");
		eui.Binding.$bindProperties(this, [314.99],[],this._Object2,"y");
		eui.Binding.$bindProperties(this, ["cloud2"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [407.5],[],this._Object3,"x");
		eui.Binding.$bindProperties(this, [313.99],[],this._Object3,"y");
		eui.Binding.$bindProperties(this, [460.64],[],this._Object4,"x");
		eui.Binding.$bindProperties(this, [318.83],[],this._Object4,"y");
		eui.Binding.$bindProperties(this, [407.5],[],this._Object5,"x");
		eui.Binding.$bindProperties(this, [313.99],[],this._Object5,"y");
		eui.Binding.$bindProperties(this, ["hreoPIg"],[0],this._TweenItem3,"target");
		eui.Binding.$bindProperties(this, [1.05],[],this._Object6,"scaleX");
		eui.Binding.$bindProperties(this, [1.05],[],this._Object6,"scaleY");
		eui.Binding.$bindProperties(this, [1],[],this._Object7,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object7,"scaleY");
	}
	var _proto = gameComponent.prototype;

	_proto.cloud_i = function () {
		var t = new egret.tween.TweenGroup();
		this.cloud = t;
		t.items = [this._TweenItem1_i(),this._TweenItem2_i(),this._TweenItem3_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To3_i(),this._To4_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._To4_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._TweenItem3_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem3 = t;
		t.paths = [this._Set3_i(),this._To5_i(),this._To6_i()];
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To5_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.props = this._Object6_i();
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto._To6_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.props = this._Object7_i();
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		this._Object7 = t;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "game_bg_jpg";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.hreoPIg_i = function () {
		var t = new eui.Image();
		this.hreoPIg = t;
		t.anchorOffsetX = 106;
		t.anchorOffsetY = 110;
		t.source = "sun_png";
		t.x = 362.03;
		t.y = 110;
		return t;
	};
	_proto.cloud1_i = function () {
		var t = new eui.Image();
		this.cloud1 = t;
		t.source = "cloud1_png";
		t.x = 64.03;
		t.y = 313.99;
		return t;
	};
	_proto.cloud2_i = function () {
		var t = new eui.Image();
		this.cloud2 = t;
		t.source = "cloud2_png";
		t.x = 434.03;
		t.y = 318.83;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "game_bg_bottom_png";
		t.x = 1;
		t.y = 1163;
		return t;
	};
	_proto.upControl_i = function () {
		var t = new eui.Image();
		this.upControl = t;
		t.alpha = 0.6;
		t.anchorOffsetX = 56;
		t.anchorOffsetY = 56;
		t.source = "button_png";
		t.width = 112;
		t.x = 375;
		t.y = 1278;
		return t;
	};
	_proto.leftControl_i = function () {
		var t = new eui.Image();
		this.leftControl = t;
		t.alpha = 0.6;
		t.anchorOffsetX = 56;
		t.anchorOffsetY = 56;
		t.rotation = -90;
		t.source = "button_png";
		t.x = 253;
		t.y = 1278;
		return t;
	};
	_proto.rightControl_i = function () {
		var t = new eui.Image();
		this.rightControl = t;
		t.alpha = 0.6;
		t.anchorOffsetX = 56;
		t.anchorOffsetY = 56;
		t.rotation = 90;
		t.source = "button_png";
		t.x = 497;
		t.y = 1278;
		return t;
	};
	return gameComponent;
})(eui.Skin);