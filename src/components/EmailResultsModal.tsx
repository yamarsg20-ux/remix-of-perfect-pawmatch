import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmailResultsModal = ({ open, onOpenChange }: EmailResultsModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!name.trim() || !email.trim()) return;
    toast({
      title: "✉️ ¡Resultados enviados con éxito!",
      description: `Se enviaron a ${email}. ¡Revisa tu bandeja de entrada!`,
    });
    setName("");
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Mail className="h-5 w-5 text-primary" /> Enviar resultados por correo
          </DialogTitle>
          <DialogDescription>
            Ingresa tu nombre y correo para recibir un resumen de tu Match y el simulador de costos.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSend}
            disabled={!name.trim() || !email.trim()}
            className="gap-2 bg-peach text-peach-foreground hover:bg-peach/90"
          >
            <Mail className="h-4 w-4" /> Enviar resultados
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailResultsModal;
