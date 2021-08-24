import React, { useState } from 'react'
import FileImageUpload from './FileImageUpload';
import LinkImageUpload from './LinkImageUpload';

const ImageUpload: React.FC = () => {

    const [files, setFiles] = useState<FileList | null>(null)
    const [links, setLinks] = useState<String[]>([])

    return (
        <div>
            <p>Upload spot images</p>
            <div className={"mb-4"}>
                <p>By file</p>
                <FileImageUpload files={files} setFiles={setFiles} />
            </div>
            <div>
                <p>Or by link</p>
                <LinkImageUpload />
            </div>

        </div>
    )
}

export default ImageUpload