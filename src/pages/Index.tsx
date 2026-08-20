import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Flame, Zap, Target, Shield, Brain } from 'lucide-react';

const formSchema = z.object({
  nomFF: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  uidFF: z.string().regex(/^\d{9,12}$/, 'UID invalide (9-12 chiffres)'),
  poste: z.enum(['Rusher', 'Sniper', 'Support', 'Capitaine/IGL']),
  motivation: z.string().min(10, 'La motivation doit contenir au moins 10 caractères'),
  photo: z.instanceof(FileList).refine(
    (files) => files.length > 0,
    'La photo est obligatoire'
  ).refine(
    (files) => files[0]?.type.startsWith('image/'),
    'Le fichier doit être une image'
  ).refine(
    (files) => files[0]?.size <= 5 * 1024 * 1024,
    'La taille maximale est 5MB'
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function RecruitmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // Préparation du message WhatsApp
      const message = `🔥 *NOUVELLE CANDIDATURE MËØNIFÏK FF* 🔥\n\n` +
        `👤 *Nom FF* : ${data.nomFF}\n` +
        `🆔 *UID FF* : ${data.uidFF}\n` +
        `🎯 *Poste* : ${data.poste}\n` +
        `💬 *Motivation* : ${data.motivation}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/261376224442?text=${encodedMessage}`;

      setSubmittedData(data);
      setSubmitted(true);

      // Ouverture WhatsApp dans un nouvel onglet
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  if (submitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-purple-950/80 border-yellow-500/50 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <CardTitle className="text-2xl text-yellow-400">Candidature Reçue 🔥</CardTitle>
            <CardDescription className="text-purple-300">
              Merci {submittedData.nomFF}, vos infos ont été sauvegardées.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-900/50 p-4 rounded-lg border border-yellow-500/30">
              <p className="text-sm text-purple-300">
                <span className="font-bold text-yellow-400">Poste:</span> {submittedData.poste}
              </p>
              <p className="text-sm text-purple-300 mt-2">
                <span className="font-bold text-yellow-400">UID:</span> {submittedData.uidFF}
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => window.open(`https://wa.me/261376224442?text=${encodeURIComponent(
                  `🔥 *NOUVELLE CANDIDATURE MËØNIFÏK FF* 🔥\n\n👤 *Nom FF* : ${submittedData.nomFF}\n🆔 *UID FF* : ${submittedData.uidFF}\n🎯 *Poste* : ${submittedData.poste}\n💬 *Motivation* : ${submittedData.motivation}`
                )}`, '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                ENVOYER SUR WHATSAPP AU STAFF 🚀
              </Button>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  form.reset();
                }}
                variant="outline"
                className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                Nouvelle Candidature
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-md bg-purple-950/80 border-yellow-500/50 shadow-2xl">
        <CardHeader className="text-center border-b border-yellow-500/20 pb-6">
          <div className="flex justify-center mb-3">
            <Flame className="w-8 h-8 text-yellow-400" />
          </div>
          <CardTitle className="text-3xl text-yellow-400 font-black">Mëønifïk FF</CardTitle>
          <CardDescription className="text-purple-300 text-sm font-semibold mt-2">
            RECRUTEMENT OFFICIEL
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Nom FF */}
              <FormField
                control={form.control}
                name="nomFF"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-400 font-semibold">Nom Free Fire *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre pseudo en jeu"
                        className="bg-purple-900/50 border-purple-700 text-white placeholder:text-purple-400 focus:border-yellow-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* UID FF */}
              <FormField
                control={form.control}
                name="uidFF"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-400 font-semibold">UID Free Fire *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 123456789"
                        className="bg-purple-900/50 border-purple-700 text-white placeholder:text-purple-400 focus:border-yellow-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Poste */}
              <FormField
                control={form.control}
                name="poste"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-400 font-semibold">Poste Souhaité *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="bg-purple-900/50 border-purple-700 text-white">
                          <SelectValue placeholder="Choisir un poste" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-purple-900 border-purple-700">
                        <SelectItem value="Rusher" className="text-white">Rusher ⚡</SelectItem>
                        <SelectItem value="Sniper" className="text-white">Sniper 🎯</SelectItem>
                        <SelectItem value="Support" className="text-white">Support 🛡️</SelectItem>
                        <SelectItem value="Capitaine/IGL" className="text-white">Capitaine/IGL 🧠</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Photo */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-400 font-semibold">Photo du Profil FF *</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files)}
                        className="bg-purple-900/50 border-purple-700 text-purple-300 file:text-yellow-400 file:bg-purple-800 file:border-0 cursor-pointer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Motivation */}
              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-400 font-semibold">Motivation *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Pourquoi rejoindre la Mëønifïk?"
                        rows={4}
                        className="bg-purple-900/50 border-purple-700 text-white placeholder:text-purple-400 focus:border-yellow-500 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Info obligatoire */}
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-300">Tous les champs sont obligatoires</p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-bold text-base h-11 transition-all"
              >
                {loading ? 'Traitement...' : 'ENVOYER MA CANDIDATURE'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
