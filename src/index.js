/* @flow */
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
import React from 'react';
import styled from 'styled-components';
import EXIF from 'exif-js';

/**********************************
* LOCAL FILES
**********************************/
import placeholder from './placeholder.jpg';

const Wrapper = styled.div`
	height: ${props => props.scaleSize}px;
	width: ${props => props.scaleSize}px;
`;

const HiddenInput = styled.input`
	display: none;
`;

const Placeholder = styled.div`
	border: 1px solid #000;
	background: url(${props => props.image ? props.image : placeholder});
	display: inline-block;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	height: 100%;
	width: 100%;
`

/**********************************
	Component
**********************************/
export default class Imageination extends React.Component {

	state = {
		placeholder: React.createRef(),
		fileInput: React.createRef(),
		image: null
	}

	/**
	* Convert the target image to Base64.
	*/
	imageToBase64 = (target) => {

		// Create a new FileReader.
		const reader = new FileReader();

		// When read send result to base64toBlob.
		reader.onload = (e) => this.getArrayBufferOrientation(e.target.result, target);

		// Read the target as DataURL.
		reader.readAsArrayBuffer(target);
	}

	/**
	*	Get orientation data from EXIF.
	*/
	getArrayBufferOrientation = (arrayBuffer, target) => {

		// Read EXIF Orientation data.
		const arrayBufferExif = EXIF.readFromBinaryFile(arrayBuffer);

		// Assign orientation value.
		let orientation = arrayBufferExif.Orientation;

		// Send result to orientImage.
		this.orientImage(arrayBuffer, orientation, target);
	}

	/**
	* Orient the image based on EXIF data.
	*/
	orientImage = (image, orientation, target) => {

		// Create a new Image called thisImage.
		const thisImage = new Image();

		// Onload, route to proper orientation.
		thisImage.onload = () => {

			// Create a consitient ratio to original image.
			const ratio = thisImage.width / thisImage.height;

			const scaleSize = this.props.scaleSize;

			// Switch statement based on orientation value.
			switch (orientation) {
				case 1:
					// Counter Clockwise -> Landscape (Top Facing Right).
					const can1 = {
						canvasW: scaleSize * ratio,
						canvasH: scaleSize,
						drawImgX: scaleSize * ratio,
						drawImgY: scaleSize,
						rotate: 0,
						translateX: 0,
						translateY: 0
					}
					this.imageToCanvas(can1, thisImage);
					break;
				case 3:
					// Clockwise -> Landscape (Top Facing Left).
					const can3 = {
						canvasW: scaleSize * ratio,
						canvasH: scaleSize,
						drawImgX: scaleSize * ratio,
						drawImgY: scaleSize,
						rotate: 180 * Math.PI / 180,
						translateX: -scaleSize * ratio,
						translateY: -scaleSize
					}
					this.imageToCanvas(can3, thisImage);
					break;
				case 6:
					// Vertical -> Portrait (Upside up).
					const can6 = {
						canvasW: scaleSize,
						canvasH: scaleSize * ratio,
						drawImgX: scaleSize * ratio,
						drawImgY: scaleSize,
						rotate: 90 * Math.PI / 180,
						translateX: 0,
						translateY: -scaleSize
					}
					this.imageToCanvas(can6, thisImage);
					break;
				case 8:
					// Vertical -> Portrait (Upside down).
					const can8 = {
						canvasW: scaleSize,
						canvasH: scaleSize * ratio,
						drawImgX: scaleSize * ratio,
						drawImgY: scaleSize,
						rotate: -90 * Math.PI / 180,
						translateX: -scaleSize * ratio,
						translateY: 0
					}
					this.imageToCanvas(can8, thisImage);
					break;
				default:
					// No Available Data.
					const canDefault = {
						canvasW: scaleSize * ratio,
						canvasH: scaleSize,
						drawImgX: scaleSize * ratio,
						drawImgY: scaleSize,
						rotate: 0,
						translateX: 0,
						translateY: 0
					}
					this.imageToCanvas(canDefault, thisImage)
			}
		}

		// Read thisImage into a new Object URL.
		thisImage.src = URL.createObjectURL(target);

	}

	/**
	* Draw the image to Canvas.
	*/
	imageToCanvas = (canVals, thisImage) => {

		// Create new Canvas.
		const can = document.createElement("canvas");

		// Create '2D' context.
		const ctx = can.getContext('2d');

		// Perform Canvas Operations.
		can.width = canVals.canvasW;
		can.height = canVals.canvasH;
		ctx.rotate(canVals.rotate); ctx.translate(canVals.translateX, canVals.translateY);
		ctx.save();
		ctx.drawImage(thisImage, 0, 0, canVals.drawImgX, canVals.drawImgY);
		ctx.restore();

		// Send the canvas data Url to showImage.
		this.setState({image: can.toDataURL()}, this.sendImageToParent);

	}

	sendImageToParent = () => {
		this.props.onImage(this.state.image);
	}

	/**
	*	Handle Upload of Image.
	*/
	handleUpload = () => {
		this.imageToBase64(this.state.fileInput.current.files[0]);
	}

	/**
	* Trigger click on fileInput.
	*/
	triggerFileInput = () => {
		this.state.fileInput.current.click();
	}

	render() {
		return (
			<Wrapper scaleSize={this.props.scaleSize}>
				<Placeholder onClick={this.triggerFileInput} ref={this.state.placeholder} image={this.state.image}>
					<HiddenInput onChange={this.handleUpload} innerRef={this.state.fileInput} alt="hidden file input" type="file" accept="image/*" />
				</Placeholder>
			</Wrapper>
		)
	}
}
