import { SubmitHandler, useForm } from "react-hook-form";
import useCountries from "../../hooks/useCountries";
import { signUp } from "../../services/accounts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";
import "./Signup.css";

interface FormValues {
  fullname: string;
  countryId: number;
  email: string;
  username: string;
  age: number;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      fullname: "",
      countryId: "" as unknown as number,
      email: "",
      username: "",
      age: "" as unknown as number,
      password: "",
      confirmPassword: "",
    },
  });

  const { countries } = useCountries();

  const { storeUserWithCookie } = useUser();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...signUpData } = data;
      const response = await signUp(signUpData);
      storeUserWithCookie(response.user);
      navigate("/verify-email");
    } catch (error: unknown) {
      if (
        (error as { message: string })?.message === "Username already exists"
      ) {
        setError("username", {
          type: "manual",
          message: "* El nombre de usuario ya existe",
        });
        setFocus("username");
        return;
      }
      if (
        (error as { message: string })?.message?.includes(
          "Email already registered in the country"
        )
      ) {
        setError("email", {
          type: "manual",
          message:
            "* El correo electrónico ya está registrado en el país seleccionado",
        });
        setFocus("email");
        return;
      }
    }
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword !== "") {
      setError("confirmPassword", {
        type: "mismatch",
        message: "Las contraseñas no coinciden",
      });
      return;
    }
    setError("confirmPassword", {
      type: "mismatch",
      message: "",
    });
  }, [password, confirmPassword, setError]);

  const isDisabled = !isValid;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Ingrese sus datos para comenzar</h3>
      <div>
        <label htmlFor="fullname">Nombre completo</label>
        <input
          type="text"
          placeholder="Su nombre"
          aria-invalid={errors.fullname ? "true" : "false"}
          {...register("fullname", { required: true })}
        />
        {errors.fullname && errors.fullname.type === "required" && (
          <span role="alert">* El nombre es requerido</span>
        )}
      </div>
      <div>
        <label htmlFor="countryId">Pais</label>
        <select {...register("countryId", { required: true })}>
          <option value="" disabled>
            Seleccione un pais
          </option>
          {countries?.length &&
            countries?.map((country, index) => (
              <option key={index} value={country.id}>
                {country.name}
              </option>
            ))}
        </select>
        {errors.countryId && <span role="alert">* El pais es requerido</span>}
      </div>
      <div>
        <label htmlFor="email">Correo</label>
        <input
          type="text"
          placeholder="Ex: mail@gmail.com"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <span role="alert">* El correo electrónico es requerido</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span role="alert">* El correo electrónico es inválido</span>
        )}
        {errors.email && errors.email.type === "manual" && (
          <span role="alert">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          placeholder="Su nombre de usuario"
          aria-invalid={errors.username ? "true" : "false"}
          {...register("username", {
            required: true,
            minLength: 5,
          })}
        />
        {errors.username && errors.username.type === "required" && (
          <span role="alert">* El nombre de usuario es requerido</span>
        )}
        {errors.username && errors.username.type === "minLength" && (
          <span role="alert">
            * El nombre de usuario debe tener al menos 5 caracteres
          </span>
        )}
        {errors.username && errors.username.type === "manual" && (
          <span role="alert">{errors.username.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="age">Edad</label>
        <input
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          min="1"
          max="1000"
          placeholder="Su edad"
          aria-invalid={errors.age ? "true" : "false"}
          {...register("age", {
            required: true,
            pattern: {
              value: /^[0-9]+$/,
              message: "Invalid age",
            },
          })}
        />
        {errors.age && errors.age.type === "required" && (
          <span role="alert">* La edad es requerida</span>
        )}
        {errors.age && errors.age.type === "pattern" && (
          <span role="alert">* La edad es inválida</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          placeholder="Su contraseña"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && errors.password.type === "required" && (
          <span role="alert">* La contraseña es requerida</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span role="alert">
            * La contraseña debe tener al menos 8 caracteres
          </span>
        )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "mismatch" && (
            <span role="alert">{errors.confirmPassword.message}</span>
          )}
      </div>
      <div>
        <label htmlFor="confirmPassword">Repetir Contraseña</label>
        <input
          type="password"
          placeholder="Repita su contraseña"
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          {...register("confirmPassword", { required: true, minLength: 8 })}
        />
        {errors.confirmPassword &&
          errors.confirmPassword.type === "required" && (
            <span role="alert">* La contraseña es requerida</span>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "minLength" && (
            <span role="alert">
              * La contraseña debe tener al menos 8 caracteres
            </span>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "mismatch" && (
            <span role="alert">{errors.confirmPassword.message}</span>
          )}
      </div>
      <button type="submit" disabled={isDisabled}>
        {isSubmitting ? "Enviando..." : "Comenzar"}
      </button>
    </form>
  );
};

export default SignUp;
