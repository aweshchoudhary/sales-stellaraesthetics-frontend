"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useLoginMutation } from "@/redux/services/authApi";
import * as yup from "yup";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import FormInput from "@/components/form/FormInput";
import { isFetchBaseQueryError } from "@/lib/helper";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { LoginCredentialTypes } from "@/types/interface";
import { useLazyGetMeQuery } from "@/redux/services/userApi";

type Props = {};

const initialValues: LoginCredentialTypes = {
  user: "",
  password: "",
};

const validationSchema = yup.object().shape({
  user: yup
    .string()
    .required("User is required")
    .min(4, "User must be at least 4 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export default function LoginPage({}: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: LoginCredentialTypes) => handleLogin(values),
  });
  const [login, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  const [getMe, getMeStates] = useLazyGetMeQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (values: LoginCredentialTypes) => {
    await login(values);
  };
  useEffect(() => {
    const handleGetMe = async () => {
      dispatch(setCredentials({ accessToken: data?.accessToken }));
      const res = await getMe({});

      dispatch(setCredentials({ user: res.data }));

      toast.success("Login Successfully");
      router.push("/");
    };
    if (isSuccess && data) handleGetMe();
  }, [isSuccess, data, dispatch, router, getMe]);

  return (
    <section className="w-screen h-screen flex justify-center items-center p-10">
      <div className="w-1/2 border p-10 h-fit rounded">
        <header className="mb-5">
          <h1 className="text-3xl font-bold">Stellar Aesthetics</h1>
          <p className="text-muted-foreground">Login with your credentials</p>
        </header>
        {isError ? (
          <Alert
            variant="destructive"
            className="mb-5 gap-3 flex items-center "
          >
            <div>
              <AlertCircle className="h-4 w-4" />
            </div>
            <AlertDescription className="p-0">
              {isFetchBaseQueryError(error) && error.data?.message}
            </AlertDescription>
          </Alert>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            autoFocus={true}
            name="user"
            title="User"
            formik={formik}
          />
          <FormInput
            name="password"
            type="password"
            title="Password"
            formik={formik}
          />
          <div>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Logging..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
