import { useState } from 'react';
import cn from 'classnames';
import s from './style.module.css';
import PokemonCard from '../../../../../../components/PokemonCard';

const PlayerBoard = ({ player, cards, onClickCard }) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
            {
                cards.map(item => (
                    <div
                        key={item.id}
                        className={cn(s.cardBoard, { [s.selected]: isSelected === item.id })}
                        onClick={() => {
                            setSelected(item.id);
                            onClickCard && onClickCard({
                                player,
                                ...item,
                            });
                        }}>
                        <PokemonCard
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            values={item.values}
                            img={item.img}
                            minimize
                            isActive
                        />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;