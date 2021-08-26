import { link } from 'fs';
import React, { useState } from 'react'
import FileImageUpload from './FileImageUpload';
import LinkImageUpload from './LinkImageUpload';

const ImageUpload: React.FC = () => {

    const [files, setFiles] = useState<File[]>([])
    const [links, setLinks] = useState<String[]>([])

    const imagesLimit = 10;

    return (
        <div>
            <p className={"h3 mb-4"}>You can add up to {imagesLimit} images of spot</p>
            <div className={"mb-4"}>                
                <FileImageUpload
                    files={files}
                    setFiles={setFiles}
                    imagesLimit={imagesLimit}
                    otherImagesCount={links.length}/>
            </div>
            <div>
                <p>Or by link</p>
                <LinkImageUpload />
            </div>

        </div>
    )
}

export default ImageUpload