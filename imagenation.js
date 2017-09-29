import React from 'react';
import {scaleSize} from './constants';
import uploadHolder from '../../images/image-upload.png';

export default class Imageination extends React.Component {

	imageToBase64(target) {

		const reader = new FileReader();

		reader.onload = (e) => {
			this.base64toBlob(e.target.result, target);
		}

		reader.readAsDataURL(target);
	}

	base64toBlob(dataURI, target) {

	    // convert base64 to raw binary data held in a string
	    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	    var byteString = atob(dataURI.split(',')[1]);

	    // write the bytes of the string to an ArrayBuffer
	    var ab = new ArrayBuffer(byteString.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }

	    // write the ArrayBuffer to a blob, and you're done
	    var bb = new Blob([ab]);
	    this.blobToArrayBuffer(bb, target);
	}

	blobToArrayBuffer(blob, target) {

		// FileReader
		var reader = new FileReader();

		// Onload of reader
		reader.onload = (e) => {
			this.getBlobOrientation(e.target.result, target);
		}

		// Read imgFile as Array Buffer.
		reader.readAsArrayBuffer(blob);
	}

	getBlobOrientation(blob, target) {

		// Create DataView
			let view = new DataView(blob);

			// Return -2 for base case.
			if (view.getUint16(0, false) !== 0xFFD8) {
					this.orientImage(blob, -2, target);
					return false;
			}

			// // While offset < length
			const length = view.byteLength;
			let offset = 2;

			while (offset < length) {

					// Increment by 2 on marker
					const marker = view.getUint16(offset, false);
					offset += 2;

					// If markert == 0xFFE1
					if (marker === 0xFFE1) {

							// Return -1
							const unit32Offset = view.getUint32(offset += 2, false);
							if (unit32Offset !== 0x45786966) {
									this.orientImage(blob, -1, target);
									return false;
							}

							// Check offset
							const little = view.getUint16(offset += 6, false) === 0x4949;
							offset += view.getUint32(offset + 4, little);
							const tags = view.getUint16(offset, little);
							offset += 2;

							// Run tags
							for(let i in tags){

									// If orientation data is present return orientation.
									if (view.getUint16(offset + (i * 12), little) === 0x0112){
											const orientation = view.getUint16(offset + (i * 12) + 8, little);
											this.orientImage(blob, orientation, target);
											return false;
									}
							}
					}

					// Break.
					else if ((marker & 0xFF00) !== 0xFF00) { break; }

					// else getUnit16(offset, false)
					else { offset += view.getUint16(offset, false); }

			}

			// Return -1
			this.orientImage(blob, -1, target);
			return false;

	}

	orientImage(image, orientation, target) {

		const thisImage = new Image();

		thisImage.onload = () => {

			const ratio = thisImage.width / thisImage.height;

			if(orientation === 1 || typeof orentation === 'undefined'){
				this.orientationOne(scaleSize, ratio, thisImage);
			}

			if(orientation === 3) {
				this.orientationThree(scaleSize, ratio, thisImage);
			}

			if(orientation === 6) {
				this.orientationSix(scaleSize, ratio, thisImage);
			}

			if(orientation === 8) {
				this.orientationEight(scaleSize, ratio, thisImage);
			}

		}
		thisImage.src = URL.createObjectURL(target);
	}

	// No rotate / Orentation == 1.
	orientationOne(scaleSize, ratio, thisImage) {

		const can = document.createElement("canvas");
		const ctx = can.getContext('2d');

		const canVals = {
	   canvasW: scaleSize * ratio,
	   canvasH: scaleSize,
	   drawImgX: scaleSize * ratio,
	   drawImgY: scaleSize,
	   rotate: 0,
	   translateX: 0,
	   translateY: 0
	 	}

		can.width  = canVals.canvasW;
		can.height = canVals.canvasH;
		ctx.rotate(canVals.rotate); ctx.translate(canVals.translateX, canVals.translateY);
		ctx.save();
		ctx.drawImage(thisImage,0,0, canVals.drawImgX, canVals.drawImgY);
		ctx.restore();

		this.showImage(can.toDataURL());
	}

	// 90 Degrees / Orientation == 6.
	orientationSix(scaleSize, ratio, thisImage) {
		const can = document.createElement("canvas");
		const ctx = can.getContext('2d');

		const canVals = {
	      canvasW: scaleSize,
	      canvasH: scaleSize  * ratio,
	      drawImgX: scaleSize * ratio,
	      drawImgY: scaleSize,
	      rotate: 90 * Math.PI/180,
	      translateX: 0,
	      translateY: -scaleSize
	    }

		can.width  = canVals.canvasW;
		can.height = canVals.canvasH;
		ctx.rotate(canVals.rotate); ctx.translate(canVals.translateX, canVals.translateY);
		ctx.save();
		ctx.drawImage(thisImage,0,0, canVals.drawImgX, canVals.drawImgY);
		ctx.restore();

		this.showImage(can.toDataURL());
	}

	// 180 Degrees / Orentation = 3.
	orientationThree(scaleSize, ratio, thisImage) {
		const can = document.createElement("canvas");
		const ctx = can.getContext('2d');

		const canVals = {
	      canvasW: scaleSize  * ratio,
	      canvasH: scaleSize,
	      drawImgX: scaleSize * ratio,
	      drawImgY: scaleSize,
	      rotate: 180 * Math.PI/180,
	      translateX: -scaleSize  * ratio,
	      translateY: -scaleSize
	    }

			can.width  = canVals.canvasW;
			can.height = canVals.canvasH;
			ctx.rotate(canVals.rotate); ctx.translate(canVals.translateX, canVals.translateY);
			ctx.save();
			ctx.drawImage(thisImage,0,0, canVals.drawImgX, canVals.drawImgY);
			ctx.restore();

			this.showImage(can.toDataURL());
	}

	// 270 Degrees / orentation == 8.
	orientationEight(scaleSize, ratio, thisImage) {
		const can = document.createElement("canvas");
		const ctx = can.getContext('2d');

		const canVals = {
	      canvasW: scaleSize,
	      canvasH: scaleSize  * ratio,
	      drawImgX: scaleSize * ratio,
	      drawImgY: scaleSize,
	      rotate: -90 * Math.PI/180,
	      translateX: -scaleSize * ratio,
	      translateY: 0
	    }

			can.width  = canVals.canvasW;
			can.height = canVals.canvasH;
			ctx.rotate(canVals.rotate); ctx.translate(canVals.translateX, canVals.translateY);
			ctx.save();
			ctx.drawImage(thisImage,0,0, canVals.drawImgX, canVals.drawImgY);
			ctx.restore();

			this.showImage(can.toDataURL());
	}

	showImage(image) {
		console.log(image);
	}

	handleUpload = () => {
		this.imageToBase64(this.fileInput.files[0]);
	}

	uploadImage = () => {
		this.fileInput.click();
	}

	render() {
		return(
			<form onSubmit={(e) => {e.preventDefault()}}>
				<input
					onChange={this.handleUpload}
					ref={(input) => { this.fileInput = input; }}
					alt="image upload" type="file" accept="image/*" />

				<img
					ref={(img) => {this.imageHolder = img}}
					src={uploadHolder} alt="upload"
					onClick={this.uploadImage} />
				<button type="submit">Upload</button>
			</form>
		)
	}


}
