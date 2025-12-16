import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPost } from "../utils/postslice";
import { baseurl } from "../utils/constants";

const Post = () => {
  const [mode, setMode] = useState("url");

  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorShowToast, setErrorShowToast] = useState(false);

  const dispatch = useDispatch();

  // -------- FILE PREVIEW ----------
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // -------- UPLOAD FILE ----------
  const handleUpload = async () => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(baseurl + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return res.data?.url || "";
    } catch (err) {
      console.error("Upload failed:", err);
      return "";
    }
  };

  // -------- SAVE POST ----------
  const savePost = async (imageUrl) => {
    const payload = {
      description,
    };

    if (imageUrl && imageUrl.trim() !== "") {
      payload.url = imageUrl;
    }

    const res = await axios.post(baseurl + "/post", payload, {
      withCredentials: true,
    });

    dispatch(addPost(res.data));
  };

  // -------- FINAL SUBMIT ----------
  const finalSubmitHandle = async () => {
    try {
      setLoading(true);

      let finalImageUrl = "";

      // URL mode
      if (mode === "url" && url.trim() !== "") {
        finalImageUrl = url.trim();
      }

      // Upload mode
      if (mode === "upload" && file) {
        finalImageUrl = await handleUpload();
      }

      // Block only if BOTH empty
      if (!description.trim() && !finalImageUrl) {
        setErrorShowToast(true);
        setTimeout(() => setErrorShowToast(false), 3000);
        return;
      }

      await savePost(finalImageUrl);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reset
      setUrl("");
      setFile(null);
      setPreview("");
      setDescription("");
    } catch (err) {
      console.error("POST ERROR:", err);
      setErrorShowToast(true);
      setTimeout(() => setErrorShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-gradient-to-br from-indigo-50 to-indigo-100">

        {/* MODE TOGGLE */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("url")}
            className={`px-5 py-2 rounded-full font-semibold ${
              mode === "url" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            Post Using URL
          </button>

          <button
            onClick={() => setMode("upload")}
            className={`px-5 py-2 rounded-full font-semibold ${
              mode === "upload" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            Post Using Upload
          </button>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          {mode === "url" && (
            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Image URL (optional)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          )}

          {mode === "upload" && (
            <input
              type="file"
              accept="image/*"
              className="w-full mb-3"
              onChange={handleFileChange}
            />
          )}

          <textarea
            className="w-full border p-3 rounded mb-3"
            placeholder="Write a caption..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={finalSubmitHandle}
            className="bg-blue-600 text-white w-full py-3 rounded"
          >
            Save Post
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded">
          Post saved successfully
        </div>
      )}

      {errorShowToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded">
          Please add image or description
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white px-6 py-4 rounded shadow">
            Saving post...
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
