import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [audioStarted, setAudioStarted] = useState(false);
  // Animasyon durumlarını yönetmek için yeni state'ler
  const [showIntro, setShowIntro] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isChaos, setIsChaos] = useState(false);
  
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Handle audio and animation playback
    const playSequence = async () => {
      if (!audioStarted) {
        setAudioStarted(true); // Tekrar tetiklenmesini engelle
        
        try {
          // Play intro audio
          const introAudio = new Audio("/first.m4a");
          introAudioRef.current = introAudio;
          introAudio.volume = 0.5;
          await introAudio.play();
          
          // --- Animasyonları Başlat ---
          setShowIntro(true); // Intro overlay'lerini göster
          setIsFading(true);  // Fade-out animasyonunu başlat (5 saniye)
          
          // 5. saniyede kaosu başlat
          setTimeout(() => {
            setIsChaos(true);
          }, 5000);
          
          // 8. saniyede tüm intro efektlerini bitir
          setTimeout(() => {
            setShowIntro(false);
            setIsFading(false);
            setIsChaos(false);
          }, 8000);
          
          // Intro bittiğinde ana müziği başlat
          introAudio.onended = async () => {
            const mainAudio = new Audio("/background.m4a");
            mainAudioRef.current = mainAudio;
            mainAudio.loop = true;
            mainAudio.volume = 0.3;
            await mainAudio.play();
          };

        } catch (error) {
          console.log("Audio autoplay prevented:", error);
          // Hata durumunda animasyonları da atlayabiliriz
          setAudioStarted(false); 
        }
      }
    };

    const handleInteraction = () => {
      playSequence();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      if (introAudioRef.current) introAudioRef.current.pause();
      if (mainAudioRef.current) mainAudioRef.current.pause();
    };
  }, [audioStarted]); // Bağımlılık audioStarted olarak kalmalı

  return (
    // Ana div'e kaos efekti için bir class ekliyoruz
    <div className={`min-h-screen bg-background text-foreground ${isChaos ? 'animate-chaos-container' : ''}`}>
      
      {/* INTRO ANIMATION OVERLAYS */}
      {showIntro && (
        <>
          {/* Black fade-out overlay */}
          <div 
            className={`fixed inset-0 bg-black z-50 pointer-events-none ${isFading ? 'animate-fade-out-intro' : ''}`}
          />
          {/* White flash overlay for chaos effect */}
          {isChaos && (
            <div className="fixed inset-0 bg-white z-40 pointer-events-none animate-chaos-flash" />
          )}
        </>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10">
          <img
            src="/Şamil.png"
            alt="Şamil Logo"
            className="w-full max-w-3xl h-auto px-4"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="relative min-h-screen py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/grad.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Şamil'le tanışın.
          </h2>
          <p className="text-lg md:text-xl mb-6 text-secondary">
           13 yaşında evde kod yazan, oyunlar geliştiren, senaryo yazan ve müzikler besteleyen biriyim. 
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            7 yaşından itibaren Powerpoint kullanmak ile başlayan bilgisayar hayatım, Scratch gibi basit yazılım sitelerini öğrenmemle devam etti. Kod tabanlı
            yazılımı öğrendikten sonra, bilgisayar işlerini uzun bir süre bıraktım. 11-12 yaşları arasında Discord'da bot yapma hevesi ile, yazılım tutkum yeniden başladı. Hazır araçları kullanmaktaydım, ancak sonrasında
            yetersiz kalınca "gerçekten öğrenmem lazım" diyerek, Python ve Node.js yazılım dillerini öğrendim. Bu gerçek anlamda öğrendiğim ilk yazılım dilleriydi. Sonra oyun yapma hevesiyle Game Maker Studio, Unreal Engine gibi araçlarla
            oyunlar geliştirdim. En sonunda Next.js gibi ileri seviye yazılım dillerini öğrendim ve böylece buralara kadar geldim.
            Yazılım dışında, UNDERTALE oyunundaki müziklerden etkilenip yakın zamanda FL Studio kullanmayı öğrendim ve bazı müzikler yapıyorum.
            6 yaşından beri hikayeler yazıyordum ve şu anda da dizi ve oyun hikayeleri geliştiriyorum.
            Toby Fox (UNDERTALE yapımcısı) idolüm.
            Kendini beğenmiş insanlardan nefret ederim.
            9.sınıftaki planım ciddi anlamda herkese açacağım bir oyun yapmak.
          </p>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="min-h-screen py-20 px-4 bg-background flex flex-col items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            İlham Kaynakları
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10">
            <img
              src="https://deltarune.com/assets/images/logo.png"
              alt="Deltarune"
              className="max-h-12 md:max-h-14 w-auto object-contain"
            />
            <img
              src="https://undertale.com/assets/images/logo.png"
              alt="Undertale"
              className="max-h-10 md:max-h-12 w-auto object-contain"
            />
            <img
              src="https://static.wikia.nocookie.net/logopedia/images/a/ac/Doki_Doki_Literature_Club_Logo.png/"
              alt="DDLC"
              className="max-h-12 md:max-h-14 w-auto object-contain"
            />
          </div>
          <p className="text-base md:text-lg italic max-w-2xl mx-auto text-muted-foreground">
            Çok oyun oynamasam da oynadıdığım birkaç oyun en anlamlılarıydı.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative min-h-screen py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/grad.png')", // .png uzantısını ekledim, orijinal kodda eksikti
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Projeler
          </h2>
          <div className="flex flex-col gap-8 items-center">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-card border-border overflow-hidden cursor-pointer w-full max-w-4xl"
              >
                <img
                  src={`https://via.placeholder.com/800x450`} // Placeholder boyutunu değiştirdim
                  alt={`VARTX`}
                  className="w-full h-80 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Project {i}</h3>
                  <p className="text-lg text-muted-foreground">
                    Düşünebilen, türk yapımı gelişmiş yapay zeka modeli. En hızlı ve en doğru, en gerekli yanıtı verir.
                    Duyguları mükemmel şekilde simüle eder ve klişe yanıtlardan kaçınır.
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
