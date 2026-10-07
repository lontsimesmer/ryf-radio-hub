import React, { useState } from "react";
import { RYF_ASSETS } from "@/lib/ryf-data";
import { Users, Send, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";

export const RealisationsAndCommunitySection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Veuillez saisir une adresse email valide.");
      return;
    }

    setIsSubmitting(true);

    try {
      type StandardTrackingFieldKey = string;
      const trackingPayload = {
        type: "external_form_submission",
        timestamp: Date.now(),
        formId: "ryf-newsletter-signup",
        formData: { email: email.trim() },
        formLabels: { email: "Adresse Email" },
        url: window.location.href,
        title: document.title,
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        trackingId: "tk_22808829b2c444b7bb32b0fe52127357",
        locationId: "HyAo0sSOVqoNkBuZLamN",
        projectId: "1791205471365853905",
        sessionId: crypto.randomUUID(),
        properties: {
          deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
          source: "ai_studio",
          projectId: "1791205471365853905",
          formName: "Inscription Communauté RYF Radio",
        },
      };

      const body = new FormData();
      body.append("event", JSON.stringify(trackingPayload));

      fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
        method: "POST",
        headers: { version: "2021-07-28" },
        body,
      }).catch(() => {});
    } catch (err) {
      console.error("Tracking error:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast.success("Bienvenue dans la communauté RYF Radio !");
    }, 600);
  };

  return (
    <section className="py-16 sm:py-20 text-white relative overflow-hidden">
      {/* Background photo: community of radio journalists */}
      <div className="absolute inset-0 z-0">
        <img
          src={RYF_ASSETS.communityBg}
          alt="Communauté de journalistes radio RYF"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ryf-navy/60" />
        <div className="absolute inset-0 bg-linear-to-br from-ryf-navy/75 via-ryf-navy/50 to-primary/40" />
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
          REJOIGNEZ LA COMMUNAUTÉ RYF
        </h2>

        <p className="mt-3 text-lg sm:text-xl font-bold text-accent">
          « Le top du divertissement, partout avec vous ! »
        </p>

        <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
          Abonnez-vous à notre newsletter culturelle pour recevoir en exclusivité les sorties
          musicales, les invitations aux événements et la grille de nos programmes.
        </p>

        {/* Newsletter Box */}
        <div className="mt-8 max-w-xl mx-auto bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-2xl">
          {isSubscribed ? (
            <div className="py-4 flex items-center justify-center gap-2 text-sm sm:text-base font-bold text-accent">
              <CheckCircle2 className="w-6 h-6" />
              <span>Merci pour votre inscription ! Bienvenue dans la famille RYF.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-white/60 text-sm focus:outline-hidden focus:ring-2 focus:ring-accent"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-accent/90 transition-all shadow-md flex items-center justify-center gap-2 shrink-0 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Envoi..." : "S'INSCRIRE"}</span>
              </button>
            </form>
          )}
          <p className="text-[11px] text-white/60 mt-2">
            Pas de spam. Désinscription possible en un clic. Vos données restent confidentielles.
          </p>
        </div>
      </div>
    </section>
  );
};
