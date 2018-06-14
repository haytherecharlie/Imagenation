'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n\theight: ', 'px;\n\twidth: ', 'px;\n'], ['\n\theight: ', 'px;\n\twidth: ', 'px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n\tdisplay: none;\n'], ['\n\tdisplay: none;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n\tborder: 1px solid #000;\n\tbackground: url(', ');\n\tdisplay: inline-block;\n\tbackground-repeat: no-repeat;\n\tbackground-position: center;\n\tbackground-size: cover;\n\theight: 100%;\n\twidth: 100%;\n'], ['\n\tborder: 1px solid #000;\n\tbackground: url(', ');\n\tdisplay: inline-block;\n\tbackground-repeat: no-repeat;\n\tbackground-position: center;\n\tbackground-size: cover;\n\theight: 100%;\n\twidth: 100%;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _exifJs = require('exif-js');

var _exifJs2 = _interopRequireDefault(_exifJs);

var _placeholder = require('./placeholder.jpg');

var _placeholder2 = _interopRequireDefault(_placeholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
/**********************************
* React component to resize and
* correct image orientation
* automatically in the frontend.
*
* © 2018 Charlie Hay
**********************************/

/**********************************
* NODE MODULES
**********************************/


/**********************************
* LOCAL FILES
**********************************/


var Wrapper = _styledComponents2.default.div(_templateObject, function (props) {
	return props.scaleSize;
}, function (props) {
	return props.scaleSize;
});

var HiddenInput = _styledComponents2.default.input(_templateObject2);

var Placeholder = _styledComponents2.default.div(_templateObject3, function (props) {
	return props.image ? props.image : _placeholder2.default;
});

/**********************************
	Component
**********************************/

var Imageination = function (_React$Component) {
	_inherits(Imageination, _React$Component);

	function Imageination() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Imageination);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Imageination.__proto__ || Object.getPrototypeOf(Imageination)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			placeholder: _react2.default.createRef(),
			fileInput: _react2.default.createRef(),
			image: null

			/**
   * Convert the target image to Base64.
   */
		}, _this.imageToBase64 = function (target) {

			// Create a new FileReader.
			var reader = new FileReader();

			// When read send result to base64toBlob.
			reader.onload = function (e) {
				_this.getArrayBufferOrientation(e.target.result, target);
			};

			// Read the target as DataURL.
			reader.readAsArrayBuffer(target);
		}, _this.getArrayBufferOrientation = function (arrayBuffer, target) {

			// Read EXIF Orientation data.
			var arrayBufferExif = _exifJs2.default.readFromBinaryFile(arrayBuffer);

			// Assign orientation value.
			var orientation = arrayBufferExif.Orientation;

			// Send result to orientImage.
			_this.orientImage(arrayBuffer, orientation, target);
		}, _this.orientImage = function (image, orientation, target) {

			// Create a new Image called thisImage.
			var thisImage = new Image();

			// Onload, route to proper orientation.
			thisImage.onload = function () {

				// Create a consitient ratio to original image.
				var ratio = thisImage.width / thisImage.height;

				var scaleSize = _this.props.scaleSize;

				// Switch statement based on orientation value.
				switch (orientation) {
					case 1:
						// Counter Clockwise -> Landscape (Top Facing Right).
						var can1 = {
							canvasW: scaleSize * ratio,
							canvasH: scaleSize,
							drawImgX: scaleSize * ratio,
							drawImgY: scaleSize,
							rotate: 0,
							translateX: 0,
							translateY: 0
						};
						_this.imageToCanvas(can1, thisImage);
						break;
					case 3:
						// Clockwise -> Landscape (Top Facing Left).
						var can3 = {
							canvasW: scaleSize * ratio,
							canvasH: scaleSize,
							drawImgX: scaleSize * ratio,
							drawImgY: scaleSize,
							rotate: 180 * Math.PI / 180,
							translateX: -scaleSize * ratio,
							translateY: -scaleSize
						};
						_this.imageToCanvas(can3, thisImage);
						break;
					case 6:
						// Vertical -> Portrait (Upside up).
						var can6 = {
							canvasW: scaleSize,
							canvasH: scaleSize * ratio,
							drawImgX: scaleSize * ratio,
							drawImgY: scaleSize,
							rotate: 90 * Math.PI / 180,
							translateX: 0,
							translateY: -scaleSize
						};
						_this.imageToCanvas(can6, thisImage);
						break;
					case 8:
						// Vertical -> Portrait (Upside down).
						var can8 = {
							canvasW: scaleSize,
							canvasH: scaleSize * ratio,
							drawImgX: scaleSize * ratio,
							drawImgY: scaleSize,
							rotate: -90 * Math.PI / 180,
							translateX: -scaleSize * ratio,
							translateY: 0
						};
						_this.imageToCanvas(can8, thisImage);
						break;
					default:
						// No Available Data.
						var canDefault = {
							canvasW: scaleSize * ratio,
							canvasH: scaleSize,
							drawImgX: scaleSize * ratio,
							drawImgY: scaleSize,
							rotate: 0,
							translateX: 0,
							translateY: 0
						};
						_this.imageToCanvas(canDefault, thisImage);
				}
			};

			// Read thisImage into a new Object URL.
			thisImage.src = URL.createObjectURL(target);
		}, _this.imageToCanvas = function (canVals, thisImage) {

			// Create new Canvas.
			var can = document.createElement("canvas");

			// Create '2D' context.
			var ctx = can.getContext('2d');

			// Perform Canvas Operations.
			can.width = canVals.canvasW;
			can.height = canVals.canvasH;
			ctx.rotate(canVals.rotate);ctx.translate(canVals.translateX, canVals.translateY);
			ctx.save();
			ctx.drawImage(thisImage, 0, 0, canVals.drawImgX, canVals.drawImgY);
			ctx.restore();

			// Send the canvas data Url to showImage.
			_this.setState({ image: can.toDataURL() }, _this.sendImageToParent());
		}, _this.handleUpload = function () {
			_this.imageToBase64(_this.state.fileInput.current.files[0]);
		}, _this.triggerFileInput = function () {
			_this.state.fileInput.current.click();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	/**
 *	Get orientation data from EXIF.
 */


	/**
 * Orient the image based on EXIF data.
 */


	/**
 * Draw the image to Canvas.
 */


	_createClass(Imageination, [{
		key: 'sendImageToParent',
		value: function sendImageToParent() {
			this.props.onImage(this.state.image);
		}

		/**
  *	Handle Upload of Image.
  */


		/**
  * Trigger click on fileInput.
  */

	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				Wrapper,
				{ scaleSize: this.props.scaleSize },
				_react2.default.createElement(
					Placeholder,
					{ onClick: this.triggerFileInput, ref: this.state.placeholder, image: this.state.image },
					_react2.default.createElement(HiddenInput, { onChange: this.handleUpload, innerRef: this.state.fileInput, alt: 'hidden file input', type: 'file', accept: 'image/*' })
				)
			);
		}
	}]);

	return Imageination;
}(_react2.default.Component);

exports.default = Imageination;
//# sourceMappingURL=index.js.map