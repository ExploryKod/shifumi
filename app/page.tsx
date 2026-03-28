import { Section } from "@components/sections/Section";
import { GameBoard } from "@/app/_components/GameBoard";
import { RulesButton } from "@/app/_components/RulesButton";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] w-full flex-col">
      <Section classNames="flex min-h-0 flex-1 flex-col items-stretch py-8 sm:py-20">
        <div className="flex min-h-0 w-full flex-1 flex-col items-center">
          <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
            <GameBoard />
          </div>
          <div className="mt-auto flex w-full shrink-0 justify-center pt-8 pb-2 sm:pb-4 md:justify-end md:pr-2 lg:pr-8">
            <RulesButton />
          </div>
        </div>
      </Section>
    </main>
  );
}
