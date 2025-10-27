import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [audioStarted, setAudioStarted] = useState(false);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Handle audio playback
    const playAudio = async () => {
      if (!audioStarted) {
        try {
          // Play intro audio
          const introAudio = new Audio("https://fastcdn.onrender.com/whoo");
          introAudioRef.current = introAudio;
          introAudio.volume = 0.5;
          
          await introAudio.play();
          
          // When intro ends, play main audio
          introAudio.onended = async () => {
            const mainAudio = new Audio("https://fastcdn.onrender.com/msc01");
            mainAudioRef.current = mainAudio;
            mainAudio.loop = true;
            mainAudio.volume = 0.3;
            await mainAudio.play();
          };
          
          setAudioStarted(true);
        } catch (error) {
          console.log("Audio autoplay prevented:", error);
        }
      }
    };

    // Try to play audio on first user interaction
    const handleInteraction = () => {
      playAudio();
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

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('http://fastcdn.onrender.com/dlextend')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10 fade-in">
          <img
            src="https://fastcdn.onrender/samil.png"
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
            backgroundImage: "url('http://fastcdn.onrender.com/dlextend2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Meet Şamil
          </h2>
          <p className="text-base md:text-lg font-body mb-6 text-secondary">
            A 13-year-old who codes games, composes music, and writes creative stories — all from home.
          </p>
          <p className="text-sm md:text-base font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="min-h-screen py-20 px-4 bg-background flex flex-col items-center justify-center">
        <div className="max-w-5xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Inspiration Sources
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10">
            <img
              src="https://deltarune.com/assets/images/logo.png"
              alt="Deltarune"
              className="max-h-12 md:max-h-14 w-auto hover-glow object-contain"
            />
            <img
              src="https://undertale.com/assets/images/logo.png"
              alt="Undertale"
              className="max-h-10 md:max-h-12 w-auto hover-glow object-contain"
            />
            <img
              src="https://static.wikia.nocookie.net/logopedia/images/a/ac/Doki_Doki_Literature_Club_Logo.png/revision/latest/scale-to-width-down/1200?cb=20210703202454"
              alt="DDLC"
              className="max-h-12 md:max-h-14 w-auto hover-glow object-contain"
            />
          </div>
          
          <p className="text-sm md:text-base font-body italic max-w-2xl mx-auto text-muted-foreground">
            "Even though I don't play many games, I've experienced the most meaningful ones. 
            The best inspirations create the best stories."
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative min-h-screen py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('http://fastcdn.onrender.com/dlextend2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll">
            Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-card border-border overflow-hidden hover-glow cursor-pointer animate-on-scroll"
              >
                <img
                  src={`https://via.placeholder.com/400x300`}
                  alt={`Project ${i}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">Project {i}</h3>
                  <p className="text-sm font-body text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt.
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
