import { MessageCircle } from "lucide-react";

export function WhatsAppLink({ className = "btn-primary" }: { className?: string }) {
  return (
    <a
      href="https://wa.me/254757544494"
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label="Chat with JuveTech Media on WhatsApp (opens in a new tab)"
    >
      Chat on WhatsApp <MessageCircle size={18} aria-hidden="true" />
    </a>
  );
}
