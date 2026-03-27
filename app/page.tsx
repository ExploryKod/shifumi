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
        <h1 className="text-heading-1 font-bold text-white">Rock, Paper, Scissors</h1>
        
        {/* Main score display */}
        <Scores />
        
        {/* Game controls */}
        <GameControls />
        
        {/* Demonstrate concurrent updates - multiple score components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Score Widget 1</h3>
            <Scores />
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Score Widget 2</h3>
            <Scores />
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Score Widget 3</h3>
            <Scores />
          </div>
        </div>
      </Section>
    </main>
  );
}
