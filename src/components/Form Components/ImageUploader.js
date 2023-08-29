import React, { useState, useMemo ,useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import { getBase64 } from '../../helpers/imageToBase64';

function ImageUploader({ name, register, setValue, imageurl }) {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(imageurl);

    useEffect(() => {
        if (imageurl) {
            setImageUrl(imageurl);
        }
    }, [imageurl]);

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            setImage(selectedImage);
            try {
                const base64Image = await getBase64(selectedImage);
                setValue(name, base64Image);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const previewImage = useMemo(() => {
        if (imageUrl) {
            return (
                <div className="d-flex w-100 gap-2">
                    <img src={imageUrl} alt="dummy" width="100px" height="60px" />
                    <div className="d-flex justify-content-between mx-1 gap-2 align-items-center w-100">
                        <p className="font-14 mb-0">{image ? image.name : ''}</p>
                        <i className="bi bi-x-lg border p-1 rounded" onClick={() => setImage(null)}></i>
                    </div>
                </div>
            );
        }
        return (
            <div className="p-2 text-center">
                <i className="h3 text-muted dripicons-cloud-upload"></i>
                <h5 className="text-center">Upload your Business Logo</h5>
            </div>
        );
    }, [imageUrl, image,imageurl]);

    return (
        <Row>
            <Col lg={12}>
                <label
                    htmlFor="upload-button"
                    className="border rounded d-flex justify-content-center my-1"
                    style={{ overflow: 'hidden', cursor: 'pointer' }}>
                    {previewImage}
                </label>
                <input
                    type="file"
                    id="upload-button"
                    accept="image/*"
                    style={{ display: 'none' }}
                    {...register}
                    onChange={handleImageChange}
                />
            </Col>
        </Row>
    );
}

export default ImageUploader;
