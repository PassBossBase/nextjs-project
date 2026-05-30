/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
// components/ImageUploadField.tsx
"use client";

import React, {
  useRef,
  useState,
  useEffect,
  DragEvent,
  ChangeEvent,
} from "react";
import { FieldError } from "react-hook-form";

interface ImageUploadFieldProps {
  /** 当前选中的文件（react-hook-form 的 field.value） */
  value?: File | string | null;
  /** 表单字段的 onChange 回调 */
  onChange: (file: File | null) => void;
  /** 表单字段的 onBlur 回调 */
  onBlur?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 错误信息（通常从 fieldState.error 传入） */
  error?: FieldError;
  /** 已有图片的预览地址（用于编辑时显示初始图片，当 value 为 null 时生效） */
  existingImageUrl?: string | null;
  /** 接受的文件类型，默认 image/* */
  accept?: string;
  /** 占位文字 */
  placeholder?: string;
  /** 自定义容器类名 */
  className?: string;
  /** 预览图片类名 */
  previewClassName?: string;
}

export default function ImageUploadField({
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  existingImageUrl = null,
  accept = "image/*",
  placeholder = "点击或拖拽图片至此",
  className = "",
  previewClassName = "",
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 根据 value 或 existingImageUrl 生成预览 URL
  useEffect(() => {
    if (value instanceof File) {
      // 如果是 File 对象，生成临时 URL
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof value === "string" && value) {
      // 如果是字符串 URL（例如已经上传过的图片地址）
      setPreviewUrl(value);
    } else if (existingImageUrl && !value) {
      // 没有新文件但有已有图片地址（编辑场景）
      setPreviewUrl(existingImageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [value, existingImageUrl]);

  // 处理文件选择
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
    if (onBlur) onBlur();
    // 清空 input 的 value，以便再次选择同一文件
    e.target.value = "";
  };

  // 触发文件选择对话框
  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  // 删除图片
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (onBlur) onBlur();
    setPreviewUrl(null);
  };

  // 拖拽上传处理
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onChange(file);
      if (onBlur) onBlur();
    } else {
      alert("请拖拽图片文件");
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative cursor-pointer ${
          disabled ? "cursor-not-allowed opacity-60" : ""
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        {previewUrl ? (
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="图片预览"
              className={`max-w-full max-h-64 rounded border object-contain ${previewClassName}`}
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition focus:outline-none"
                aria-label="删除图片"
              >
                ✕
              </button>
            )}
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
              error
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-blue-500"
            }`}
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm">{placeholder}</p>
            <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG</p>
          </div>
        )}
      </div>
      {/* 显示错误信息 */}
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
