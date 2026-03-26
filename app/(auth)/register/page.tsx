import { Section } from "@components/sections/Section";
import { RegisterForm } from "@components/molecules/RegisterForm";

export default function RegisterPage() {
  return (
      <Section
        fluid
        classNames="min-h-screen flex-1 flex flex-col justify-center items-center"
      >
        <article className=" bg-pattern rounded-sm px-5 py-10 max-w-md w-full flex flex-col justify-center items-center gap-6">
          <h1 className="text-3xl font-bold text-center text-white">
            Create your account
          </h1>
          <RegisterForm />
        </article>
      </Section>
  );
}
