"use client";

import { useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

// File size limits
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;  // 5 MB
const MAX_PDF_BYTES   = 15 * 1024 * 1024; // 15 MB

interface Props {
  bucket: string;
  accept: string;
  urlFieldName: string;
  existingUrl?: string | null;
  onUrlChange?: (url: string) => void;
}

export default function FileUpload({
  bucket,
  accept,
  urlFieldName,
  existingUrl,
  onUrlChange,
}: Props) {
  const [uploading,  setUploading]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [url,        setUrl]        = useState(existingUrl ?? "");
  const [fileName,   setFileName]   = useState("");
  const [uploadErr,  setUploadErr]  = useState("");
  const [dragging,   setDragging]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPdf   = !accept.includes("image");
  const isImage = accept.includes("image");

  function validateFile(file: File): string | null {
    const maxBytes = isPdf ? MAX_PDF_BYTES : MAX_IMAGE_BYTES;
    const maxLabel = isPdf ? "15 MB" : "5 MB";
    if (file.size > maxBytes) {
      return `File is too large. Maximum size is ${maxLabel}.`;
    }
    // Validate MIME type
    const acceptedTypes = accept.split(",").map((t) => t.trim());
    const fileType = file.type;
    const isAccepted = acceptedTypes.some(
      (t) => t === fileType || t === fileType.split("/")[0] + "/*"
    );
    if (!isAccepted) {
      const label = isPdf ? "PDF" : "JPG, PNG, or WebP image";
      return `Invalid file type. Please upload a ${label}.`;
    }
    return null;
  }

  const uploadFile = useCallback(
    async (file: File) => {
      const validationErr = validateFile(file);
      if (validationErr) { setUploadErr(validationErr); return; }

      setUploading(true);
      setUploadErr("");
      setProgress(10);
      setFileName(file.name);

      const supabase = createClient();
      const ext  = file.name.split(".").pop();
      const path = Date.now() + "-" + Math.random().toString(36).slice(2) + "." + ext;

      setProgress(40);
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: true });

      if (error) {
        setUploadErr("Upload failed: " + error.message);
        setUploading(false);
        setProgress(0);
        return;
      }

      setProgress(90);
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
      setUrl(urlData.publicUrl);
      onUrlChange?.(urlData.publicUrl);
      setProgress(100);
      setUploading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bucket, accept, onUrlChange]
  );

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }

  function handleRemove() {
    setUrl("");
    setFileName("");
    setProgress(0);
    onUrlChange?.("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      {/* Hidden URL value for form submission */}
      <input type="hidden" name={urlFieldName} value={url} />

      {/* Upload zone — shows when no file uploaded yet */}
      {!url && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center gap-3
            border-2 border-dashed rounded-xl p-8 cursor-pointer
            transition-all duration-150 select-none
            ${dragging
              ? "border-brand bg-brand/5 scale-[1.01]"
              : "border-border hover:border-brand/60 hover:bg-muted/50"}
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          {uploading ? (
            <>
              <div className="w-10 h-10 rounded-full border-4 border-brand/20 border-t-brand animate-spin" />
              <p className="text-sm font-medium text-fg">Uploading…</p>
              {/* Progress bar */}
              <div className="w-full max-w-xs h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand rounded-full transition-all duration-300"
                  style={{ width: progress + "%" }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                {isPdf ? (
                  <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-fg">
                  {dragging ? "Drop to upload" : "Drag & drop or click to upload"}
                </p>
                <p className="text-xs text-muted-fg mt-1">
                  {isPdf
                    ? "PDF up to 15 MB"
                    : "JPG, PNG or WebP up to 5 MB"}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Preview — image */}
      {url && isImage && (
        <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-border bg-muted group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-white font-semibold bg-black/40 px-3 py-1.5 rounded-lg hover:bg-black/60"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs text-white font-semibold bg-red-600/80 px-3 py-1.5 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Preview — PDF/file */}
      {url && !isImage && (
        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-800 truncate">
              {fileName || "File uploaded"}
            </p>
            <a href={url} target="_blank" rel="noopener noreferrer"
               className="text-xs text-green-700 hover:underline">
              View file ↗
            </a>
          </div>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="text-xs text-green-700 font-semibold hover:text-green-900">
              Replace
            </button>
            <button type="button" onClick={handleRemove}
              className="text-xs text-red-600 font-semibold hover:text-red-800">
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {uploadErr && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {uploadErr}
        </p>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
