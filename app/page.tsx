import { Section } from "@components/sections/Section";
import { GameBoard } from "@/app/_components/GameBoard";
import { RulesButton } from "@/app/_components/RulesButton";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] w-full flex-col">
        <Section
          fluid
          classNames="flex-1 flex flex-col items-center justify-center py-8"
        >
          {/* Main game board */}
          <GameBoard />
        </Section>
      </main>
      
      {/* Rules button */}
      <RulesButton />
    </>
  );
}
