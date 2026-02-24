import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MessageSquare, Send, User, Loader2, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function GuestbookSection() {
  const comments = useQuery(api.comments.getAll);
  const commentCount = useQuery(api.comments.getCount);
  const createComment = useMutation(api.comments.create);
  const updateComment = useMutation(api.comments.update);
  const deleteComment = useMutation(api.comments.remove);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Name and message are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateComment({
          id: editingId,
          name: formData.name,
          message: formData.message,
        });
        toast({
          title: "Success",
          description: "Comment updated successfully!",
        });
        setEditingId(null);
      } else {
        await createComment({
          name: formData.name,
          message: formData.message,
        });
        toast({
          title: "Success",
          description: "Thank you for signing my guestbook!",
        });
      }

      setFormData({ name: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comment) => {
    setFormData({
      name: comment.name,
      message: comment.message,
    });
    setEditingId(comment._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment({ id });
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 relative bg-background">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                Guestbook
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Leave your mark! Share your thoughts, feedback, or just say hi 👋
          </p>
          {commentCount !== undefined && (
            <p className="text-sm text-muted-foreground mt-2">
              {commentCount} {commentCount === 1 ? "entry" : "entries"} so far
            </p>
          )}
        </div>

        {/* Comment Form */}
        <div className="mb-12">
          <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-accent/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              {editingId ? (
                <>
                  <Edit2 className="w-5 h-5" /> Edit Your Entry
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5" /> Sign the Guestbook
                </>
              )}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 bg-background/50 border border-accent/20 rounded-lg focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all dark:placeholder:text-white/50"
                    required
                    maxLength={50}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Leave your message here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-background/50 border border-accent/20 rounded-lg focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none dark:placeholder:text-white/50"
                  required
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {formData.message.length}/500
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {editingId ? "Updating..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {editingId ? "Update Entry" : "Sign Guestbook"}
                    </>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ name: "", message: "" });
                    }}
                    className="btn-secondary px-6 py-3 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Entries</h3>
          
          {comments === undefined ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-accent" />
              <p className="text-muted-foreground mt-4">Loading entries...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 glass-panel rounded-2xl border border-accent/20">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No entries yet. Be the first to sign the guestbook!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="glass-panel p-6 rounded-xl border border-accent/20 hover:border-accent/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{comment.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                          {comment.updatedAt && " (edited)"}
                        </p>
                      </div>
                    </div>
                    <p className="text-foreground/90 leading-relaxed ml-13">
                      {comment.message}
                    </p>
                  </div>

                  {/* Action buttons (only show on hover for cleaner look) */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(comment)}
                      className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
