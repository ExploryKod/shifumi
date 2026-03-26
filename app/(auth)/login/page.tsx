import { Section } from "@components/sections/Section";
import { LoginForm } from "@components/molecules/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Section
        fluid
        classNames="min-h-screen flex-1 flex flex-col justify-center items-center"
      >
        <article className="rounded-sm max-w-md w-full px-5 py-10 flex flex-col justify-center items-center gap-6 bg-pattern">
          <h1 className="text-3xl font-bold text-center text-white">
            Sign in to your account
          </h1>
          <LoginForm />
        </article>
      </Section>
    </>
  );
}
