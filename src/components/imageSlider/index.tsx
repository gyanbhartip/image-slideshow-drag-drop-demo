import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from 'react-beautiful-dnd';

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

            // Calculate the direction of the shift (positive or negative)
            const shiftDirection =
                result.source.index < result.destination.index ? 1 : -1;

            // Calculate the number of positions to shift
            const shiftAmount = Math.abs(
                result.source.index - result.destination.index,
            );

            // Shift the remaining items horizontally
            for (let i = result.destination.index; i < items.length; i++) {
                const shift = shiftDirection * shiftAmount;
                items[i].shift += shift;
            }

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
                <section className="thumbs">
                    {SliderData.map(({ id, image, shift }, index) => (
                        <Droppable key={id} droppableId={id}>
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    // Apply the horizontal shift
                                    style={
                                        index !== current
                                            ? {
                                                  transform: `translateX(${shift}px)`,
                                                  zIndex: 1,
                                              }
                                            : {
                                                  transform: `translateX(${shift}px) scale(1.1)`,
                                              }
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onClick={() => handleThumbClick(index)}>
                                    <Draggable draggableId={id} index={index}>
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={
                                                    index === current
                                                        ? 'thumb-image-container active'
                                                        : 'thumb-image-container'
                                                }>
                                                <img
                                                    src={image}
                                                    alt="thumbnail"
                                                    className="thumb-image"
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </section>
            </DragDropContext>
        </main>
    );
};

export default ImageSlider;
