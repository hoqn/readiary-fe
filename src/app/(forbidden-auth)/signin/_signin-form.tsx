"use client";

import Button from "@/components/ui/button";
import authApi from "@/services/api/auth.api";
import cs from "classnames";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./_signin-form.module.scss";
import { signIn } from "./actions";

interface SignInFormData {
  email: string;
  password: string;
}

interface Props extends BaseProps {
  redirect?: string;
}

export default function SignInForm({ className, redirect = "/", ...restProps }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<SignInFormData>();

  const doOnSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        setIsFetching(true);

        signIn(data)
          .then(() => {
            router.replace(redirect, { scroll: false });
          })
          .catch((e) => {
            // TODO: Dialog Modal로 교체
            alert(`로그인 실패\n${e}`);
            setIsFetching(false);
          });
      }),
    [handleSubmit, redirect, router]
  );

  return (
    <div className={cs(styles["root"], className)} {...restProps}>
      <form className={styles["signin-form"]} onSubmit={doOnSubmit} noValidate>
        <>
          {/* {formState.errors.email && formState.errors.email.message} */}
          <label className={styles["signin-label"]} htmlFor="email">
            이메일
          </label>
          <input
            className={styles["signin-input"]}
            tabIndex={0}
            autoFocus
            type="email"
            {...register("email", {
              required: "이메일은 로그인을 위해 반드시 필요해요", // TODO: 오류 안내 말 UI로 추가
              validate: (value) => /.+@.+\..+/.test(value) || "이메일 형식이 아니에요",
            })}
          />
        </>
        <>
          <label className={styles["signin-label"]} htmlFor="password">
            비밀번호
          </label>
          <input
            className={styles["signin-input"]}
            tabIndex={0}
            autoFocus
            type="password"
            {...register("password", {
              required: "비밀번호는 로그인을 위해 반드시 필요해요",
            })}
          />
        </>
        <Button
          className={styles["signin-button"]}
          type="submit"
          tint="primary"
          intent="contained"
          disabled={!formState.isValid}
          loading={isFetching}
        >
          로그인
        </Button>
      </form>
    </div>
  );
}
