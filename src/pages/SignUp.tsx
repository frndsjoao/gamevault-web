import { BaseView, Button, Card, Icon, Input } from "../components"
import Link from "../components/common/Link"
import { useSignUpQuery } from "@/hooks/mutations/useAuth"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpData, signUpschema } from "@/schemas/authSchema"
import { showErrorToast } from "@/utils/utils"
import DatePicker from "@/components/common/DatePicker"
import { platforms } from "@/utils/platforms"
import { IconName } from "@/components/common/Icon"
import { parseSchemaErrors } from "@/utils/parseSchemaError"
import { useEffect, useState } from "react"
import { storage } from "@/utils/localStorage"
import { useAppNavigate } from "@/hooks/useNavigation"

export default function SignUp() {
  const navigate = useAppNavigate()
  const [email, setEmail] = useState("")
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(signUpschema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      birthdate: undefined,
      name: "",
      preferredPlatform: "",
      confirmPassword: "",
    },
  })

  const { mutate: signUp, isPending, error, isSuccess } = useSignUpQuery()

  const onSubmit = async (data: SignUpData) => {
    const formatDate = (date?: Date) => date?.toISOString().split("T")[0] ?? ""

    signUp({ ...data, birthdate: formatDate(data.birthdate) })
  }

  const onError = (err: any) => {
    console.log(parseSchemaErrors(err))
    showErrorToast(err ? parseSchemaErrors(err) : error?.message || "")
  }

  console.log(email)

  const signIn = () => {
    navigate("/signin")
  }

  useEffect(() => {
    if (isSuccess) {
      storage.setEmail(email)
    }
  }, [isSuccess, email])

  return (
    <BaseView>
      <Card className="max-w-md">
        <h2 className="mb-2 text-xl font-semibold text-text-light">
          Create your account
        </h2>
        <p className="mb-6 text-sm font-normal text-text-medium">
          You need to create an account to start your game collection
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                label="Name:"
                onChange={field.onChange}
                value={field.value}
                icon="user"
              />
            )}
          />
          <Controller
            name="birthdate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Birth date:"
                placeholder="Select the date"
                value={field.value}
                onChange={field.onChange}
                icon="calendar"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              function onChange(e: any) {
                field.onChange(e)
                setEmail(e.target.value)
              }
              return (
                <Input
                  type="email"
                  label="E-mail:"
                  onChange={onChange}
                  value={field.value}
                  icon="at"
                />
              )
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                label="Password:"
                onChange={field.onChange}
                value={field.value}
                icon="key"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                label="Password confirmation:"
                onChange={field.onChange}
                value={field.value}
                icon="key"
              />
            )}
          />

          <Controller
            name="preferredPlatform"
            control={control}
            render={({ field }) => (
              <div className="my-3">
                <label className="mb-1 text-sm font-normal text-text-light">
                  Select your favorite platform:
                </label>
                <div className="my-3 flex flex-row items-center gap-2">
                  {platforms
                    .filter((p) => p.id !== "all")
                    .map((plat) => {
                      const isActive = field.value === plat.id
                      return (
                        <button
                          key={plat.id}
                          onClick={() => field.onChange(plat.id)}
                          disabled={isActive}
                          className={`${isActive ? "border-btn-light bg-btn-light cursor-not-allowed" : "border-border hover:bg-gray-700 cursor-pointer"} rounded-md border p-2 transition-colors`}
                          aria-label={`Selecionar plataforma ${plat.label}`}
                        >
                          <Icon
                            name={`plat-${plat.id}` as IconName}
                            size={18}
                            className={
                              isActive ? "text-text-dark" : "text-text-light"
                            }
                          />
                        </button>
                      )
                    })}
                </div>
              </div>
            )}
          />

          <div className="flex flex-col items-center border-t-[1px] border-t-text-medium pt-4">
            <Button
              type="submit"
              label="Create account"
              isLoading={isPending}
              disabled={!isValid}
            />
          </div>
        </form>
        <div className="flex justify-center">
          <Link label="Sign in" onClick={signIn} />
        </div>
      </Card>
    </BaseView>
  )
}
