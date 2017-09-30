# Imagenation
**Imagenation is a React Component that allows you to resize and auto-orient images in the frontend.**

*HOW TO INSTALL*
  
    npm install --save Imagenation
  
**HOW TO USE**

    import React from 'react';
    import Imagination from 'Imagination';

    export default class <your-class> extends React.Component {
      render() {
        return(
          <Imagenation scaleSize="250" />
        )
      }
    }

****The scaleSize prop takes any integer value and will define the output size of the scaled image****

**NOTE: We do not provide any styles, except for hiding the input.** 
***This allows you to define the look any way you like.***
