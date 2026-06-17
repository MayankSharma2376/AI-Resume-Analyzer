import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  onFileSelect?: (file: File | null) => void
}

const FileUploader = ({ onFileSelect }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadedFile = acceptedFiles[0] || null
      setFile(uploadedFile)
      onFileSelect?.(uploadedFile)
      console.log("Uploaded files:", acceptedFiles)
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  })

  return (
    <div className="w-full gradient-border">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
      >
        <input {...getInputProps()} />
        {isDragAccept ? (
          <p className="text-green-600">Drop the file here…</p>
        ) : (
          <p>Drag and drop your resume, or click to select a file.</p>
        )}
      </div>

      {file && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Selected file:</strong> {file.name}
        </div>
      )}
    </div>
  )
}

export default FileUploader
