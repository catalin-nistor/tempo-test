import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileIcon, ImageIcon, Upload } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadTime: string;
}

interface ContextPanelProps {
  files?: UploadedFile[];
  onFileUpload?: (files: FileList) => void;
  onFileClear?: (fileId: string) => void;
}

const defaultFiles: UploadedFile[] = [
  {
    id: "1",
    name: "document.pdf",
    type: "application/pdf",
    size: "2.5 MB",
    uploadTime: new Date().toISOString(),
  },
  {
    id: "2",
    name: "image.png",
    type: "image/png",
    size: "1.2 MB",
    uploadTime: new Date().toISOString(),
  },
];

const ContextPanel = ({
  files = defaultFiles,
  onFileUpload = () => {},
  onFileClear = () => {},
}: ContextPanelProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full h-full bg-background border-l">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Context Panel</h2>
      </div>

      <div className="p-4" onDragOver={handleDragOver} onDrop={handleDrop}>
        <Card className="p-8 border-dashed border-2 flex flex-col items-center justify-center gap-4">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            Drag and drop files here or click to upload
          </p>
          <Button variant="outline">Choose Files</Button>
        </Card>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Uploaded Files</h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {files.map((file) => (
                <Card
                  key={file.id}
                  className="p-3 flex items-start justify-between"
                >
                  <div className="flex items-center gap-3">
                    {file.type.includes("image") ? (
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <FileIcon className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.size} •{" "}
                        {new Date(file.uploadTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFileClear(file.id)}
                  >
                    Remove
                  </Button>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ContextPanel;
