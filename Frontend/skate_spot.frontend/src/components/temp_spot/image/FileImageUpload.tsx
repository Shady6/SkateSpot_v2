import { ChangeEvent, useRef, useState, useEffect } from 'react';
import { take } from '../../../functions/take';

interface Props {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
    otherImagesCount: number
    imagesLimit: number
}

const FileImageUpload: React.FC<Props> = ({ files, setFiles, otherImagesCount, imagesLimit }) => {

    const fileInput = useRef<HTMLInputElement>(null)
    const [filesError, setFilesError] = useState<String | null>(null)

    useEffect(() => {
        const totalImages = files.length + otherImagesCount

        if (totalImages <= imagesLimit)
            setFilesError(null)
        else if (otherImagesCount >= totalImages)
            setFilesError("You can't upload images because you've reached the images limit.")
        else {
            const fileImagesToTake = imagesLimit - otherImagesCount
            setFilesError(`Only ${fileImagesToTake} images of ${files.length} were uploaded because of the limit`)
        }
    }, [files])

    // TODO fix this 
    // - error not showing when more than 10 images were uploaded
    // - won't work if the fileImagesToTake is negative
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const fileImagesToTake = imagesLimit - otherImagesCount
        setFiles(take(Array.from(e.target.files ?? []), fileImagesToTake))
        //@ts-ignore
        e.target.value = null
    }

    const renderFilesData = () => {
        if (files.length) return <div>
            <p className={"mb-1"}>Files loaded: {files!.length}</p>
            <div className={"d-flex flex-wrap"}>
                {files!.map((f, i) =>
                    <button
                        onClick={_ =>
                            setFiles([...files.filter(stateFile => stateFile.name !== f.name)])}
                        className={"me-3 mb-2 text-sm btn btn-secondary"} key={f.name + i}>
                        {f.name}
                        <i className="fa fa-times-circle ms-2" aria-hidden="true"></i>
                    </button>
                )}
            </div>
        </div>
    }

    return (
        <div className="mb-2">
            <button
                onClick={_ => fileInput.current?.click()}
                className={"btn btn-primary me-1"}>
                Upload
            </button>
            <input
                ref={fileInput}
                onChange={handleFileInputChange}
                style={{ display: "none" }}
                type="file" accept="image/*" multiple={true} />
            {filesError && <p className={"text-danger text-sm"}>{filesError}</p>}
            {files.length !== 0 && <button className="btn btn-danger" onClick={_ => setFiles([])}>
                Remove all
            </button>}
            {renderFilesData()}
        </div>
    )
}

export default FileImageUpload