"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  bucket: string;
  accept: string;
  urlFieldName: string;
  existingUrl?: string | null;
  onUrlChange?: (url: string) => void;
}

export default function FileUpload({ bucket, accept, urlFieldName, existingUrl, onUrlChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(existingUrl ?? "");
  const [uploadError, setUploadError] = useState("");
  const [uploadedName, setUploadedName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isImage = accept.includes("image");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    setUploadedName(file.name);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) {
      setUploadError(`Upload failed: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    setUrl(urlData.publicUrl);
    onUrlChange?.(urlData.publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-3">
      {/* Hidden input carries the URL into the form submission */}
      <input type="hidden" name={urlFieldName} value={url} />

      {/* Preview */}
      {url && isImage && (
        <div className="rounded-lg border border-border overflow-hidden w-40 h-40 bg-muted flex items-center justify-center">
          <img src={url} alt="Preview" className="object-cover w-full h-full" />
        </div>
      )}
      {url && !isImage && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="truncate font-medium">{uploadedName || "PDF uploaded"}</span>
          <a href={url} target="_blank" rel="noopener noreferrer" className="ml-auto text-brand underline shrink-0">
            View
          </a>
        </div>
      )}

      {/* Upload button row */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-brand text-brand text-sm font-semibold hover:bg-brand/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {url ? "Replace File" : isImage ? "Upload Image" : "Upload PDF"}
            </>
          )}
        </button>
        {uploadedName && !uploading && (
          <span className="text-xs text-muted-fg truncate max-w-[200px]">{uploadedName}</span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Manual URL fallback */}
      <div>
        <p className="text-xs text-muted-fg mb-1">Or paste a URL directly:</p>
        <input
          type="text"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setUploadedName(""); onUrlChange?.(e.target.value); }}
          placeholder="https://..."
          className="input-base text-sm"
        />
      </div>

      {uploadError && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {uploadError}
        </p>
      )}
    </div>
  );
}
