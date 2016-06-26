'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GradientBackground = function () {
  function GradientBackground(stage) {
    _classCallCheck(this, GradientBackground);

    this.stage = stage;
    this.gradientFill = new createjs.Shape();
    this.stage.addChild(this.gradientFill);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    var me = this;
    createjs.Ticker.addEventListener('tick', function () {
      return me.tick();
    });
  }

  _createClass(GradientBackground, [{
    key: 'tick',
    value: function tick() {
      var colorStart = createjs.Graphics.getHSL(new Date().getTime() / 50, 80, 80);
      var colorEnd = createjs.Graphics.getHSL((new Date().getTime() + 50 * 60) / 50, 100, 70);

      this.gradientFill.graphics.clear().beginLinearGradientFill([colorStart, colorEnd], [0, 1], 0, 0, this.stage.canvas.width, this.stage.canvas.height).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
      this.stage.update();
    }
  }]);

  return GradientBackground;
}();

var stage = new createjs.Stage('stage');

var resizeTimer = void 0;
var updateStageSize = function updateStageSize() {
  stage.canvas.setAttribute('width', window.innerWidth);
  stage.canvas.setAttribute('height', window.innerHeight);
};

var INTERVAL = Math.floor(100 / 60 * 10);
window.addEventListener('resize', function () {
  resizeTimer && clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    updateStageSize();
  }, INTERVAL);
});

updateStageSize();

new GradientBackground(stage);
