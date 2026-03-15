import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Search, Plus, MessageCircle, User, ChevronLeft, Send } from "lucide-react";
import { initialForumPosts, FORUM_CATEGORIES, type ForumPost, type ForumComment } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const generateId = () => Math.random().toString(36).substring(2, 9);

const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>(initialForumPosts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: FORUM_CATEGORIES[0], author: "" });

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.author.trim()) return;
    const post: ForumPost = {
      id: generateId(),
      title: newPost.title,
      author: newPost.author,
      category: newPost.category,
      content: newPost.content,
      date: new Date().toISOString().split("T")[0],
      comments: [],
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost({ title: "", content: "", category: FORUM_CATEGORIES[0], author: "" });
    setIsNewPostOpen(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;
    const comment: ForumComment = {
      id: generateId(),
      author: "Usuario Anónimo",
      content: newComment,
      date: new Date().toISOString().split("T")[0],
    };
    setPosts((prev) =>
      prev.map((p) => (p.id === selectedPost.id ? { ...p, comments: [...p.comments, comment] } : p))
    );
    setSelectedPost((prev) => (prev ? { ...prev, comments: [...prev.comments, comment] } : null));
    setNewComment("");
  };

  const categoryColors: Record<string, string> = {
    "Dudas sobre el test": "bg-primary/10 text-primary",
    "Consejos": "bg-accent/10 text-accent",
    "General": "bg-secondary text-secondary-foreground",
  };

  // Detail view
  if (selectedPost) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-warm py-8">
          <div className="container max-w-3xl">
            <Button variant="ghost" onClick={() => setSelectedPost(null)} className="mb-4 gap-2">
              <ChevronLeft className="h-4 w-4" /> Volver al foro
            </Button>
            <Card>
              <CardHeader>
                <Badge className={`mb-2 w-fit ${categoryColors[selectedPost.category] || ""}`}>
                  {selectedPost.category}
                </Badge>
                <CardTitle className="font-display text-xl">{selectedPost.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3 w-3" /> {selectedPost.author} · {selectedPost.date}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{selectedPost.content}</p>

                <div className="mt-8 border-t pt-6">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> Comentarios ({selectedPost.comments.length})
                  </h3>
                  <div className="space-y-4">
                    {selectedPost.comments.map((c) => (
                      <div key={c.id} className="rounded-lg bg-muted p-4">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <User className="h-3 w-3 text-muted-foreground" /> {c.author}
                          <span className="text-muted-foreground">· {c.date}</span>
                        </div>
                        <p className="mt-2 text-sm">{c.content}</p>
                      </div>
                    ))}
                    {selectedPost.comments.length === 0 && (
                      <p className="text-sm text-muted-foreground">Aún no hay comentarios. ¡Sé el primero!</p>
                    )}
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Input
                      placeholder="Escribe un comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                      className="flex-1"
                    />
                    <Button onClick={handleAddComment} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // List view
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-warm py-8">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold">Foro de la Comunidad 🐾</h1>
              <p className="mt-1 text-muted-foreground">Comparte, pregunta y conecta con otros amantes de las mascotas</p>
            </div>
            <Button onClick={() => setIsNewPostOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Crear Post
            </Button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar temas..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant={categoryFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setCategoryFilter("all")}>Todos</Button>
              {FORUM_CATEGORIES.map((cat) => (
                <Button key={cat} variant={categoryFilter === cat ? "default" : "outline"} size="sm" onClick={() => setCategoryFilter(cat)}>
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => setSelectedPost(post)}>
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`text-xs ${categoryColors[post.category] || ""}`}>{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="mt-1 font-display font-semibold">{post.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                          <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {post.comments.length} comentarios</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">No se encontraron temas con esos filtros.</div>
          )}
        </div>
      </main>
      <Footer />

      {/* New Post Dialog */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Crear Nuevo Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tu Nombre</Label>
              <Input placeholder="Ej: María García" value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select value={newPost.category} onValueChange={(v) => setNewPost({ ...newPost, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FORUM_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input placeholder="Título del tema" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Contenido</Label>
              <Textarea placeholder="Escribe tu mensaje..." rows={4} value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
            <Button onClick={handleCreatePost}>Publicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forum;
