import React, { Component } from 'react';
import ImageUpload from '../components/ImageUpload';
import SelectStyle from '../components/SelectStyle';
import * as tf from '@tensorflow/tfjs';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Header from '../components/Header';
import LoadingScreen from 'react-loading-screen';
import { ToastContainer, ToastStore } from 'react-toasts';
import { isMobile } from 'react-device-detect';

class Style extends Component {
    state = {
        step: 1,
        imagePreviewUrl: null,
        selectedStyle: null,
        inception: null,
        transSeparable: null,
        ratioStrength: 80,
        loading: false,
        loadingMessage: null,
        imageGenerated: false
    }

    getUploadedImage = (imagePreviewUrl) => {
        this.setState({
            imagePreviewUrl: imagePreviewUrl
        });
    }

    getStyle = (style) => {
        this.setState({
            step: this.state.step + 1,
            selectedStyle: style
        });
    }

    previousStep = (e) => {
        e.preventDefault();
        this.setState({
            imageGenerated: false,
            step: this.state.step - 1
        });
    }

    nextStep = (e) => {
        e.preventDefault();
        this.setState({
            step: this.state.step + 1
        });
    }

    checkDisabled = () => {
        if((this.state.step == 1 && this.state.imagePreviewUrl == null) ||
            (this.state.step == 2 && this.state.selectedStyle == null)) {
            return true;
        }else {
            return false;
        }
    }

    componentDidMount() {
        let transformerFolder = null;
        let modelFolder = null;

        if(isMobile) {
            transformerFolder = "/transformer_mobile/";
            modelFolder = "/model_mobile/";
        }else {
            transformerFolder = "/transformer_separable/";
            modelFolder = "/inception/";
        }

        console.log(isMobile);

        Promise.all([
            tf.loadFrozenModel(
                process.env.PUBLIC_URL + transformerFolder + 'tensorflowjs_model.pb',
                process.env.PUBLIC_URL + transformerFolder + 'weights_manifest.json'
            ),
            tf.loadFrozenModel(
                process.env.PUBLIC_URL + modelFolder + 'tensorflowjs_model.pb', 
                process.env.PUBLIC_URL + modelFolder + 'weights_manifest.json')
        ]).then(([transSeparable, inception]) => {
            console.log("Models loaded");
            this.setState({
                inception: inception,
                transSeparable: transSeparable
            });
        });

    }

    loadImage = async (imageUrl) => {
        const image = new Image();
        const promise = new Promise((resolve, reject) => {
          image.crossOrigin = '';
          image.onload = () => {
            resolve(image);
          };
        });
      
        image.src = imageUrl;
        return promise;
    }
      
    styleImage = async () => {
        try {
            this.setState({
                loading: true,
                loadingMessage: "Calculating Llama Expectoration Trajectory"
            });

            const contentImg = await this.loadImage(this.state.imagePreviewUrl);
            const styleImg = this.state.selectedStyle;
            const stylized = document.getElementById('stylized');
            stylized.style.display = 'block';
            
            const styleRatio = this.state.ratioStrength / 100;
        
            //await tf.nextFrame();
            //await tf.nextFrame();
            let bottleneck = await tf.tidy(() => {
                return this.state.inception.predict(tf.fromPixels(styleImg).toFloat().div(tf.scalar(255)).expandDims());
            })
            if (styleRatio !== 1.0) {
                await tf.nextFrame();
                const identityBottleneck = await tf.tidy(() => {
                    return this.state.inception.predict(tf.fromPixels(contentImg).toFloat().div(tf.scalar(255)).expandDims());
                })
                const styleBottleneck = bottleneck;
                bottleneck = await tf.tidy(() => {
                    const styleBottleneckScaled = styleBottleneck.mul(tf.scalar(styleRatio));
                    const identityBottleneckScaled = identityBottleneck.mul(tf.scalar(1.0-styleRatio));
                    return styleBottleneckScaled.addStrict(identityBottleneckScaled)
                })
                styleBottleneck.dispose();
                identityBottleneck.dispose();
            }

            this.setState({
                loadingMessage: "Diluting Livestock Nutrition Variables"
            });
        
            await tf.nextFrame();
            const styl = await tf.tidy(() => {
                return this.state.transSeparable.predict([tf.fromPixels(contentImg).toFloat().div(tf.scalar(255)).expandDims(), bottleneck]).squeeze();
            })
            await tf.toPixels(styl, stylized);
            bottleneck.dispose();
            styl.dispose();
        }catch(e) {
            console.log(e);
            ToastStore.error("Something went terribly wrong, try again later", 7000);
        }finally {
            this.setState({
                loading: false,
                loadingMessage: null,
                imageGenerated: true
            });
        }
    }

    onRatioChange = (ratio) => {
        this.setState({
            ratioStrength: ratio
        });
    }

    saveImage = (e) => {
        e.preventDefault();
        const canvas = document.getElementById("stylized");
        var lnk = document.createElement('a'), e;
        lnk.download = "art.png";
        lnk.href = canvas.toDataURL("image/png;base64");

        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                            0, 0, 0, 0, 0, false, false, false,
                            false, 0, null);

            lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
            lnk.fireEvent("onclick");
        }
    }

    render() {
        return (
            <LoadingScreen
                loading={this.state.loading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                logoSrc='/images/logo.png'
                text={this.state.loadingMessage}
            > 
                <section className="hero is-fullheight is-default is-bold">
                    <Header />

                    <div className="hero-body">
                        <div className="container">
                            {this.state.step == 1 &&
                                <ImageUpload parent={this.getUploadedImage}></ImageUpload>
                            }

                            {this.state.step == 2 &&
                                <SelectStyle parent={this.getStyle}></SelectStyle>
                            }

                            {this.state.step == 3 &&
                                <div>
                                    {this.state.imageGenerated &&
                                        <h1 className="title is-4 has-text-centered">
                                            Here is the final result! :)
                                        </h1>
                                    }
                                    <div className="columns is-centered" style={{marginBottom: '1em'}}>
                                        <div className="column is-6">
                                            <canvas id="stylized" style={{width: '100%', display: 'none'}}></canvas>
                                        </div>
                                    </div>

                                    {!this.state.imageGenerated &&
                                        <div>
                                            <div className="columns" style={{marginBottom: '1em'}}>
                                                <div className="column is-12">
                                                    <p>Stylization strength</p>
                                                    <Slider min={30} max={100} defaultValue={80} step={null} onChange={this.onRatioChange}
                                                        marks={{ 30: '30%', 40: '40%', 50: '50%', 60: '60%', 70: '70%', 80: '80%', 90: '90%', 100: '100%' }}  />
                                                </div>
                                            </div>

                                            <div className="columns is-mobile is-vcentered is-centered">
                                                <div className="column is-4">
                                                    <img src={this.state.imagePreviewUrl} />
                                                </div>

                                                <div className="column is-1">
                                                    <p>+</p>
                                                </div>

                                                <div className="column is-4">
                                                    <img src={this.state.selectedStyle.src} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }

                            <div className="has-text-centered" style={{marginTop: '3em'}}>
                                {this.state.step > 1 &&
                                    <button className="button is-large is-default is-rounded floating-button-left" 
                                        onClick={this.previousStep}>
                                        <span className="icon">
                                            &#8617;
                                        </span>
                                        <span>
                                            Back
                                        </span>
                                    </button>
                                }

                                {this.state.step < 3 &&
                                    <button type="button" className="button is-large is-info is-rounded floating-button-right" 
                                        onClick={this.nextStep} disabled={this.checkDisabled()}>
                                        <span>Next</span>
                                        <span className="icon">
                                            &#8618;
                                        </span>
                                    </button>
                                }

                                {this.state.step == 3 &&
                                    <button className="button is-large is-success is-rounded floating-button-right" 
                                        onClick={this.styleImage} disabled={this.state.inception == null}>
                                        {this.state.inception == null &&
                                            <span>Loading models..</span>
                                        }

                                        {this.state.inception != null && !this.state.imageGenerated &&
                                            <span>Style!</span>
                                        }
                                    </button>
                                }

                                {this.state.imageGenerated == true &&
                                    <button className="button is-large is-danger is-rounded floating-button-right" 
                                        onClick={this.saveImage} style={{marginLeft: '1em'}}>
                                        Save
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                    <ToastContainer position={ToastContainer.POSITION.TOP_LEFT} store={ToastStore}/>
                </section>
            </LoadingScreen>
        )
    }
}

export default Style;