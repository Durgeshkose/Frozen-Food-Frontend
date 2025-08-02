import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaTimes,
  FaCloudUploadAlt,
  FaSpinner,
} from "react-icons/fa";

// Validation schema wahi rahega
const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(1, "Price must be at least 1"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  inStock: yup.boolean(),
});

const ProductManagement = () => {
  // STATE MANAGEMENT
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // UI/UX States
  const [isLoading, setIsLoading] = useState(true); // Page load ke liye
  const [isSubmitting, setIsSubmitting] = useState(false); // Form submission ke liye
  const [submissionError, setSubmissionError] = useState(null); // Form errors ke liye

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(productSchema) });

  // DATA FETCHING
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // PERFORMANCE OPTIMIZATION
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchName && matchCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const uniqueCategories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  // MODAL HANDLING
  const openModal = (product = null) => {
    setEditingProduct(product);
    setSubmissionError(null);
    if (product) {
      Object.keys(product).forEach((key) => {
        if (key in productSchema.fields) {
          setValue(key, product[key]);
        }
      });
      setSelectedImage(product.image);
    } else {
      reset();
      setSelectedImage(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    reset();
    setSelectedImage(null);
    setSubmissionError(null);
  };

  // FORM SUBMISSION (CREATE/UPDATE LOGIC) - WITH DEBUGGING
  const onSubmit = async (data) => {
    // --- DEBUGGING CHECK ---
    // Yeh check karega ki form se category aa rahi hai ya nahi.
    if (!data.category || data.category.trim() === "") {
      alert(
        "DEBUGGING ALERT: Category field khaali hai! Please form mein category daalein."
      );
      return; // API call ko rok dega
    }
    // --- END OF DEBUGGING CHECK ---

    if (!selectedImage) {
      setSubmissionError("Product image is required.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
      ...data,
      image: selectedImage,
      price: Number(data.price),
      inStock: data.inStock || false,
    };

    try {
      if (editingProduct) {
        // UPDATE (PUT Request)
        await axiosInstance.put(`/products/${editingProduct._id}`, payload);
      } else {
        // CREATE (POST Request)
        await axiosInstance.post("/products", payload);
      }
      fetchProducts();
      closeModal();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "An unexpected error occurred.";
      setSubmissionError(errorMsg);
      console.error("Operation failed:", err.response?.data || err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE LOGIC
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err.message);
      alert("Failed to delete product. Please try again.");
    }
  };

  // IMAGE HANDLING
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSubmissionError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // RENDER
  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Product Management
          </h1>
          <p className="text-blue-100 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 border border-blue-500/30 hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          <FaPlus />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute top-3 left-3 text-blue-300" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product..."
              className="pl-10 pr-4 py-2 w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="relative w-full md:w-48">
            <FaFilter className="absolute top-3 left-3 text-blue-300" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="All" className="bg-slate-800 text-white">
                All Categories
              </option>
              {uniqueCategories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-slate-800 text-white"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State or Product Table */}
      {isLoading ? (
        <div className="text-center py-10 text-white flex items-center justify-center">
          <FaSpinner className="animate-spin mr-3 text-2xl" />
          <span>Loading Products...</span>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-bold uppercase text-blue-200">
                      Product
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-bold uppercase text-blue-200">
                      Category
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-bold uppercase text-blue-200">
                      Price
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-bold uppercase text-blue-200">
                      Stock
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-bold uppercase text-blue-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredProducts.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 lg:px-6 py-4 flex items-center">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 lg:w-12 lg:h-12 rounded object-cover mr-3 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">
                            {p.name}
                          </p>
                          <p className="text-sm text-blue-200 truncate">
                            {p.description?.slice(0, 30)}...
                          </p>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-blue-100">
                        {p.category}
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-green-300 font-medium">
                        ₹{p.price}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs backdrop-blur-sm border ${
                            p.inStock
                              ? "bg-green-500/20 text-green-300 border-green-400/30"
                              : "bg-red-500/20 text-red-300 border-red-400/30"
                          }`}
                        >
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 space-x-2">
                        <button
                          onClick={() => openModal(p)}
                          className="text-blue-300 hover:text-blue-100 p-1 transition-colors"
                          title="Edit Product"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="text-red-300 hover:text-red-100 p-1 transition-colors"
                          title="Delete Product"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-blue-200">
                No products found matching your criteria.
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {p.name}
                        </h3>
                        <p className="text-sm text-blue-200 truncate">
                          {p.description}
                        </p>
                        <p className="text-xs text-blue-300 mt-1">
                          {p.category}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-2">
                        <button
                          onClick={() => openModal(p)}
                          className="text-blue-300 hover:text-blue-100 p-2 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="text-red-300 hover:text-red-100 p-2 transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-green-300 font-medium">
                        ₹{p.price}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs backdrop-blur-sm border ${
                          p.inStock
                            ? "bg-green-500/20 text-green-300 border-green-400/30"
                            : "bg-red-500/20 text-red-300 border-red-400/30"
                        }`}
                      >
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-blue-200">
                No products found matching your criteria.
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 w-full max-w-xl rounded-lg p-4 md:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {editingProduct ? "Edit" : "Add"} Product
              </h2>
              <button
                onClick={closeModal}
                className="text-blue-200 hover:text-white text-xl p-1 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Image */}
              <div>
                <label className="block font-medium mb-2 text-white">
                  Product Image
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded border border-white/20"
                    />
                  )}
                  <label className="flex items-center space-x-2 cursor-pointer bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-blue-200 hover:bg-white/25 transition-colors">
                    <FaCloudUploadAlt />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block font-medium mb-2 text-white">
                  Product Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-sm text-red-300 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2 text-white">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price")}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-300 mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-2 text-white">
                    Category
                  </label>
                  <input
                    type="text"
                    {...register("category")}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="e.g., Frozen Foods"
                  />
                  {errors.category && (
                    <p className="text-sm text-red-300 mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-2 text-white">
                  Description
                </label>
                <textarea
                  rows={3}
                  {...register("description")}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-sm text-red-300 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* In Stock */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...register("inStock")}
                  className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500"
                />
                <label className="text-white">Product is in stock</label>
              </div>

              {/* Submission Error Display */}
              {submissionError && (
                <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-2 rounded-lg text-sm">
                  {submissionError}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-600/80 backdrop-blur-sm border border-gray-500/30 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600/80 backdrop-blur-sm border border-blue-500/30 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting && (
                    <FaSpinner className="animate-spin mr-2" />
                  )}
                  {isSubmitting
                    ? editingProduct
                      ? "Updating..."
                      : "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
