import Cardblog from '../../components/Cardblog';

export default function Blogs() {
    const cards = [
        {
            title: "title 1",
            text: "Lorem ipsum dolor sit amet nam himenaeos praesent sapien. Lorem ipsum dolor sit amet nam himenaeos praesent sapien. Lorem ipsum dolor sit amet nam himenaeos praesent sapien",
            path: "#"
        },
        {
            title: "title 2",
            text: "Lorem ipsum dolor sit amet nam himenaeos praesent sapien. Lorem ipsum dolor sit amet nam himenaeos praesent sapien. Lorem ipsum dolor sit amet nam himenaeos praesent sapien",
            path: "#"
        },
    ];

    return (
        <div className="bg-white min-h-screen py-10 flex flex-wrap items-start justify-center gap-2">
            <Cardblog cardLeft={cards[0]} cardRight={cards[1]}/>
        </div>
    );
}