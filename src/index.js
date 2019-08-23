import exif from 'exif-js'

class Imagenation {
  constructor() {
    this.fileReader = new FileReader()
  }

  imagenation = (imageFile, resize) => {
    return new Promise((resolve, reject) => {
      try {
        this.imageFile = imageFile
        this.resize = resize || 200
        this.resolve = resolve
        this.reject = reject
        return this.readImageFile()
      } catch (err) {
        return this.reject(err)
      }
    })
  }

  readImageFile = () => {
    try {
      this.fileReader.onload = ({ target }) => this.getCurrentOrientation(target.result)
      this.fileReader.readAsArrayBuffer(this.imageFile)
    } catch (err) {
      throw `Imagenation Error: Failed to read image file.`
    }
  }

  getCurrentOrientation = imageBuffer => {
    try {
      const { Orientation } = exif.readFromBinaryFile(imageBuffer)
      return !Orientation ? this.orientImage(1) : this.orientImage(Orientation)
    } catch (err) {
      throw `Imagenation Error: Failed to read exif binary file.`
    }
  }

  orientImage = orientation => {
    try {
      this.newImage = new Image()
      this.newImage.onload = () => this.imageToCanvas(this.getNewImageProperties(orientation))
      this.newImage.src = URL.createObjectURL(this.imageFile)
    } catch (err) {
      throw `Imagenation Error: Failed to create new image.`
    }
  }

  imageToCanvas = ({ canW, canH, drawX, drawY, rotate, transX, transY }) => {
    try {
      const can = document.createElement('canvas')
      const ctx = can.getContext('2d')
      can.width = canW
      can.height = canH
      ctx.rotate(rotate)
      ctx.translate(transX, transY)
      ctx.save()
      ctx.drawImage(this.newImage, 0, 0, drawX, drawY)
      ctx.restore
      return this.resolve(can.toDataURL())
    } catch (err) {
      throw `Imagenation Error: Failed to draw new image to canvas.`
    }
  }

  getNewImageProperties = orientation => {
    const ratio = Math.floor(this.resize * (this.newImage.width / this.newImage.height))
    switch (orientation) {
      case 3: // Top Facing Left -> Landscape
        return {
          canW: ratio,
          canH: this.resize,
          drawX: ratio,
          drawY: this.resize,
          rotate: (180 * Math.PI) / 180,
          transX: -ratio,
          transY: -this.resize
        }
      case 6: // Upside Up -> Portrait
        return {
          canW: this.resize,
          canH: ratio,
          drawX: ratio,
          drawY: this.resize,
          rotate: (90 * Math.PI) / 180,
          transX: 0,
          transY: -this.resize
        }
      case 8: // Upside Down -> Portrait
        return {
          canW: this.resize,
          canH: ratio,
          drawX: ratio,
          drawY: this.resize,
          rotate: (-90 * Math.PI) / 180,
          transX: -ratio,
          transY: 0
        }
      default: // Top Facing Right -> Landscape
        return {
          canW: ratio,
          canH: this.resize,
          drawX: ratio,
          drawY: this.resize,
          rotate: 0,
          transX: 0,
          transY: 0
        }
    }
  }
}

const { imagenation } = new Imagenation()
export default imagenation
