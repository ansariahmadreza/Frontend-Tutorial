"use client"
import { useForm } from "react-hook-form"; ///برای مدیریت فرم و گرفتن داده ها
import { z } from "zod";/// تعریف قوانین اعتبار سنجی فرم
import { zodResolver } from "@hookform/resolvers/zod";/// وصل کردن قوانین zod به react hook form
import { useState } from "react";

const Login = () => {

    const [serverMessage, setServerMessage] = useState('')/// نمایش پیغام ثبت نام موفقیت امیز بود

    const userSchema = z.object({/// تعریف یک ابجکت از z که دارای مقادیر و قوانین زیر است
        name: z.string().min(3, "نام باید حداقل 3 کاراکتر داشته باشد"),
        email: z.string().email("ایمیل معتبر نیست"),
        password: z.string().min(6, "حداقل 6 کاراکتر لازم است").regex(/[A-Z]+/, "باید دارای یک حرف بزرگ باشد"),
        confirmPassword: z.string().min(6, "تکرار رمز عبور الزامی است")
    }).refine((data) => data.password === data.confirmPassword, {/// رمز عبور و تکرار ان باید یکسان باشد و اگر نبود پیغام خطای مشخص شده رو روی فیلد confirmpassword نشون بده
        message: "رمز عبور و تکرار ان باید یکسان باشند",
        path: ["confirmPassword"]
    })

    type RegisterFormData = z.infer<typeof userSchema> /// ساخت یک تایپ اختصاصی که بر اساس قوانین ابجکتی که در بالا با درنظر گرفتن قوانین zod ساختیم


    /// به صورت کلی یه فرم بساز که فیلد هاش طبق registerFormData باشن و اعتبار سنجی طبق userSchema با zod انجام بشه
    const { register, /// هر input رو به فرم وصل میکنه
        handleSubmit, ///برای هندل کردن ارسال فرم
        formState: { errors // اگر خطا در گرفتن داده ها بود پیام اینجا ذخیره بشه
            , isSubmitting /// نشون میده فرم در هر ارسال هست یا خیر
        } }
        = useForm<RegisterFormData>({
            resolver: zodResolver(userSchema)
        })


    ///شبیه سازی وضعیت بک اند
    const onSubmit = async (data: RegisterFormData) => {
        try {
            setServerMessage("")
            await new Promise((resolve) => setTimeout(resolve, 1500))
            console.log("user Data", data)
            setServerMessage("ثبت نام با موفقیت انجام شد")
        } catch (err) {
            setServerMessage("مشکلی پیش امد")
        }
    }

    return (
        <section>
            <title> ورود / ثبت نام | فروشگاه اینترنتی تکنولایف</title>
            <img src="../Logos/logo-Login.webp" alt="logo-Login" className="w-[1100px] object-center object-cover h-[742px] bottom-0 float-left left-0" />
            <div>
                <img src="../Logos/static_logo_techno_new.svg" alt="static_logo" className="w-[150px] mx-auto pt-[50px]" />
                <h2 className="pt-[40px] text-[18px]  text-center font-bold">ورود | ثبت نام</h2>
                <h3 className="text-center pt-[40px] font-bold text-[15px]">خوش اومدی :)</h3>
            </div>
            <form action="" className="flex flex-col items-center justify-center gap-3 pt-7" onSubmit={handleSubmit(onSubmit)} >
                <input type="text" {...register('name')} className="outline-0 border rounded p-1 w-[300px]" placeholder="نام  و نام خانوادگی" />
                {errors.name && <p>{errors.name.message}</p>}
                <input type="email" {...register("email")} className="outline-0 border rounded p-1 w-[300px]" placeholder="ایمیل" />
                {errors.email && <p>{errors.email.message}</p>}
                <input type="password" placeholder="رمز عبور" className="outline-0 border rounded p-1 w-[300px]" {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
                <input type="password" {...register("confirmPassword")} className="outline-0 border rounded p-1 w-[300px]" placeholder="تکرار رمز عبور" />
                {errors.confirmPassword && (<p>{errors.confirmPassword.message}</p>)}

                <button type="submit"
                    disabled={isSubmitting}
                    className={`p-1 text-white rounded-lg cursor-pointer ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {!isSubmitting ? "ثبت نام" : "...در حال ارسال"}
                </button>

                {serverMessage && (
                    <p className={`text-center mt-2 ${serverMessage.includes("ثبت نام با موفقیت انجام شد") ? "text-green-600" : "text-red-600"
                        }`}>
                        {serverMessage}
                    </p>
                )}

            </form>
        </section>
    )
}

export default Login;