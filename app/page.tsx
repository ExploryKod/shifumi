import { Section } from "@components/sections/Section";
import { Scores } from "@/app/_components/Scores";
import { GameControls } from "@/app/_components/GameControls";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] w-full flex-col">
      <Section
        fluid
        classNames="flex-1 flex flex-col items-center justify-center space-y-8"
      > 
        {/* Game controls */}
        <GameControls />
      
      </Section>
    </main>
  );
}
