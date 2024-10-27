import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { CreateCardsSchema } from "../../Validations/CreateCardsSchema";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Button } from "flowbite-react";
import Swal from "sweetalert2";

const CreateCards = () => {

    const nav = useNavigate();

    const initialFormData = {
        "title": "",
        "subtitle": "",
        "description": "",
        "phone": "",
        "email": "",
        "web": "",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "state": "",
            "country": "",
            "city": "",
            "street": "",
            "houseNumber": 0,
            "zip": 0
        }
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFormData,
        mode: "onChange",
        resolver: joiResolver(CreateCardsSchema)
    });

    const onSubmit = async (form: typeof initialFormData) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", form);
            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            nav("/mycards");
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                showCloseButton: true
            });
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-auto bg-gray-200 shadow-lg">

                {/* <h1 className="text-2xl font-bold text-center text-gray-800"> Card Creation</h1> */}

                <section className="flex flex-col items-center bg-gray-200 dark:bg-gray-700">
                    <h1 style={{ fontSize: "3rem" }}> Card Creation </h1>
                </section>

                <div className="flex flex-col items-center justify-start gap-2 dark:bg-gray-800">


                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Title"
                                type="text"
                                variant="standard"
                                {...register("title")}
                                color={errors.title ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.title?.message}</span>
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Subtitle"
                                type="text"
                                variant="standard"
                                {...register("subtitle")}
                                color={errors.subtitle ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.subtitle?.message}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">

                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-green-500">
                                Description</label>

                            <textarea id="message" {...register("description")}
                                className="block p-2.5 w-[350px] h-[200px] m-auto text-sm text-gray-900 bg-gray-50
                        rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                                placeholder="Write your card description here...">
                            </textarea>

                            <span className="mt-2 text-sm text-center text-red-800">{errors.description?.message}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Phone"
                                type="number"
                                variant="standard"
                                {...register("phone")}
                                color={errors.phone ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.phone?.message}</span>
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Email"
                                type="email"
                                variant="standard"
                                {...register("email")}
                                color={errors.email ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.email?.message}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Web"
                                type="text"
                                variant="standard"
                                {...register("web")}
                                color={errors.web ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.web?.message}</span>
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Image URL"
                                type="text"
                                variant="standard"
                                {...register("image.url")}
                                color={errors.image?.url ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.image?.url?.message}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Image Alt"
                                type="text"
                                variant="standard"
                                {...register("image.alt")}
                                color={errors.image?.alt ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.image?.alt?.message}</span>
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Country"
                                type="text"
                                variant="standard"
                                {...register("address.country")}
                                color={errors.image?.alt ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label="City"
                                type="text"
                                variant="standard"
                                {...register("address.city")}
                                color={errors.address?.city ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.address?.city?.message}</span>
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label="State"
                                type="text"
                                variant="standard"
                                {...register("address.state")}
                                color={errors.address?.state ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.address?.state?.message}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label="Street"
                                type="text"
                                variant="standard"
                                {...register("address.street")}
                                color={errors.address?.street ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.address?.street?.message}</span>
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label="House Number"
                                type="number"
                                variant="standard"
                                {...register("address.houseNumber")}
                                color={errors.address?.houseNumber ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.address?.houseNumber?.message}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label="ZIP"
                                type="number"
                                variant="standard"
                                {...register("address.zip")}
                                color={errors.address?.zip ? "error" : "success"}
                            />
                            <span className="text-sm text-red-800">{errors.address?.zip?.message}</span>
                        </div>
                    </div>
                    <Button type="submit" disabled={!isValid} className="m-auto w-[20%] mt-4 mb-5 dark:bg-gray-600">Create Card</Button>
                </div>

                <ToastContainer />
            </form>

        </>
    )
};

export default CreateCards;