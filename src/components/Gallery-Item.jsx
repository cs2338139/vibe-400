import PropTypes from 'prop-types';

GalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  img: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  imageClass: PropTypes.string
};

export default function GalleryItem({
  id,
  className,
  img,
  children,
  imageClass
}) {
  return (
    <div
      id={id}
      className={`${className} relative flex flex-col items-start gap-4 sm:w-full`}>
      <div
        className={`sm:w-full] flex items-center justify-center overflow-hidden sm:h-[357px] ${imageClass}`}>
        <img
          className="h-auto w-full max-w-none transition duration-300 hover:scale-110"
          src={img}
        />
      </div>
      <div className="text-center-body-1 text-pr-2">{children}</div>
    </div>
  );
}
