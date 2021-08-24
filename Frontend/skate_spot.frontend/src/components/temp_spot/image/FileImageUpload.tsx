import { ChangeEvent, useRef } from "react"

interface Props{
    files: FileList | null
    setFiles: React.Dispatch<React.SetStateAction<FileList | null>>
}

const FileImageUpload: React.FC<Props> = ({files, setFiles}) => {

    const fileInput = useRef<HTMLInputElement>(null)

    const saveFilesToState = (e: ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files)
    }

    return (
        <div>
            <button 
            onClick={_ => fileInput.current?.click()}
            className={"btn btn-primary"}>
                Upload
            </button>
            <input 
            ref={fileInput}
            onChange={saveFilesToState}
            style={{display: "none"}}
            type="file" accept="image/*" multiple={true}  />
        </div>
    )
}

export default FileImageUpload