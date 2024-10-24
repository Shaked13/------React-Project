import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/BigPie";
import { TCard } from "../Types/TCard";

const UseCards = () => {

    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(searchWord));
    };

    const searchFavoriteCards = () => {
        return cards.filter((item) => item.likes.includes(user.user!._id))
            .filter((item: TCard) => item.title.includes(searchWord));
    };

    const isLikedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else return false;
    };

    const navToCard = (id: string) => {
        nav('/card/' + id);
    };

    const getData = async () => {
        try {
            const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
            setCards(res.data);
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

    const getMyCardsData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
            const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards');
            setCards(res.data);
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


    const deleteCard = async (card: TCard) => {
        try {
            // תצוגת דיאלוג האישור
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            // אם המשתמש לחץ על אישור
            if (result.isConfirmed) {
                // מחיקת הכרטיס מהשרת
                await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
                const index = cards.indexOf(card);
                const newCards = [...cards];
                newCards.splice(index, 1);
                setCards(newCards);
                // תצוגת הודעת הצלחה
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000,
                    showCloseButton: true
                });
            }
        } catch {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true
            });
        }
    };

    const likeUnlikeCard = async (card: TCard) => {
        try {
            const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
            if (res.status === 200) {
                const cardIndex = cards.indexOf(card);  // מיקום הכרטיס המדובר בתוך אוסף הכרטיסים
                const userIndex = card.likes.indexOf(user.user!._id); // מקום הזיהוי של המשתמש המחובר בתוך הכרטיס המדובר
                const newCards = [...cards];
                if (userIndex === -1) { //not found
                    newCards[cardIndex].likes.push(user.user!._id);
                    Swal.fire({
                        position: "top-end",
                        toast: true,
                        background: '#6d6d6d',
                        color: '#ffffff',
                        icon: "success",
                        title: "Card Liked",
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    newCards[cardIndex].likes.splice(userIndex, 1);
                    Swal.fire({
                        position: "top-end",
                        toast: true,
                        background: '#6d6d6d',
                        color: '#ffffff',
                        icon: "success",
                        title: "Card Unliked",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                setCards(newCards);
            };
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

    };

    const user = useSelector((state: TRootState) => state.UserSlice);
    return { searchCards, isLikedCard, navToCard, getData, likeUnlikeCard, user, searchFavoriteCards, getMyCardsData, deleteCard };

};

export default UseCards;