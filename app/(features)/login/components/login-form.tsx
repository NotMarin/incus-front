import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Ingresa a tu cuenta</h1>
          <p className="text-muted-foreground text-sm">
            Bienvenido de nuevo, nos alegra verte nuevamente.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          </div>
          <Input id="password" type="password" placeholder="Ingresa tu contraseña" required />
        </Field>
        <Field>
          <Button type="submit">Iniciar sesión</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            ¿No tienes una cuenta?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Regístrate aquí
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
