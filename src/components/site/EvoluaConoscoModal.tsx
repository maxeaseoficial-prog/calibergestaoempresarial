import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";
import { EvoluaConoscoForm } from "./EvoluaConoscoForm";
import { cn } from "@/lib/utils";

interface EvoluaConoscoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EvoluaConoscoModal({ isOpen, onClose }: EvoluaConoscoModalProps) {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Close on ESC
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Success handling: Reset status when opening
  React.useEffect(() => {
    if (isOpen) setIsSuccess(false);
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative w-full max-w-[720px] overflow-hidden rounded-[2rem] bg-white shadow-2xl",
              "max-h-[90vh] flex flex-col"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/5 px-8 py-6">
              <div>
                <span className="eyebrow text-purple">EVOLUA CONOSCO</span>
                <h2 id="modal-title" className="mt-2 text-2xl font-bold tracking-tight text-ink">
                  {isSuccess ? "Solicitação enviada" : "Vamos entender o momento da sua empresa."}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="group -mr-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-lavender"
                aria-label="Fechar modal"
              >
                <X className="size-5 text-ink/40 transition-colors group-hover:text-purple" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
              {!isSuccess ? (
                <>
                  <p className="mb-8 text-sm leading-relaxed text-ink/60">
                    Conte um pouco sobre o seu negócio para que nossa equipe possa direcionar a conversa da forma mais estratégica possível.
                  </p>
                  <EvoluaConoscoForm onSuccess={() => setIsSuccess(true)} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600"
                  >
                    <CheckCircle2 className="size-10" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-ink">Recebemos suas informações.</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
                    Nossa equipe analisará o momento da sua empresa e entrará em contato para dar continuidade à conversa.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-10 rounded-xl bg-purple px-12 py-4 text-sm font-bold tracking-wider text-white transition-all hover:bg-purple-deep hover:shadow-lift"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
