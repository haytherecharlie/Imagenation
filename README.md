------------------------------------------------------

#Imagenation | React Based Image Scaling & Orientation

------------------------------------------------------

###TABLE OF CONTENTS###

Topic                              | Date       | Created By               |
-----------------------------------|------------|--------------------------|
[Introduction](#Topic01)           | 15-06-2018 | Charlie Hay              |
[Getting Started](#Topic02)        | 15-06-2018 | Charlie Hay              |
[Code Example](#Topic03)           | 15-06-2018 | Charlie Hay              |

<br><a name="Topic01"></a>
##Introduction:

#####Pronounced like "Imagination". Imagenation is a React Component that allows you to resize and auto-orient images in the frontend. Clicking on the placeholder opens a pane to select the image you want to upload. Then using the EXIF data from the image, Imagenation will ensure that it is properly oriented and scaled to the appropriate side. This is all done clientside so you can leverage a users device rather than using something like ImageMagick on the server.


<br><a name="Topic02"></a>
##Getting Started:

####1. HOW TO INSTALL:

    npm i --save imagenation

####2. AVAILABLE PROPS:

	scaleSize={ *INTEGER* }

#####The scaleSize prop is required and takes a positive integer value that defines the size of the rescaled / oriented image. By default this value is defined in pixels (px) and cannot be changed.

	onImage={ *FUNCTION* }

#####The onImage prop takes a function value that is fired when an image is uploaded. It returns a data URI string representation of the image itself which can be assigned to a src attribute or used in any manner you may choose.

<br><a name="Topic03"></a>
##Code Example:

	import React from 'react';
	import Imagenation from 'imagenation';

	export default class <your-class> extends React.Component {

		handleImage = (imageData) => {
			console.log(imageData);
		}

		render() {
			return <Imagenation scaleSize="250" onImage={this.handleImage} />
		}

	}


####Hope you enjoy Imagenation!

#####-Charlie Hay