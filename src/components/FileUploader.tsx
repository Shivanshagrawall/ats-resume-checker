
import React, { useCallback, useState } from "react";
import { Upload, File } from "lucide-react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFileUpload(e.target.files[0]);
      }
    },
    [onFileUpload]
  );

  return (
    <div
      className={`upload-area ${
        isDragging ? "border-primary bg-primary/5" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileUpload"
        className="hidden"
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div className="text-sm font-medium">
          {isDragging ? "Drop your file here" : "Drag and drop or click to upload"}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Supports PDF, DOCX, TXT (Max 10MB)
        </p>
      </label>
    </div>
  );
};
