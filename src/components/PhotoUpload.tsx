import { useState } from 'react';

interface PhotoUploadProps {
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
}

const PhotoUpload = ({ onUpload, uploading }: PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await onUpload(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-brand-main bg-brand-main/5' : 'border-brd hover:border-brd-hover'
      } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="photo-upload"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={uploading}
      />
      <label htmlFor="photo-upload" className="cursor-pointer">
        <div className="text-tx-muted mb-2">
          {uploading ? 'Uploading...' : 'Drag & drop or click to upload'}
        </div>
        <div className="text-body-sm text-tx-secondary">
          JPG, PNG, or JPEG (max 10MB)
        </div>
      </label>
    </div>
  );
};

export default PhotoUpload;
