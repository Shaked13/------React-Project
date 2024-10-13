import { useEffect } from "react";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { FaHeart, FaPhoneAlt } from "react-icons/fa";
import UseCards from "../../Hooks/UseCards";


const Favorites = () => {

    const { isLikedCard, navToCard, getData, likeUnlikeCard, user, searchFavoriteCards } = UseCards()

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <section className="flex flex-col items-center bg-gray-200 dark:bg-gray-700">
                <h1 style={{ fontSize: "3rem" }}> Favorite Page </h1>
                <p style={{ fontSize: "1.5rem" }}>This cards are liked by the user</p>
            </section>

            <div className="flex flex-col items-center justify-start gap-2 dark:bg-gray-800">

                <div className="flex flex-wrap items-center gap-10 p-5 m-auto max-md:gap-3 md:w-3/5 max-md:flex-col">
                    {searchFavoriteCards()!.map((item: TCard) => {
                        return (
                            <Card key={item._id} className="m-auto bg-gray-200 dark:text-white dark:bg-gray-700 h-[500px] w-[300px]">
                                <img src={item.image.url} alt={item.image.alt} className="object-fill h-[200px]"
                                    onClick={() => navToCard(item._id)}
                                />

                                <h1>{item.title}</h1>
                                <h3>{item.subtitle}</h3>
                                <p>{item.description}</p>
                                <hr />
                                {user && user.user &&
                                    <div className="flex">
                                        <div className="flex gap-10 m-auto dark:text-black">
                                            <a href={`tel:${item.phone}`}>
                                                <FaPhoneAlt className="m-auto cursor-pointer" />
                                            </a>
                                            <FaHeart
                                                size={20}
                                                className="m-auto cursor-pointer"
                                                color={isLikedCard(item) ? "red" : "black"}
                                                onClick={() => likeUnlikeCard(item)}
                                            />
                                        </div>
                                    </div>
                                }
                            </Card>
                        )
                    })}
                </div>
            </div >
        </>
    );
};

export default Favorites;