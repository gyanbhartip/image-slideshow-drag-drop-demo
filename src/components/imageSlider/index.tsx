import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from '@hello-pangea/dnd';

import { FC, useCallback } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { useGlobalContext } from '../../utils/context';
import { SliderDataListType } from '../../utils/types';
// import AppDroppable from '../AppDroppable';
import './ImageSlider.css';

type Props = {
    SliderData: SliderDataListType;
};

const ImageSlider: FC<Props> = ({ SliderData }) => {
    const { current, setCurrent, setSliderData } = useGlobalContext();
    const length = SliderData.length;

    const nextSlide = useCallback(() => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }, [current, length, setCurrent]);

    const prevSlide = useCallback(() => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }, [current, length, setCurrent]);

    const setSlideFromThumb = useCallback(
        (index: number) => {
            setCurrent(index);
        },
        [setCurrent],
    );

    const onDragEnd = useCallback(
        (result: DropResult) => {
            if (!result.destination) {
                return;
            }

            const items = Array.from(SliderData);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            setSliderData(items);
        },
        [SliderData, setSliderData],
    );

    const handleThumbClick = useCallback(
        (index: number) => {
            setSlideFromThumb(index);
        },
        [setSlideFromThumb],
    );

    if (!Array.isArray(SliderData) || length === 0) {
        return null;
    }

    return (
        <main className="slider-container">
            <section className="slider">
                <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={prevSlide}
                />
                {SliderData.map((slide, index) => {
                    return (
                        <div
                            className={
                                index === current ? 'slide active' : 'slide'
                            }
                            key={index}>
                            {index === current && (
                                <img
                                    src={slide.image}
                                    alt="slide"
                                    className="image"
                                />
                            )}
                        </div>
                    );
                })}
                <FaArrowAltCircleRight
                    className="right-arrow"
                    onClick={nextSlide}
                />
            </section>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="thumbs">
                    {provided => (
                        <section
                            className="thumbs"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {SliderData.map(({ id, image }, index) => {
                                return (
                                    <Draggable
                                        key={id}
                                        draggableId={id}
                                        index={index}>
                                        {provided => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={
                                                        index === current
                                                            ? 'thumb-image-container active'
                                                            : ''
                                                    }
                                                    // eslint-disable-next-line react/jsx-no-bind
                                                    onClick={() =>
                                                        handleThumbClick(index)
                                                    }>
                                                    <img
                                                        src={image}
                                                        alt="thumbnail"
                                                        className="thumb-image"
                                                    />
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </section>
                    )}
                </Droppable>
            </DragDropContext>
        </main>
    );
};

export default ImageSlider;
