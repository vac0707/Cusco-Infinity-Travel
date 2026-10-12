import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PACKAGES, WHATSAPP_NUMBER } from '@/constants';
import { Package } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Compass, 
  Clock, 
  DollarSign, 
  Activity, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles,
  Phone
} from 'lucide-react';

interface QuizState {
  experienceType: string;
  duration: string;
  budget: string;
  difficulty: string;
}

const INITIAL_STATE: QuizState = {
  experienceType: '',
  duration: '',
  budget: '',
  difficulty: ''
};

export default function ExperienceQuiz() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizState>(INITIAL_STATE);
  const totalSteps = 4;

  const handleSelect = (key: keyof QuizState, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else setStep(5); // Show results
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const restartQuiz = () => {
    setAnswers(INITIAL_STATE);
    setStep(1);
  };

  // Deterministic scoring function matching PACKAGES respecting budget, duration and difficulty
  const recommendations = useMemo(() => {
    if (step !== 5) return [];

    // 1. Filter packages that strictly satisfy hard constraints
    let eligible = PACKAGES.filter(pkg => {
      // Budget filter
      if (answers.budget === 'economico' && pkg.price > 40) return false;
      if (answers.budget === 'moderado' && (pkg.price <= 40 || pkg.price > 70)) return false;
      if (answers.budget === 'exclusivo' && pkg.price <= 70) return false;

      // Duration filter
      if (answers.duration === 'medio-dia' && pkg.duration !== 'Medio Día') return false;
      if (answers.duration === 'un-dia' && pkg.duration !== '1 Día') return false;

      // Difficulty filter
      if (answers.difficulty === 'facil' && pkg.difficulty !== 'Fácil') return false;
      if (answers.difficulty === 'moderado' && pkg.difficulty !== 'Moderado') return false;
      if (answers.difficulty === 'desafiante' && pkg.difficulty !== 'Desafiante') return false;

      return true;
    });

    // If too strict (0 matches due to very niche combination), relax progressively
    if (eligible.length === 0) {
      eligible = PACKAGES.filter(pkg => {
        // Enforce budget at minimum if set
        if (answers.budget === 'economico' && pkg.price > 40) return false;
        if (answers.budget === 'moderado' && (pkg.price <= 40 || pkg.price > 70)) return false;
        if (answers.budget === 'exclusivo' && pkg.price <= 70) return false;
        return true;
      });
    }

    // Final fallback to all packages if still empty
    if (eligible.length === 0) {
      eligible = PACKAGES;
    }

    const scored = eligible.map(pkg => {
      let score = 0;
      const matchReasons: string[] = [];

      // 1. Experience Type scoring
      if (answers.experienceType === 'machu-picchu') {
        if (pkg.categories?.includes('machu-picchu')) {
          score += 20;
          matchReasons.push('Destino Machu Picchu');
        }
      } else if (answers.experienceType === 'cultura-historia') {
        if (pkg.categories?.includes('cultura-historia')) {
          score += 18;
          matchReasons.push('Ruta cultural e histórica');
        }
      } else if (answers.experienceType === 'naturaleza-montanas') {
        if (pkg.categories?.includes('naturaleza-montanas')) {
          score += 18;
          matchReasons.push('Paisajes y montañas andinas');
        }
      } else if (answers.experienceType === 'aventura') {
        if (pkg.categories?.includes('aventura')) {
          score += 18;
          matchReasons.push('Aventura y adrenalina');
        }
      } else {
        // 'no-estoy-seguro' - reward featured tours
        if (pkg.featured) {
          score += 10;
          matchReasons.push('Experiencia destacada recomendada');
        }
      }

      // 2. Duration affinity
      if (answers.duration === 'medio-dia' && pkg.duration === 'Medio Día') {
        score += 10;
        matchReasons.push('Duración medio día');
      } else if (answers.duration === 'un-dia' && pkg.duration === '1 Día') {
        score += 10;
        matchReasons.push('Duración de 1 día completo');
      }

      // 3. Budget affinity
      if (answers.budget === 'economico' && pkg.price <= 40) {
        score += 12;
        matchReasons.push(`Presupuesto accesible ($${pkg.price} USD)`);
      } else if (answers.budget === 'moderado' && pkg.price > 40 && pkg.price <= 70) {
        score += 12;
        matchReasons.push(`Rango intermedio ($${pkg.price} USD)`);
      } else if (answers.budget === 'exclusivo' && pkg.price > 70) {
        score += 12;
        matchReasons.push(`Experiencia integral ($${pkg.price} USD)`);
      }

      // 4. Difficulty affinity
      if (answers.difficulty === 'facil' && pkg.difficulty === 'Fácil') {
        score += 10;
        matchReasons.push('Caminata accesible');
      } else if (answers.difficulty === 'moderado' && pkg.difficulty === 'Moderado') {
        score += 10;
        matchReasons.push('Nivel físico moderado');
      } else if (answers.difficulty === 'desafiante' && pkg.difficulty === 'Desafiante') {
        score += 10;
        matchReasons.push('Ruta de alta montaña');
      }

      if (pkg.featured) {
        score += 5;
      }

      // Fallback reason if none added
      if (matchReasons.length === 0) {
        matchReasons.push('Alternativa versátil recomendada');
      }

      return {
        pkg,
        score,
        matchReasons
      };
    });

    // Sort by score descending and return top 3
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3);
  }, [step, answers]);

  const getWhatsAppBookingLink = (pkg: Package) => {
    const text = encodeURIComponent(
      `Hola, he usado el recomendador de Cusco Infinity Travel y me interesa el tour "${pkg.title}" ($${pkg.price} USD). ¿Tienen disponibilidad y asesoría para mi viaje?`
    );
    return `https://wa.me/51${WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-border rounded-sm shadow-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-metallic" />

      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2">
          Asesoría Determinista Personalizada
        </span>
        <h3 className="text-3xl sm:text-4xl font-normal font-heading text-dark">
          Encuentra tu Experiencia Ideal
        </h3>
        <p className="text-sm text-muted-foreground font-light max-w-lg mx-auto mt-2">
          Responde 4 preguntas breves sobre tus preferencias y nuestro sistema seleccionará los mejores paquetes según tus tiempos, presupuesto y condición física.
        </p>
      </div>

      {step <= totalSteps ? (
        <div>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
              <span className="font-medium text-dark">Paso {step} de {totalSteps}</span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                {step === 1 && 'Tipo de Experiencia'}
                {step === 2 && 'Tiempo Disponible'}
                {step === 3 && 'Presupuesto'}
                {step === 4 && 'Nivel de Dificultad'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-metallic transition-all duration-500 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Type of experience */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-dark flex items-center gap-2 mb-4">
                <Compass size={18} className="text-primary" />
                1. ¿Qué tipo de experiencia buscas vivir en Cusco?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'machu-picchu', title: 'Machu Picchu', desc: 'La gran maravilla inca y sus trenes panorámicos' },
                  { id: 'cultura-historia', title: 'Cultura e Historia', desc: 'Templos incas, fortalezas y valles sagrados' },
                  { id: 'naturaleza-montanas', title: 'Naturaleza y Paisajes', desc: 'Lagunas turquesas, nevados y montañas multicolores' },
                  { id: 'aventura', title: 'Aventura y Adrenalina', desc: 'Cuatrimotos y trekkings fuera de lo convencional' },
                  { id: 'no-estoy-seguro', title: 'Aún no estoy seguro / Variado', desc: 'Quiero ver las opciones más recomendadas por la agencia' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('experienceType', opt.id)}
                    className={`text-left p-4 rounded-sm border transition-all duration-300 flex items-start justify-between ${
                      answers.experienceType === opt.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-dark">{opt.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                    </div>
                    {answers.experienceType === opt.id && (
                      <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 ml-2">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Time available */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-dark flex items-center gap-2 mb-4">
                <Clock size={18} className="text-primary" />
                2. ¿Cuánto tiempo tienes disponible para esta actividad?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'medio-dia', title: 'Medio Día (4-5 hrs)', desc: 'Ideal para mañanas o tardes libres en la ciudad' },
                  { id: 'un-dia', title: '1 Día Completo (Full Day)', desc: 'Salida temprano y retorno por la tarde/noche' },
                  { id: 'sin-preferencia', title: 'Sin preferencia', desc: 'Flexible según el atractivo del destino' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('duration', opt.id)}
                    className={`text-left p-4 rounded-sm border transition-all duration-300 flex flex-col justify-between ${
                      answers.duration === opt.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div className="font-semibold text-sm text-dark">{opt.title}</div>
                      {answers.duration === opt.id && (
                        <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-dark flex items-center gap-2 mb-4">
                <DollarSign size={18} className="text-primary" />
                3. ¿Cuál es tu presupuesto aproximado por persona?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'economico', title: 'Económico (Hasta $40 USD)', desc: 'Tours clásicos como City Tour, Valle Sur, Salineras o Humantay' },
                  { id: 'moderado', title: 'Intermedio ($41 a $70 USD)', desc: 'Super Valle Sagrado, Cuatrimotos, Ausangate o Quelccaya' },
                  { id: 'exclusivo', title: 'Experiencia Integral (Más de $70 USD)', desc: 'Ruta del Sol o Machu Picchu Full Day con trenes y buses' },
                  { id: 'sin-preferencia', title: 'Sin preferencia de presupuesto', desc: 'Quiero evaluar la mejor relación valor-experiencia' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('budget', opt.id)}
                    className={`text-left p-4 rounded-sm border transition-all duration-300 flex items-start justify-between ${
                      answers.budget === opt.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-dark">{opt.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                    </div>
                    {answers.budget === opt.id && (
                      <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 ml-2">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Difficulty */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-dark flex items-center gap-2 mb-4">
                <Activity size={18} className="text-primary" />
                4. ¿Qué nivel de exigencia física prefieres?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'facil', title: 'Fácil / Relajado', desc: 'Poco esfuerzo físico, traslados cómodos y caminatas breves' },
                  { id: 'moderado', title: 'Moderado', desc: 'Caminatas activas con descansos periódicos' },
                  { id: 'desafiante', title: 'Desafiante / Alta Montaña', desc: 'Ascensos exigentes sobre 4,200 msnm para aventureros aclimatados' },
                  { id: 'sin-preferencia', title: 'Sin preferencia', desc: 'Cualquier nivel de actividad' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('difficulty', opt.id)}
                    className={`text-left p-4 rounded-sm border transition-all duration-300 flex items-start justify-between ${
                      answers.difficulty === opt.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-dark">{opt.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                    </div>
                    {answers.difficulty === opt.id && (
                      <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 ml-2">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-border mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="text-xs font-semibold uppercase tracking-wider text-dark"
            >
              <ArrowLeft size={14} className="mr-1.5" />
              Anterior
            </Button>

            <Button
              onClick={nextStep}
              disabled={
                (step === 1 && !answers.experienceType) ||
                (step === 2 && !answers.duration) ||
                (step === 3 && !answers.budget) ||
                (step === 4 && !answers.difficulty)
              }
              className="bg-primary hover:bg-primary/90 text-white text-xs font-semibold uppercase tracking-wider px-6"
            >
              {step === totalSteps ? (
                <>
                  Ver Recomendaciones
                  <Sparkles size={14} className="ml-1.5" />
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight size={14} className="ml-1.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-border">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-1.5">
                <Sparkles size={13} />
                Selección Personalizada
              </span>
              <h4 className="text-2xl font-normal font-heading text-dark mt-1">
                Tours Recomendados Para Ti
              </h4>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={restartQuiz}
              className="text-xs font-semibold uppercase tracking-wider text-dark flex items-center gap-1"
            >
              <RotateCcw size={13} />
              Reiniciar Preguntas
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(({ pkg, matchReasons }, idx) => (
              <div 
                key={pkg.id}
                className="bg-muted/20 border border-border rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-metallic text-dark px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-full shadow">
                        $ {pkg.price} USD / per
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-dark/80 backdrop-blur-sm text-white px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold rounded-sm">
                        Top {idx + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h5 className="font-heading text-lg font-medium text-dark leading-snug mb-1">
                      {pkg.title}
                    </h5>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase font-semibold mb-3">
                      <span>{pkg.duration}</span>
                      <span>•</span>
                      <span>Dificultad {pkg.difficulty}</span>
                    </div>

                    {/* Match tags */}
                    <div className="space-y-1 mb-4">
                      {matchReasons.slice(0, 2).map((reason, rIdx) => (
                        <div key={rIdx} className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-sm flex items-center gap-1.5">
                          <Check size={11} className="text-emerald-600 shrink-0" />
                          <span className="truncate">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-border/50 flex flex-col gap-2 mt-auto">
                  <Link
                    to={`/tours/${pkg.id}`}
                    className="w-full text-center py-2 text-[10px] uppercase tracking-wider font-bold text-dark bg-white border border-border hover:bg-muted transition-colors rounded-sm"
                  >
                    Ver Detalles
                  </Link>
                  <Button
                    size="sm"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-[10px] uppercase tracking-wider font-bold rounded-sm flex items-center justify-center gap-1.5"
                    onClick={() => window.open(getWhatsAppBookingLink(pkg), '_blank')}
                  >
                    <Phone size={12} />
                    Consultar por WhatsApp
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3 font-light">
              ¿Deseas explorar la totalidad de nuestros 18 paquetes disponibles en Cusco?
            </p>
            <Link
              to="/tours"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-primary hover:text-dark transition-colors"
            >
              Explorar el catálogo completo
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
