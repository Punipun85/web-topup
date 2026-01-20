import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion as Motion , AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft, FaCloudUploadAlt, FaFileImage, FaTrash, FaCheckCircle } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import "./upload.css";

export default function UploadPembayaran() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Mohon upload file gambar (JPG/PNG)");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    toast.success("Foto berhasil dipilih");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!file) return toast.error("Silakan pilih bukti pembayaran dulu!");

    const formData = new FormData();
    formData.append("order_number", orderNumber);
    formData.append("proof", file);

    try {
      setLoading(true);
      const loadingToast = toast.loading("Mengupload bukti...");

      await axios.post(
        "http://127.0.0.1:8000/api/payment/upload-proof",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.dismiss(loadingToast);
      toast.success("Bukti Berhasil Dikirim!");

      setTimeout(() => {
        navigate(`/selesai?ref=${orderNumber}`);
      }, 1500);
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error("Gagal mengupload bukti. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <Toaster position="top-center" reverseOrder={false} />

      <Motion.div
        className="upload-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-header">
          <button onClick={() => navigate(-1)} className="btn-back">
            <FaArrowLeft />
          </button>
          <h2>Konfirmasi Pembayaran</h2>
        </div>

        <div className="invoice-info">
          <p>Order ID</p>
          <h3>{orderNumber}</h3>
        </div>

        <div className="upload-area-wrapper">
          <AnimatePresence mode="wait">
            {!preview ? (
              <Motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`dropzone ${isDragActive ? "active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                  hidden
                />
                <div className="icon-wrapper">
                  <FaCloudUploadAlt size={40} />
                </div>
                <p>Klik atau Taruh gambar disini</p>
                <span>JPG, PNG, JPEG (Max 5MB)</span>
              </Motion.div>
            ) : (
              <Motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="image-preview-container"
              >
                <img src={preview} alt="Bukti Transfer" className="preview-img" />
                <div className="file-info">
                  <FaFileImage />
                  <span>{file?.name}</span>
                </div>
                <button type="button" onClick={removeFile} className="btn-remove">
                  <FaTrash /> Ganti Foto
                </button>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="btn-submit" disabled={loading || !file} onClick={handleSubmit}>
          {loading ? (
            <div className="loading-content">
              <CgSpinner className="spin" size={20} /> Mengupload...
            </div>
          ) : (
            <div className="btn-content">
              <FaCheckCircle /> Kirim Bukti
            </div>
          )}
        </button>
      </Motion.div>
    </div>
  );
}
