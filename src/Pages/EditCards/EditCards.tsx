import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { CreateCardsSchema } from "../../Validations/CreateCardsSchema";
import { FloatingLabel, Button } from "flowbite-react";
import Swal from "sweetalert2";


const EditCards = () => {
    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    const getCardsData = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id);
            setCard(res.data);
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true
            });
        };
    };

    const initialCardData = {

        title: card?.title,
        subtitle: card?.subtitle,
        description: card?.description,
        phone: card?.phone,
        email: card?.email,
        web: card?.web,
        image: {
            url: card?.image.url,
            alt: card?.image.alt,
        },
        address: {
            state: card?.address.state,
            country: card?.address.country,
            city: card?.address.city,
            street: card?.address.street,
            houseNumber: 0,
            zip: 0,
        },
    };

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialCardData,
        mode: "onChange",
        resolver: joiResolver(CreateCardsSchema)
    });

    const onSubmit = async (form: typeof initialCardData) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            await axios.put("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id, form);
            Swal.fire({
                title: "Done!",
                text: "You Updated your card details successfully",
                icon: "success",
                timerProgressBar: true,
                timer: 2000,
                showCloseButton: true
            });
            nav("/mycards");
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true
            });
        };
    };

    useEffect(() => {
        if (card) {
            reset(initialCardData);
        }
    }, [card, reset]);


    useEffect(() => {
        getCardsData();
    }, [id]);


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 m-auto bg-gray-200 rounded-lg shadow-lg dark:bg-gray-500">
                <h1 className="text-2xl font-bold text-center text-gray-800"> Editing Card Details </h1>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"title"}
                            defaultValue={card?.title}
                            {...register("title")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.title?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"subtitle"}
                            defaultValue={card?.subtitle}
                            {...register("subtitle")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.subtitle?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-black">
                            Description</label>

                        <textarea id="message" defaultValue={card?.description} {...register("description")}
                            className="block p-2.5 w-[350px] h-[200px] m-auto text-sm text-gray-900 bg-gray-50
                        rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 min-w-[100px]: dark:focus:border-blue-500 resize-none"
                            placeholder="Write your card description here...">
                        </textarea>
                        <span className="text-sm text-red-800">{errors.description?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"phone"}
                            defaultValue={card?.phone}
                            {...register("phone")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.phone?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"email"}
                            defaultValue={card?.email}
                            {...register("email")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.email?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"web"}
                            defaultValue={card?.web}
                            {...register("web")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.web?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"image.url"}
                            defaultValue={card?.image.url}
                            {...register("image.url")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.image?.url?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"image.alt"}
                            defaultValue={card?.image.alt}
                            {...register("image.url")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.image?.alt?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"address.country"}
                            defaultValue={card?.address.country}
                            {...register("address.country")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"address.city"}
                            defaultValue={card?.address.city}
                            {...register("address.city")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.city?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"address.state"}
                            defaultValue={card?.address.state}
                            {...register("address.state")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.state?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"address.street"}
                            defaultValue={card?.address.street}
                            {...register("address.street")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.street?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"address.houseNumber"}
                            defaultValue={card?.address.houseNumber}
                            {...register("address.houseNumber")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.houseNumber?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label={"address.zip"}
                            defaultValue={card?.address.zip}
                            {...register("address.zip")}
                            variant={"standard"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.zip?.message}</span>
                    </div>
                </div>

                <Button type="submit" disabled={!isValid} className="m-auto w-[20%]">Update Changes</Button>
            </form>
        </>
    )

};

export default EditCards;