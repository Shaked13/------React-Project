import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import Swal from "sweetalert2";

const CardDetails = () => {
    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        try {
            const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/' + id);
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
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center bg-gray-200 dark:bg-gray-700">
                <h1 style={{ fontSize: "3rem" }}> Card Details </h1>
            </section>

            <div className="flex flex-col items-center justify-start gap-2 dark:bg-gray-800">

                <div className="flex flex-wrap items-center gap-10 p-10 m-auto max-md:gap-3 md:w-4/5 max-md:flex-col">

                    <Card key={card?._id} className="m-auto max-md:w-[300px] mt-0 h-[700px] w-[500px] bg-gray-200 dark:bg-gray-700">
                        <h1 style={{ fontSize: "1.4rem" }} className="text-center dark:text-white">{card && card!.title}</h1>
                        <img src={card?.image.url} alt={card?.image.alt} className="object-fill m-auto w-[350px] h-[200px]"></img>
                        <hr />
                        <h1 className="dark:text-white">Email: {card && card!.email!}</h1>
                        <h1 className="dark:text-white">Phone: {card && card!.phone!}</h1>
                        <h1 className="dark:text-white max-md-[250px]">Description: {card && card!.description}</h1>
                        <h1 className="dark:text-white">
                            Address: {card?.address.country + ", " + card?.address.city + ", " + card?.address.street}</h1>
                        <br />
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CardDetails;