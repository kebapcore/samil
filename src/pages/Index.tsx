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
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://deltarune.com/assets/images/key-art.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 fade-in">
          <img
            src="https://fastcdn.onrender/samil.png"
            alt="Şamil Logo"
            className="w-full max-w-4xl h-auto px-4"
            style={{ maxHeight: "167px", width: "auto" }}
          />
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen py-20 px-4 gradient-midnight-orange relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center animate-on-scroll">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            Meet Şamil
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-8 text-secondary">
            A 13-year-old who codes games, composes music, and writes creative stories — all from home.
          </p>
          <p className="text-base md:text-lg max-w-3xl mx-auto mb-16 text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>

        {/* Floating Images */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-20 rotate-12 animate-on-scroll">
          <img src="https://via.placeholder.com/150" alt="Inspiration" className="rounded-lg" />
        </div>
        <div className="absolute top-40 right-16 w-40 h-40 opacity-20 -rotate-6 animate-on-scroll">
          <img src="https://via.placeholder.com/150" alt="Inspiration" className="rounded-lg" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 opacity-20 rotate-3 animate-on-scroll">
          <img src="https://via.placeholder.com/150" alt="Inspiration" className="rounded-lg" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 opacity-20 -rotate-12 animate-on-scroll">
          <img src="https://via.placeholder.com/150" alt="Inspiration" className="rounded-lg" />
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="min-h-screen py-20 px-4 bg-background flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto text-center animate-on-scroll">
          <h2 className="text-5xl md:text-7xl font-bold mb-16 text-glow">
            Inspiration Sources
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
            <img
              src="https://deltarune.com/assets/images/logo.png"
              alt="Deltarune"
              className="h-20 md:h-24 w-auto hover-glow"
            />
            <img
              src="https://undertale.com/assets/images/logo.png"
              alt="Undertale"
              className="h-16 md:h-20 w-auto hover-glow"
            />
            <img
              src="https://static.wikia.nocookie.net/logopedia/images/a/ac/Doki_Doki_Literature_Club_Logo.png/revision/latest/scale-to-width-down/1200?cb=20210703202454"
              alt="DDLC"
              className="h-20 md:h-24 w-auto hover-glow"
            />
          </div>
          
          <p className="text-lg md:text-xl italic max-w-3xl mx-auto text-muted-foreground">
            "Even though I don't play many games, I've experienced the most meaningful ones. 
            The best inspirations create the best stories."
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen py-20 px-4 gradient-midnight-orange">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-16 text-glow animate-on-scroll">
            Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-card border-border overflow-hidden hover-glow cursor-pointer animate-on-scroll"
              >
                <img
                  src={`https://via.placeholder.com/400x300`}
                  alt={`Project ${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Project {i}</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
