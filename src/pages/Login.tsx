import { BaseView, Button, Card, Checkbox, Input } from "../components"
import Link from "../components/common/Link"
import { useSignInQuery } from "@/hooks/mutations/useAuth"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInData, signInschema } from "@/schemas/authSchema"
import { showErrorToast } from "@/utils/utils"
import { useAppNavigate } from "@/hooks/useNavigation"
import { storage } from "@/utils/localStorage"
import logoSvg from "@/assets/gamevault-logo.svg"

export default function Login() {
  const navigate = useAppNavigate()
  const emailStorage = storage.getEmail()
  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(signInschema),
    defaultValues: {
      email: emailStorage ?? "",
      password: "",
      showPassword: false,
    },
    mode: "onChange",
  })

  const showPassword = watch("showPassword")

  const { mutate: signIn, isPending, error } = useSignInQuery()

  const onSubmit = async (data: SignInData) => {
    if (emailStorage !== data.email) {
      storage.setEmail(data.email)
    }
    signIn({ email: data.email, password: data.password })
  }

  const onError = () => {
    showErrorToast(error?.message ?? "")
  }

  const createAccount = () => {
    navigate("/signup")
  }

  return (
    <BaseView>
      <img src={logoSvg} alt="GameVault Logo" className="mx-auto h-28" />
      <Card className="max-w-md">
        <h2 className="mb-2 text-xl font-semibold text-text-light">
          Login to your account
        </h2>
        <p className="mb-6 text-sm font-normal text-text-medium">
          Enter your email below to login to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                label="E-mail"
                onChange={field.onChange}
                value={field.value}
                icon="user"
              />
            )}
          />

          <div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  onChange={field.onChange}
                  value={field.value}
                  icon={showPassword ? "eye" : "eyeOff"}
                />
              )}
            />
            <Controller
              name="showPassword"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  label={`${showPassword ? "Hide" : "Show"} your password`}
                />
              )}
            />
          </div>

          <div className="flex flex-col items-center border-t-[1px] border-t-text-medium pt-4">
            <Button type="submit" label="Login" isLoading={isPending} />
            <Link type="button" label="Criar conta" onClick={createAccount} />
          </div>
        </form>
      </Card>
    </BaseView>
  )
}
