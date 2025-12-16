import React, { useState } from 'react';
import { baseurl } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPost } from '../utils/postslice';

const Post = () => {
  const [mode, setMode] = useState("url");

  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorShowToast, setErrorShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // -------- FILE PREVIEW ----------
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // -------- UPLOAD FILE TO CLOUDINARY ----------
  const handleUpload = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        baseurl + "/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success && response.data.url) {
        setUploadedUrl(response.data.url);

        return response.data.url;  // ✅ return Cloudinary URL
      }

      return null;

    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  // -------- SAVE POST ----------
  // const savePost = async (imageUrl) => {
  //   try {
  //     const res = await axios.post(
  //       baseurl + "/post",
  //       { url: imageUrl, description },
  //       { withCredentials: true }
  //     );

  //     dispatch(addPost(res.data));

  //   } catch (error) {
  //     console.log("Something went wrong: " + error);
  //     throw error;
  //   }
  // };
  const savePost = async (imageUrl) => {
  try {
    const payload = {
      description
    };

    // only include url if it exists
    if (imageUrl && imageUrl.trim() !== "") {
      payload.url = imageUrl;
    }

    const res = await axios.post(
      baseurl + "/post",
      payload,
      { withCredentials: true }
    );

    dispatch(addPost(res.data));
  } catch (error) {
    console.log("Something went wrong:", error);
    throw error;
  }
};


  // -------- FINAL SUBMIT ----------
  // const finalSubmitHandle = async () => {
  //   try {
  //     setLoading(true);
  //     let finalImageUrl = url;

  //     if (mode === "upload") {
  //       finalImageUrl = await handleUpload();   // WAIT for upload
  //       if (!finalImageUrl) finalImageUrl = ""
  //     }

  //     await savePost(finalImageUrl);
  //     setShowToast(true);
  //     setTimeout(() => setShowToast(false), 3000);

  //   } catch (error) {
  //     console.error("ERROR:", error);
  //     setErrorShowToast(true);
  //     setTimeout(() => setErrorShowToast(false), 3000);
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // };
  const finalSubmitHandle = async () => {
  try {
    setLoading(true);
    let finalImageUrl = url;

    if (mode === "upload") {
      finalImageUrl = await handleUpload();

      if (!finalImageUrl) {
        throw new Error("Image upload failed");
        // finalImageUrl="";
      }
    }

    console.log("finalimageurl",finalImageUrl);
    
    await savePost(finalImageUrl);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

  } catch (error) {
    console.error("ERROR:", error);
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
            className={`px-5 py-2 rounded-full font-semibold shadow-md ${mode === "url" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            Post Using URL
          </button>

          <button
            onClick={() => setMode("upload")}
            className={`px-5 py-2 rounded-full font-semibold shadow-md ${mode === "upload" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            Post Using Upload
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-10 w-full max-w-6xl">

          {/* FORM CARD */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 border border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Create Post</h2>

            <div className="space-y-4">

              {/* URL INPUT */}
              {mode === "url" && (
                <div className="relative border border-gray-300 rounded-md">
                  <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                    Image URL:
                  </legend>

                  <input
                    type="text"
                    className="w-full px-4 py-3 pt-4 bg-transparent"
                    placeholder="https://example.com/image.jpg"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              )}

              {/* FILE UPLOAD */}
              {mode === "upload" && (
                <>
                  <div className="relative border border-gray-300 rounded-md">
                    <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                      Upload Image:
                    </legend>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-4 py-3 pt-4"
                      onChange={handleFileChange}
                    />
                  </div>
                </>
              )}

              {/* DESCRIPTION */}
              <div className="relative border border-gray-300 rounded-md">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                  Description:
                </legend>

                <textarea
                  className="w-full px-4 py-3 pt-4 bg-transparent min-h-[80px]"
                  placeholder='This is my caption'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button
                onClick={finalSubmitHandle}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-full mt-6"
              >
                Save Post
              </button>

            </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-shrink-0">
            <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden max-w-xs mx-auto my-6 transform hover:scale-105 transition-all duration-300 border border-gray-300">
              <div className="relative w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400 text-6xl font-light">
                {mode === "url" && url ? (
                  <img src={url} alt="Preview" className="w-full h-full object-contain rounded-lg bg-white" />
                ) : mode === "upload" && preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <img
                    src="https://openseauserdata.com/files/7f16cec1cc177a7e148067006e73c02a.png"
                    alt="Placeholder"
                    className="w-full h-full object-contain rounded-lg bg-white"
                  />
                )}
              </div>

              {description && (
                <p className="text-gray-700 text-2xl p-2 leading-snug mb-4 line-clamp-3">
                  {description}
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-xl w-[90%] max-w-md z-50 text-center">
          Post saved successfully.
        </div>
      )}

      {/* ERROR TOAST */}
      {errorShowToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-xl w-[90%] max-w-md z-50 text-center">
          Internal Server Error!
        </div>
      )}

      {loading && (
        // 1. Fixed, full-screen container (INVISIBLE, but covers the screen for centering)
        // 'bg-transparent' ensures no full-screen overlay/dimming effect.
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none">

          {/* 2. The actual loading message box (The element you want centered) */}
          {/* 'pointer-events-auto' allows this small box to receive pointer events (though usually not necessary for a loader) */}
          <div className="bg-gray-800 bg-opacity-90 text-white px-8 py-4 rounded-xl 
                      shadow-2xl flex items-center gap-4 text-lg font-semibold pointer-events-auto">

            {/* The Spinner */}
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            Saving your post...
          </div>
        </div>
      )}

    </>
  );
};

export default Post;
