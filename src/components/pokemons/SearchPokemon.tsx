import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';


interface Props {
    onNewSearch: (query: string) => void;
}

export const SearchPokemon = ({ onNewSearch }: Props) => {

    const [inputValue, setInputValue] = useState('');

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(target.value)
        setInputValue(target.value);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // console.log(event);
        event.preventDefault();
        // if (inputValue.trim().length <= 1) return;

        onNewSearch(inputValue.trim());

    }

    return (
        <form onSubmit={onSubmit} aria-label="form">
            <div className='relative'>
                <input
                    className="pl-12 text-base font-normal text-white rounded w-[575px] h-[40px] bg-[#272727]"
                    type="text"
                    placeholder="Search pokemon"
                    value={inputValue}
                    onChange={onInputChange}
                />
                <div className="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none text-gray-400">
                    <IoMdSearch size={25} />

                </div>
            </div>

        </form>
    );
}