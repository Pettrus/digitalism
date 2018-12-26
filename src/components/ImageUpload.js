import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import { ToastContainer, ToastStore } from 'react-toasts';

class ImageUpload extends Component {

    state = {
        imagePreviewUrl: null,
        imageRef: null,
        parent: null,
        crop: {
            aspect: 1,
            x: 0,
            y: 0,
            width: 50,
            height: 50,
        }
    }

    onCropChange = (crop) => {
        this.setState({ crop });
    }

    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = image;
    
        // Make the library regenerate aspect crops if loading new images.
        const { crop } = this.state;
    
        if (crop.aspect && crop.height && crop.width) {
          this.setState({
            crop: { ...crop, height: null },
          });
        } else {
          this.makeClientCrop(crop, pixelCrop);
        }
    }

    getCroppedImg = (image, pixelCrop, fileName) => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height,
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
          }, 'image/jpeg');
        });
    }

    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    }

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            pixelCrop,
            'newFile.jpeg',
          );

          this.props.parent(croppedImageUrl);
        }
    }

    handleUpload = (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        if(Math.floor(file.size / 1000000) > 2) {
            ToastStore.warning("Image size cannot be bigger than 2MB", 6000);
        }else if(file.type != 'image/png' && file.type != 'image/gif' && file.type != 'image/jpeg') {
            ToastStore.warning("You can only upload images", 6000);
        }else if(file != null) {
            const reader = new FileReader();

            reader.onloadend = () => {
                this.setState({
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <div className="has-text-centered">
                <div>
                    <input type="file" onChange={this.handleUpload} accept="image/*" />
                </div>

                <div>
                    {this.state.imagePreviewUrl != null &&
                        <div>
                            <ReactCrop 
                                src={this.state.imagePreviewUrl} 
                                crop={this.state.crop} 
                                onImageLoaded={this.onImageLoaded}
                                onChange={this.onCropChange} 
                                onComplete={this.onCropComplete} />
                        </div>
                    }
                </div>

                <ToastContainer position={ToastContainer.POSITION.TOP_LEFT} store={ToastStore}/>
            </div>
        )
    }
}

export default ImageUpload;