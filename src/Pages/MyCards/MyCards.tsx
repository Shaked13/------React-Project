import { FaHeart, FaPhoneAlt } from "react-icons/fa";
import { Button, Card, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { useNavigate } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { BsPencilSquare, BsTrash3Fill } from "react-icons/bs";
import UseCards from "../../Hooks/UseCards";
import UsePagination from "../../Hooks/UsePagination";


const Cards = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const { searchCards, isLikedCard, navToCard, likeUnlikeCard, user, getMyCardsData, deleteCard } = UseCards();

    const { onPageChange, currentCards, totalPages, currentPage } = UsePagination(searchCards);

    const nav = useNavigate();

    const navToCreate = () => {
        nav('/createcard');
    }

    useEffect(() => {
        getMyCardsData();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center bg-gray-200 dark:bg-gray-700">
                <h1 style={{ fontSize: "3rem" }}> My Cards </h1>
            </section>

            <div className="flex flex-col items-center justify-start gap-2 dark:bg-gray-800">

                <div className="flex flex-wrap items-center justify-center gap-10 p-5 m-auto bg-grey-800 max-md:flex-col max-md:gap-3 md:w-4/5">
                    {currentCards.map((item: TCard) => {
                        return (
                            <Card key={item._id}
                                className=" bg-gray-200 dark:text-white dark:bg-gray-700 h-[500px] w-[300px] text-center" >

                                <img onClick={() => navToCard(item._id)}
                                    src={item.image.url}
                                    alt={item.image.alt}
                                    className="w-[250px] h-[200px] object-cover cursor-pointer" />

                                <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h1>
                                <hr />

                                <div>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">{item.description}</p>
                                    <p>{item.subtitle}</p>
                                    <p> Phone: {item.phone} </p>
                                    <p> Address: {item.address.city} </p>
                                    <p> Card Number: {item.bizNumber} </p>
                                </div>

                                <div className="flex">
                                    <div className="flex gap-10 m-auto dark:text-black">
                                        <a href={`tel:${item.phone}`}>
                                            <FaPhoneAlt className="m-auto cursor-pointer" />
                                        </a>

                                        {user && user.user &&
                                            <FaHeart
                                                size={20}
                                                className="m-auto cursor-pointer"
                                                color={isLikedCard(item) ? "red" : "black"}
                                                onClick={() => likeUnlikeCard(item)}
                                            />}


                                        <BsPencilSquare
                                            size={20}
                                            className="m-auto cursor-pointer"
                                            onClick={() => nav("/edit-cards/" + item._id)}
                                        //navigate to Update Card Details
                                        />

                                        <BsTrash3Fill
                                            size={20}
                                            className="m-auto cursor-pointer"
                                            onClick={() => deleteCard(item)} />

                                    </div>
                                </div>
                            </Card>
                        )
                    })}

                    <div className="fixed flex p-3 bg-gray-400 rounded-full cursor-pointer dark:bg-gray-700 right-10 top-50">
                        <PiPlus size={20} onClick={navToCreate} />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    {isMobile ? (
                        // For mobile: only show previous and next buttons
                        <div className="flex">
                            <Button
                                color="dark"
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="mr-2"
                            >
                                Previous
                            </Button>
                            <Button
                                color="dark"
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    ) : (
                        // For desktop: show full pagination
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    )}
                </div>
            </div >
        </>
    )
}
export default Cards;