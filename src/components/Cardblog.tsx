
interface CardProps {
    title: string
    text: string
    path: string
  }

interface CardblogProps {
    cardLeft: CardProps;
    cardRight: CardProps;
}

const Cardblog = ({ cardLeft, cardRight }: CardblogProps) => {
    return (
        <div className="w-[480px]">
            <div className="relative w-full flex items-center justify-center">
                <div className="absolute top-0 left-0 bg-red-400 text-center size-60 flex items-center justify-center transition-all duration-700 delay-200 transform hover:translate-x-60 hover:bg-blue-400  hover:rounded-l-full">
                    <span className="text-white">{ cardLeft.title }</span>
                </div>
                <div className="absolute top-0 right-0 bg-blue-400 text-center size-60 flex items-center justify-center transition-all duration-700 delay-200 transform hover:-translate-x-60 hover:bg-red-400 hover:rounded-r-full">
                    <span className="text-white">{ cardRight.title }</span>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="bg-gray-100 size-60 rounded-l-full flex items-center justify-center">
                    <div className="w-52 space-y-2 text-center">
                        <a className="text-gray-600 text-xs block font-bold cursor-pointer p-2" href={ cardLeft.path } target="_blank">
                            <span className="text-clip">{ cardLeft.text }</span>
                        </a>
                    </div>
                </div>
                <div className="bg-gray-100 text-center size-60 rounded-r-full flex items-center justify-center">
                    <div className="w-52 space-y-2 text-center">
                        <a className="text-gray-600 text-xs block font-bold cursor-pointer p-2" href={ cardRight.path } target="_blank">
                            <span className="text-clip">{ cardRight.text }</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cardblog;