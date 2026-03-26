import { Section } from "@components/sections/Section";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] w-full flex-col">
      <Section
        fluid
        classNames="flex-1 flex flex-col items-center justify-center bg-pattern"
      >
        <article className="max-w-2xl w-full px-6 py-12 text-center text-white">
          <h1 className="text-4xl font-bold">Auth-first Next.js Template</h1>
          <p className="mt-4 text-lg text-white/90">
            Reusable starter with registration and login flows already wired.
          </p>
          <p className="mt-6 text-sm text-white/80">
            Use the header navigation to access authentication pages and start
            adapting the template to your project.
          </p>
        </article>
      </Section>
    </main>
  );
}
