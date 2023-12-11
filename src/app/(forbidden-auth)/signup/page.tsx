"use client";

import Button from "@/components/ui/button";
import IcError from "@material-symbols/svg-400/rounded/error-fill.svg";
import { useRouter } from "next/navigation";
import { HTMLAttributes, InputHTMLAttributes, useEffect, useMemo, useState } from "react";
import { UseControllerProps, useController, useForm } from "react-hook-form";
import { signUp } from "./actions";
import styles from "./page.module.scss";

function Field<FV extends {}>(
  props: {
    name: string;
    title: string;
    component?: React.ElementType;
    type: InputHTMLAttributes<HTMLInputElement>["type"];
  } & UseControllerProps<FV>
) {
  const { name, title, component: Component = "input", type, ...restProps } = props;

  const { field, fieldState } = useController(props);

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (fieldState.invalid && fieldState.error) {
      switch (fieldState.error.type) {
        case "required":
          setErrorMsg("반드시 필요한 항목이에요");
          break;
        case "maxLength":
          setErrorMsg("입력이 너무 길어요");
          break;
        default:
          setErrorMsg(fieldState.error.message);
          break;
      }
    } else {
      setErrorMsg(undefined);
    }
  }, [fieldState.error, fieldState.invalid]);

  return (
    <fieldset className={styles["field"]}>
      <div className={styles["field__left"]}>
        <label className={styles["field__label"]} htmlFor={name}>
          {title}
        </label>
      </div>
      <div className={styles["field__right"]}>
        <Component className={styles["field__input"]} aria-invalid={fieldState.invalid} type={type} {...field} />
        <div className={styles["field__under"]}>
          {errorMsg && (
            <div className={styles["field__error"]}>
              <IcError width="1rem" height="1rem" />
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    </fieldset>
  );
}

interface FormData {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function Page() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { control, watch, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
  });

  const doOnSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        setLoading(true);

        signUp({
          email: data.email,
          password: data.password,
        })
          .then((state) => {
            if (state?.message) {
              alert(state.message);
            } else {
              alert("환영해요! 로그인한 뒤 서비스를 이용할 수 있어요.");
              router.replace("/signin");
            }
          })
          .catch((e) => {
            alert(JSON.stringify(e));
          })
          .finally(() => {
            setLoading(false);
          });
      }),
    [handleSubmit, router]
  );

  return (
    <div className={styles["root"]}>
      <div className={styles["page-head"]}>
        <p className={styles["page-head__welcome"]}>
          환영합니다!
          <br />
          아래 간단한 절차를 거쳐 회원이 될 수 있어요.
        </p>
      </div>
      <div className={styles["page-body"]}>
        <form className={styles["form"]} onSubmit={doOnSubmit}>
          <Field
            name="email"
            type="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /.+@.+\..+/,
                message: "올바른 이메일 형식이 아니에요",
              },
            }}
            title="이메일"
          />
          <Field
            name="password"
            type="password"
            control={control}
            rules={{
              required: true,
            }}
            title="비밀번호"
          />
          <Field
            name="passwordCheck"
            type="password"
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                if (watch("password") !== value) {
                  return "앞서 써주신 것과 달라요";
                }
              },
            }}
            title="비밀번호 확인"
          />
          <div className={styles["actions-container"]}>
            <Button type="submit" intent="contained" tint="primary" size="lg" loading={isLoading}>
              가입하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
