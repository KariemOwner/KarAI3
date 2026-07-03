"use client";

import { useState } from "react";
import { useChatStore } from "@/lib/store";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const { addGeneratedImage } = useChatStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).slice(0, 2 - referenceImages.length);
      setReferenceImages((prev) => [...prev, ...newFiles].slice(0, 2));
    }
  };

  const removeReferenceImage = (index: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      // Convert reference images to base64
      const referenceImagesBase64 = await Promise.all(
        referenceImages.map((file) => fileToBase64(file))
      );

      // Call server-side API route for image generation
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          referenceImages: referenceImagesBase64,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImageUrl(data.imageUrl);
      addGeneratedImage({
        url: data.imageUrl,
        prompt: prompt.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4">Generate Image</h2>

      {/* Prompt Input */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          rows={3}
        />
      </div>

      {/* Reference Images Upload */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Reference Images (optional, max 2)
        </label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={referenceImages.length >= 2}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              referenceImages.length >= 2
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {referenceImages.length >= 2 ? "Max 2 images" : "Upload Image"}
          </label>
        </div>

        {/* Preview uploaded images */}
        {referenceImages.length > 0 && (
          <div className="flex gap-2 mt-2">
            {referenceImages.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Reference ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeReferenceImage(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
      >
        {isGenerating ? "Generating..." : "Generate"}
      </button>

      {/* Info Note */}
      <p className="text-xs text-gray-500 mt-3">
        Mode ringan — hasil gambar mengikuti deskripsi referensi, bukan replikasi 100% akurat.
      </p>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Generated Image Preview */}
      {generatedImageUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Generated Image</h3>
          <div className="rounded-lg overflow-hidden border border-gray-700">
            <img src={generatedImageUrl} alt="Generated" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
