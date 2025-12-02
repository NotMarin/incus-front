"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://10.50.50.125:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      toast.success("Registro exitoso");
      router.push("/login");
    } catch {
      toast.error("No se pudo crear la cuenta");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Rellena el formulario de abajo para crear tu cuenta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FieldDescription>
            Usaremos esto para contactarte. No compartiremos tu correo con nadie más.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            placeholder="Ingresa una contraseña segura"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FieldDescription>Debe tener al menos 8 caracteres.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            placeholder="Ingresa nuevamente tu contraseña"
          />
          <FieldDescription>Por favor confirma tu contraseña.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            Crear cuenta
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
