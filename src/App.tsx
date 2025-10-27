
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [audioStarted, setAudioStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isChaos, setIsChaos] = useState(false);
  
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playSequence = async () => {
      if (!audioStarted) {
        setAudioStarted(true);
        
        try {
          const introAudio = new Audio("/first.m4a");
          introAudioRef.current = introAudio;
          introAudio.volume = 0.5;
          await introAudio.play();
          
          // Start animations immediately when audio starts
          setShowIntro(true);
          setIsFading(true);
          
          // Start chaos at 2 seconds (after fade-in completes)
          setTimeout(() => {
            setIsChaos(true);
          }, 2000);
          
          // End all intro effects at 8 seconds
          setTimeout(() => {
            setShowIntro(false);
            setIsFading(false);
            setIsChaos(false);
          }, 8000);
          
          introAudio.onended = async () => {
            const mainAudio = new Audio("/background.m4a");
            mainAudioRef.current = mainAudio;
            mainAudio.loop = true;
            mainAudio.volume = 0.3;
            await mainAudio.play();
          };

        } catch (error) {
          console.log("Audio autoplay prevented:", error);
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
  }, [audioStarted]);

  const handlePlayClick = async () => {
    if (!audioStarted) {
      setAudioStarted(true);
      
      try {
        const introAudio = new Audio("/first.m4a");
        introAudioRef.current = introAudio;
        introAudio.volume = 0.5;
        await introAudio.play();
        
        setShowIntro(true);
        setIsFading(true);
        
        setTimeout(() => {
          setIsChaos(true);
        }, 2000);
        
        setTimeout(() => {
          setShowIntro(false);
          setIsFading(false);
          setIsChaos(false);
        }, 8000);
        
        introAudio.onended = async () => {
          const mainAudio = new Audio("/background.m4a");
          mainAudioRef.current = mainAudio;
          mainAudio.loop = true;
          mainAudio.volume = 0.3;
          await mainAudio.play();
        };

      } catch (error) {
        console.log("Audio autoplay prevented:", error);
        setAudioStarted(false);
      }
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isChaos ? 'animate-chaos-container' : ''}`}>
      
      {/* Play Button */}
      {!audioStarted && (
        <button
          onClick={handlePlayClick}
          className="fixed top-4 right-4 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="Play"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
      
      {/* INTRO ANIMATION OVERLAYS */}
      {showIntro && (
        <>
          <div 
            className={`fixed inset-0 bg-black z-50 pointer-events-none ${isFading ? 'animate-fade-in-intro' : ''}`}
          />
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
      <section className="relative min-h-screen py-20 px-4 overflow-hidden flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/grad.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            İlham Kaynakları
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-10">
            <img
              src="https://deltarune.com/assets/images/logo.png"
              alt="Deltarune"
              className="max-h-16 md:max-h-20 w-auto object-contain"
            />
            <img
              src="https://undertale.com/assets/images/logo.png"
              alt="Undertale"
              className="max-h-14 md:max-h-16 w-auto object-contain"
            />
            <img
              src="https://static.wikia.nocookie.net/logopedia/images/a/ac/Doki_Doki_Literature_Club_Logo.png/"
              alt="DDLC"
              className="max-h-20 md:max-h-24 w-auto object-contain"
            />
          </div>
          <p className="text-base md:text-lg italic max-w-2xl mx-auto text-muted-foreground">
            Çok oyun oynamasam da oynadıdığım birkaç oyun en anlamlılarıydı.
          </p>
        </div>
      </section>

      {/* Favori Kişiler Section */}
      <section className="relative min-h-screen py-20 px-4 overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/grad.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Favori Kişiler
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src="https://pbs.twimg.com/profile_images/1304111803614613504/NKxFjarS_400x400.jpg"
                  alt="Toby Fox"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base md:text-lg font-semibold text-center">Toby Fox</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBthBa0b3cmttRX_xQWxwrivEvDylEDTjGzA&s"
                  alt="Baldiback"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base md:text-lg font-semibold text-center">Baldiback</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src="https://yt3.googleusercontent.com/1XGmIYnF566Cd1m6W1GBKZoib8GeCicjf8zzfQRLDjSy_nQiIm8_lIBY7jmHKzq6WGfHXl9siw=s900-c-k-c0x00ffffff-no-rj"
                  alt="i love az-r"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base md:text-lg font-semibold text-center">Yusuf İpek</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevw7RDcE77GJ2OcfDtwnJZaN7m4Nc1Xd8Ig&s"
                  alt="i miss her"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base md:text-lg font-semibold text-center">Ali Deniz Çelebi</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src="https://img-s1.onedio.com/id-628f46202aab58e91b04d559/rev-0/w-600/h-337/f-jpg/s-365037b91d4f26c685b149b7fe186dd70b3d4e33.jpg"
                  alt="DETERMINATION OH YEAH."
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base md:text-lg font-semibold text-center">Saniye</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAMUJ3wm-vxsWqoj6anVHacTvt6UpuwEGIrTbET9ewTFNoR5r1YkQ5FyN85Ew73eRW40A&usqp=CAU"
                  alt="garip zevkler mi..?"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base md:text-lg font-semibold text-center">Jo Yuri</p>
            </div>
          </div>
        </div>
      </section>

      {/* Favori Şarkılar Section */}
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
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Favori Şarkılar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/4kNKL8kCCV3vt9U2k28Lyx?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/0Mh4zlDsN7s0YMbsas12et?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/5TC7mEjQzD2Q3Mr2rySOp7?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/1fD154mTxJaX8ON82ddJog?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/1aKvZDoLGkNMxoRYgkckZG?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/1HFblnk2Twji0kDogp9D1o?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/4TqmTBSWsZXMj3LouLEvXn?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/0R902FnwJO8kBZYvtpQLrL?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/episode/5VCdJlz83bp9a7hKteckGj?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
            
            <div className="w-full">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/4EsRpVBBKiqOZ67DJj0QHF?utm_source=generator" 
                width="80%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Üzerinde Çalıştıklarım Section */}
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
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Üzerinde Çalıştıklarım...
          </h2>
          <p className="text-xl md:text-2xl text-center mb-12 text-secondary">
            Çok fazla fikir.. çok fazla fikir...
          </p>
          <p className="text-base md:text-lg text-center max-w-3xl mx-auto mb-16 text-muted-foreground leading-relaxed">
            Aklımda sürekli yeni projeler, hikayeler ve fikirler dönüyor. Bazıları yarım kalıyor, bazıları gelişiyor, 
            bazıları ise tamamen değişiyor. İşte bir tanesi: Nefiora, bir dizi senaryosu. Evren, yıllar yıllar sonrasında en büyük 3 teknoloji şirketinin (Google, Apple, Microsoft) dünyayı ele geçirdiği ve yönettiği distopik zaman diliminde geçiyor. Bu şirketler, bütün insanları çiplerle kontrol altına almış. Ve yılda 1 kere, 7 katmanlı sanal bir şehirde 1000 kişi bir araya getirilip ölümcül oyunlar oynuyorlar, bu şirketlerin CEO'larının tek eğlencesi bu. Ölenlerin bilinci, daha fazla enerji ve veri için yapay zeka eğitiminde kullanılıyor. Kazananlar ise, daha üst rütbeye yükseliyorlar, ama hala köleler. Bu evrende ise, nefiora adında bir grup var. Bu grup dünyanın öbür ucundaki bir ormanda yaşıyorlar ve etrafına ördükleri sinyal ağları ile sistemden kaçıyorlar. Bu grubun amacı bu 3 şirketi yenerek insanlığı kurtarmak. Dizi, bu amaca giderken yaşanan kayıpları, maceraları konu alıyor.
          </p>

          {/* VARTX Card */}
          <div className="flex justify-center">
            <Card className="bg-card border-border overflow-hidden cursor-pointer w-full max-w-5xl">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">En Son Hayata Geçirilen</h3>
                  <h4 className="text-2xl md:text-3xl font-bold mb-4 text-primary">VARTX</h4>
                  <p className="text-lg md:text-xl mb-4 text-secondary">
                    Düşünen, duygulu yapay zeka.
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    VARTX, sadece bir yapay zeka değil. Düşünebilen, türk yapımı gelişmiş bir yapay zeka modeli. 
                    En hızlı ve en doğru, en gerekli yanıtı verir. Duyguları mükemmel şekilde simüle eder ve 
                    klişe yanıtlardan kaçınır. Gerçek bir konuşma deneyimi sunmak için tasarlandı.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/vartx.png"
                    alt="VARTX"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
