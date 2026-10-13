import React, { useState, useSyncExternalStore } from "react";
import { RYF_ASSETS, RYF_CONTACTS, RYF_PROGRAMMES } from "@/lib/ryf-data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Phone, Mail, MapPin, Calendar, X, Send, Upload, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { playerStore } from "@/lib/player-store";

export const FooterAndModals: React.FC = () => {
  const scheduleOpen = useSyncExternalStore(
    playerStore.subscribe,
    playerStore.getScheduleOpen,
    () => false,
  );
  const setScheduleOpen = (open: boolean) =>
    open ? playerStore.openSchedule() : playerStore.closeSchedule();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Campagne Publicitaire & Spots Radio");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Le fichier ne doit pas dépasser 50 Mo.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Veuillez renseigner votre adresse email.");
      return;
    }

    setIsSending(true);

    try {
      type StandardTrackingFieldKey = string;
      type RegisteredCustomFieldId = string;
      type TrackingCustomField = { value?: unknown; label: string };
      type TrackingFileField = { file?: File; label: string };
      type TrackingImageDataField = { dataUrl?: string; label: string };

      const postTrackingEvent = (
        trackingPayload: Record<string, unknown> & {
          formData: Record<StandardTrackingFieldKey, unknown>;
          formLabels: Record<StandardTrackingFieldKey, string>;
        },
        options: {
          customFields?: Record<RegisteredCustomFieldId, TrackingCustomField>;
          fileFields?: Record<RegisteredCustomFieldId, TrackingFileField>;
          imageDataFields?: Record<RegisteredCustomFieldId, TrackingImageDataField>;
        } = {},
      ) => {
        const { customFields = {}, fileFields = {}, imageDataFields = {} } = options;
        const eventPayload = {
          ...trackingPayload,
          formData: { ...trackingPayload.formData },
          formLabels: { ...trackingPayload.formLabels },
        };
        const body = new FormData();

        for (const [key, field] of Object.entries(customFields)) {
          if (field.value === undefined) continue;
          eventPayload.formData[key] = field.value;
          eventPayload.formLabels[key] = field.label;
        }

        for (const [key, field] of Object.entries(imageDataFields)) {
          const dataUrl = field.dataUrl;
          if (!dataUrl) continue;
          if (!dataUrl.startsWith("data:image/")) {
            throw new Error("Image data field must be a data:image/* base64 string");
          }
          eventPayload.formData[key] = dataUrl;
          eventPayload.formLabels[key] = field.label;
        }

        for (const [key, field] of Object.entries(fileFields)) {
          const file = field.file;
          if (!file) continue;
          if (file.size > 50 * 1024 * 1024) {
            throw new Error("File must be 50 MB or smaller");
          }
          eventPayload.formData[key] = {
            filename: file.name,
            size: file.size,
            type: file.type || "application/octet-stream",
          };
          eventPayload.formLabels[key] = field.label;
          body.append(key, file, file.name);
        }

        for (const key of Object.keys(eventPayload.formData)) {
          eventPayload.formLabels[key] ||= key;
        }

        body.append("event", JSON.stringify(eventPayload));

        fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
          method: "POST",
          headers: { version: "2021-07-28" },
          body,
        }).catch(() => {});
      };

      const trackingPayload = {
        type: "external_form_submission",
        timestamp: Date.now(),
        formId: "contact-form",
        formData: {
          first_name: name.trim(),
          email: email.trim(),
        },
        formLabels: {
          first_name: "Nom complet ou Entreprise",
          email: "Adresse Email",
        },
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
          formName: "Formulaire Contact RYF Radio",
        },
      };

      postTrackingEvent(trackingPayload, {
        fileFields: selectedFile
          ? {
              BzwphLZvJ1NMCBsTNH3e: {
                file: selectedFile,
                label: "Document Joint",
              },
            }
          : undefined,
      });
    } catch (err) {
      console.error("Tracking error:", err);
    }

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      toast.success("Votre demande avec document a bien été transmise à l'équipe RYF Radio !");
      setName("");
      setEmail("");
      setSelectedFile(null);
    }, 700);
  };

  return (
    <>
      {/* SECTION ÉCHANGEZ AVEC RYF RADIO - Titre, description et formulaire uniquement */}
      <section id="contact" className="pt-0 pb-16 bg-white border-b border-border/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header épuré : titre + description */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight uppercase">
              ÉCHANGEZ AVEC <span className="text-primary">nous</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Vous souhaitez diffuser un spot publicitaire, parrainer une émission, annoncer un
              événement ou proposer une collaboration culturelle ? Transmettez-nous votre demande et
              vos documents ci-dessous.
            </p>
          </div>

          {/* Formulaire avec champ télécharger document */}
          <div className="bg-slate-50 border border-border rounded-2xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="p-8 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <FileCheck className="w-10 h-10 text-primary mx-auto mb-2" />
                <h4 className="text-base font-bold text-primary">
                  Document et demande bien reçus !
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Merci pour votre intérêt envers RYF Radio. Notre équipe reviendra rapidement vers
                  vous.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      Nom complet ou Entreprise
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Carlos Ndam / Agence Média"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Objet de votre demande
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                  >
                    <option>Campagne Publicitaire & Spots Radio</option>
                    <option>Partenariat Événementiel / Couverture</option>
                    <option>Interview ou Passage à l'antenne</option>
                    <option>Dossier de Presse ou Présentation Artiste</option>
                    <option>Autre demande générale</option>
                  </select>
                </div>

                {/* Champ Télécharger Document au lieu de Votre Message */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Télécharger document (Dossier de presse, audio, brief, PDF...)
                  </label>
                  <div className="relative border-2 border-dashed border-border hover:border-primary/60 bg-white rounded-xl p-4 transition-colors">
                    <input
                      type="file"
                      id="document-upload"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center text-center pointer-events-none">
                      <Upload className="w-6 h-6 text-primary mb-1.5" />
                      {selectedFile ? (
                        <div className="flex items-center gap-2 text-xs font-bold text-primary">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                          <span>{selectedFile.name}</span>
                          <span className="text-[11px] text-muted-foreground font-normal">
                            ({Math.round(selectedFile.size / 1024)} Ko)
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-xs font-semibold text-foreground">
                            Cliquez ou glissez-déposez votre document ici
                          </span>
                          <span className="text-[11px] text-muted-foreground mt-0.5">
                            Formats acceptés : PDF, DOCX, MP3, PNG, JPG (max 50 Mo)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? "Envoi en cours..." : "ENVOYER LE DOCUMENT"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER OFFICIEL */}
      <footer className="bg-ryf-dark text-white pt-14 pb-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            {/* Contacts en premier */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={RYF_ASSETS.logo}
                  alt="RYF Radio"
                  className="h-12 w-auto object-contain bg-white rounded-lg p-1"
                />
                <div>
                  <h3 className="font-black text-lg text-white leading-tight">RYF RADIO</h3>
                  <span className="text-[10px] uppercase font-bold text-accent tracking-widest">
                    « LE TOP DU DIVERTISSEMENT »
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed max-w-sm">
                Rythmes & Folies : la voix qui fait vibrer le cœur de notre culture. Plateforme
                digitale de musique, divertissement et information culturelle.
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                <a
                  href={RYF_CONTACTS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span> {RYF_CONTACTS.whatsapp}</span>
                </a>
                <div className="flex items-center gap-2.5 text-white/80">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Yaoundé - Cameroun</span>
                </div>
                <a
                  href={`mailto:${RYF_CONTACTS.email}`}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span>{RYF_CONTACTS.email}</span>
                </a>
              </div>
            </div>

            {/* Rubriques de la barre de navigation */}
            <div className="lg:col-span-7">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-4">
                RUBRIQUES
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-white/75">
                <a href="#hero" className="hover:text-white transition-colors">
                  Accueil
                </a>
                <a href="#actualites" className="hover:text-white transition-colors">
                  Actualités
                </a>
                <a href="#a-propos" className="hover:text-white transition-colors">
                  À Propos
                </a>
                <a href="#partenaires" className="hover:text-white transition-colors">
                  Nos Partenaires
                </a>
                <a href="#agenda" className="hover:text-white transition-colors">
                  Agenda Culturel
                </a>
                <a href="#programmes" className="hover:text-white transition-colors">
                  Nos Programmes
                </a>
                <a href="#videos" className="hover:text-white transition-colors">
                  Vidéos
                </a>
                <a href="#podcasts" className="hover:text-white transition-colors">
                  Podcasts
                </a>
                <a href="#equipe" className="hover:text-white transition-colors">
                  Notre Équipe
                </a>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Publicité
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col items-center gap-3 text-xs text-white/60">
            <div className="flex items-center gap-6">
              <a href="#a-propos" className="hover:text-white">
                Mentions Légales
              </a>
              <a href="#contact" className="hover:text-white">
                Politique de Confidentialité
              </a>
            </div>
            <div>
              © {new Date().getFullYear()} RYF RADIO • Rythmes & Folies. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>

      {/* Grille Hebdomadaire Modal */}
      {scheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-card rounded-2xl border border-border shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-foreground leading-tight">
                    GRILLE HEBDOMADAIRE RYF RADIO
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Programmes du Lundi au Dimanche • Le Top du Divertissement
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScheduleOpen(false)}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto space-y-3 flex-1 pr-1">
              {RYF_PROGRAMMES.map((prog) => (
                <div
                  key={prog.id}
                  className="p-3.5 rounded-xl border border-border bg-slate-50/70 hover:bg-slate-100/80 transition-colors flex items-start gap-4"
                >
                  <img
                    src={prog.imageUrl}
                    alt={prog.host}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-foreground">{prog.title}</h4>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {prog.time}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5">
                      Avec {prog.host} • {prog.days}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {prog.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
