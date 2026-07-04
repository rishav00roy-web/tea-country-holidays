"use client";

import { useEffect, useState, useRef } from "react";
import {
  listBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogPublished,
  type BlogPost,
} from "./actions";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Loader2, 
  Check, 
  AlertCircle 
} from "lucide-react";

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  
  // Track if slug was manually edited
  const isSlugEdited = useRef(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listBlogs();
      setBlogs(data);
    } catch (err: any) {
      setError(err.message || "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start
      .replace(/-+$/, ""); // Trim - from end
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugEdited.current) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(slugify(val));
    isSlugEdited.current = true;
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setCoverImage("");
    setContent("");
    setPublished(false);
    isSlugEdited.current = false;
    setError(null);
    setIsOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingId(blog.id);
    setTitle(blog.title || "");
    setSlug(blog.slug || "");
    setExcerpt(blog.excerpt || "");
    setCoverImage(blog.cover_image || "");
    setContent(blog.content || "");
    setPublished(blog.published);
    isSlugEdited.current = true;
    setError(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      setError("Title, Slug, and Content are required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    // Get current record if editing to keep existing published_at
    const currentRecord = blogs.find(b => b.id === editingId);
    let published_at = currentRecord?.published_at || null;

    if (published) {
      if (!published_at) {
        published_at = new Date().toISOString();
      }
    } else {
      published_at = null;
    }

    const payload = {
      title,
      slug,
      excerpt,
      cover_image: coverImage,
      content,
      published,
      published_at,
    };

    try {
      if (editingId) {
        const data = await updateBlog(editingId, payload);
        setBlogs(prev => prev.map(b => b.id === editingId ? data : b));
      } else {
        const data = await createBlog(payload);
        setBlogs(prev => [data, ...prev]);
      }
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the blog post "${name}"?`)) return;

    try {
      await deleteBlog(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete blog post");
    }
  };

  const togglePublished = async (blog: BlogPost) => {
    const updatedStatus = !blog.published;
    let published_at = updatedStatus ? (blog.published_at || new Date().toISOString()) : null;
    
    // Optimistic update
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, published: updatedStatus, published_at } : b));

    try {
      await toggleBlogPublished(blog.id, updatedStatus, published_at);
      
      // Refresh list to pull actual formatted updated timestamp if needed
      fetchBlogs();
    } catch (err: any) {
      // Revert status on failure
      setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, published: blog.published, published_at: blog.published_at } : b));
      alert(err.message || "Failed to update status");
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Draft";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Blog Posts</h1>
          <p className="text-slate-500 mt-1">Manage travels stories, guides, and articles for your visitors.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#235640] text-white font-medium text-sm rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Post</span>
        </button>
      </div>

      {/* Filter and search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, slug, excerpt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/25 focus:border-[#1B4332] transition-all"
          />
        </div>
      </div>

      {/* Table container */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#1B4332]" />
            <span>Fetching blog posts...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            {searchQuery ? "No blog posts match your search criteria." : "No blogs posted yet. Click 'Add New Post' to get started."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-sm">
                  <th className="py-4 px-6">Cover</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Slug</th>
                  <th className="py-4 px-6">Published Date</th>
                  <th className="py-4 px-6 text-center">Published</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-14 h-10 rounded-md overflow-hidden bg-slate-100 border border-slate-200/60">
                        {blog.cover_image ? (
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=120&q=80";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-medium">No Image</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-900 max-w-xs truncate">
                      {blog.title}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-xs max-w-[150px] truncate">
                      {blog.slug}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {formatDate(blog.published_at)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => togglePublished(blog)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            blog.published ? "bg-[#1B4332]" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              blog.published ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(blog)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                          title="Edit Post"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop overlay */}
          <div 
            onClick={() => !submitting && setIsOpen(false)} 
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          />

          {/* Modal content drawer */}
          <div className="relative bg-white w-full max-w-2xl h-full flex flex-col shadow-2xl z-10 transition-transform duration-300 transform animate-in slide-in-from-right">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-150 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit Blog Post" : "Add New Blog Post"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingId ? "Update article details and slug uniqueness" : "Compose a new travel article"}
                </p>
              </div>
              <button
                disabled={submitting}
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              {error && (
                <div className="flex gap-2.5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Post Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 Places to Visit in Shillong in 2026"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Slug (Unique URL Path) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10-places-to-visit-shillong-2026"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
                <p className="text-[11px] text-slate-400">Generated URL: /blog/{slug || "slug-preview"}</p>
              </div>

              {/* Cover Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Cover Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/blog-cover.jpg"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  placeholder="Write a brief, catchy summary of this article to entice readers..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] resize-y"
                />
              </div>

              {/* Content Body */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Content Body *</label>
                <textarea
                  rows={10}
                  required
                  placeholder="Write the full body of the article here. Plain text or Markdown format..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] resize-y"
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-slate-800">Publish to Website</span>
                  <p className="text-xs text-slate-500">Visible on active lists and sets the published date.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPublished(!published)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    published ? "bg-[#1B4332]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      published ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-3 bg-white sticky bottom-0">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-semibold text-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B4332] hover:bg-[#235640] text-white font-semibold text-sm rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-75"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Post</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
