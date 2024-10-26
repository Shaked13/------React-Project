import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { Button, Card, Pagination } from "flowbite-react";
import { FaHeart, FaPhoneAlt } from "react-icons/fa";
import UseCards from "../../Hooks/UseCards";
import UsePagination from "../../Hooks/UsePagination";

const Home = () => {
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

    const { isLikedCard, navToCard, getData, likeUnlikeCard, user, searchCards } = UseCards();
    const { onPageChange, currentCards, totalPages, currentPage } = UsePagination(searchCards);

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center bg-gray-200 dark:bg-gray-700">
                <h1 style={{ fontSize: "3rem" }}> Cards Page </h1>
                <p style={{ fontSize: "1.5rem" }} className="items-center">Here you can find business cards from all categories</p>
            </section>

            <div className="flex flex-col items-center justify-start gap-2 dark:bg-gray-800">

                <div className="flex flex-wrap items-center gap-10 p-5 m-auto max-md:gap-3 md:w-4/5 max-md:flex-col">
                    {currentCards.map((item: TCard) => {
                        return (
                            <Card key={item._id} className="m-auto max-md:w-[300px] h-[500px] overflow-hidden  w-[300px] bg-gray-200 dark:text-white dark:bg-gray-700">
                                <img className="object-fill w-[250px] h-[200px]" src={item.image.url} alt={item.image.alt}
                                    onClick={() => navToCard(item._id)}
                                />
                                <h1>{item.title}</h1>
                                <h3>{item.subtitle}</h3>
                                <div className="max-h-[100px] h-[100px] overflow-hidden">
                                    <p>{item.description}</p>
                                </div>
                                <hr />

                                <div className="flex">
                                    <div className="flex gap-10 m-auto dark:text-black">
                                        <a href={`tel:${item.phone}`}>
                                            <FaPhoneAlt className="m-auto cursor-pointer size-5" />
                                        </a>

                                        {user && user.user &&
                                            <FaHeart
                                                size={20}
                                                className="m-auto cursor-pointer"
                                                color={isLikedCard(item) ? "red" : "black"}
                                                onClick={() => likeUnlikeCard(item)}
                                            />}
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
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
                        <Pagination className="mb-5"
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;