---

# Imagenation | Frontend Image Scaling and Orientation Library

---

### TABLE OF CONTENTS

| Topic                       | Date       | Created By  |
| --------------------------- | ---------- | ----------- |
| [Introduction](#Topic01)    | 15-06-2018 | Charlie Hay |
| [Getting Started](#Topic02) | 15-06-2018 | Charlie Hay |
| [Code Example](#Topic03)    | 15-06-2018 | Charlie Hay |

<br><a name="Topic01"></a>

## Introduction:

##### Pronounced like "Imagination". Imagenation is a React Component that allows you to resize and auto-orient images in the frontend. Using EXIF data from an image file, Imagenation will ensure that images are properly oriented and scaled to the desired size. The best part is that everything is done clientside so you can leverage individual devices rather than doing all the heavy work on your server (using something like ImageMagik)

<br><a name="Topic02"></a>

## Getting Started:

#### 1. HOW TO INSTALL:

    npm i --save imagenation

<br><a name="Topic03"></a>

## Code Example:

  import React, { Fragment, useState } from "react";
  import ReactDOM from "react-dom";
  import imagenation from "imagenation";

  const App = () => {
    const [image, setImage] = useState("");

    const orientImage = async ({ target }) =>
      setImage(await imagenation(target.files[0], 500));

    return (
      <Fragment>
        <input type="file" onChange={orientImage} accept="image/*" />
        {image && <img src={image} alt="use your imagenation" />}
      </Fragment>
    );
  };

  ReactDOM.render(<App />, document.getElementById("root"));

#### Hope you enjoy Imagenation!

##### -Charlie Hay
