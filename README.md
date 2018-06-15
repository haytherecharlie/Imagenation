# imagenation
**Pronounced like "Imagination". Imagenation is a React Component that allows you to resize and auto-orient images in the frontend.**

*HOW TO INSTALL*

    npm i --save imagenation

**HOW TO USE**

    import React from 'react';
    import Imagenation from 'imagenation';

    export default class <your-class> extends React.Component {

	  handleImage = (imageData) => {
		console.log(imageData);
	  }

      render() {
        return <Imagenation scaleSize="250px" onImage={this.handleImage} />
      }
    }

**The "scaleSize" prop takes a value to define height/width. DON'T FORGET TO INCLUDE px, %, rem, etc. AS WELL!**
**The onImage prop takes a function and returns the image data URI, which can be be set to src of an image tag or saved in a database.**

**ENJOY!**
