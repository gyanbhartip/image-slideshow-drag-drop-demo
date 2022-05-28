import { Draggable } from "react-beautiful-dnd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useGlobalContext } from "../../utils/context/Context";
import "./ImageSlider.css";
const ImageSlider = ({ SliderData }) => {
  const { current, setCurrent, setSliderData } = useGlobalContext();
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const setSlideFromThumb = (index) => {
    setCurrent(index);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newSliderData = [...SliderData];
    const [removed] = newSliderData.splice(source.index, 1);
    newSliderData.splice(destination.index, 0, removed);
    setSliderData(newSliderData);
  };

  if (!Array.isArray(SliderData) || length === 0) {
    return null;
  }

  return (
    <main className="slider-container">
      <section className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        {SliderData.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img src={slide.image} alt="slide" className="image" />
              )}
            </div>
          );
        })}
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      </section>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="thumbs">
          {(provided) => (
            <section
              className="thumbs"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {SliderData.map(({ id, image }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={
                          index === current
                            ? "thumb-image-container active"
                            : ""
                        }
                        onClick={() => setSlideFromThumb(index)}
                      >
                        <img
                          src={image}
                          alt="thumbnail"
                          className="thumb-image"
                        />
                      </div>
                    )}
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
