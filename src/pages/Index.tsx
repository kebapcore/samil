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
        <div className="relative z-10">
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
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Meet Şamil
          </h2>
          <p className="text-lg md:text-xl mb-6 text-secondary">
            A 13-year-old who codes games, composes music, and writes creative stories — all from home.
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="min-h-screen py-20 px-4 bg-background flex flex-col items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Inspiration Sources
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
              src="https://static.wikia.nocookie.net/logopedia/images/a/ac/Doki_Doki_Literature_Club_Logo.png/revision/latest/scale-to-width-down/1200?cb=20210703202454"
              alt="DDLC"
              className="max-h-12 md:max-h-14 w-auto object-contain"
            />
          </div>
          
          <p className="text-base md:text-lg italic max-w-2xl mx-auto text-muted-foreground">
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
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Projects
          </h2>
          
          <div className="flex flex-col gap-8 items-center">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-card border-border overflow-hidden cursor-pointer w-full max-w-4xl"
              >
                <img
                  src={`https://via.placeholder.com/400x300`}
                  alt={`Project ${i}`}
                  className="w-full h-80 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Project {i}</h3>
                  <p className="text-lg text-muted-foreground">
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
