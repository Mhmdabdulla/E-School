import { Upload } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileUploadProps {
  image: File | string | null;
  setImage: (file: File | string) => void;
}

export function ProfileUpload({ image, setImage }: ProfileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-[200px] aspect-square bg-muted rounded-md overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <div className="w-full">
        <label htmlFor="profile-upload">
          <div className="flex items-center justify-center gap-2 border border-input rounded-md py-2 px-4 cursor-pointer hover:bg-muted transition-colors">
            <Upload className="h-4 w-4" />
            <span>Upload Photo</span>
          </div>
          <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Image size should be under 1MB
        <br />
        and image ratio needs to be 1:1
      </p>
    </div>
  );
}