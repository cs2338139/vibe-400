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
    <div id={id} className={`${className} flex flex-col items-start gap-4`}>
      <div
        className={`flex w-full items-center justify-center overflow-hidden sm:h-[357px] sm:w-[323px] ${imageClass}`}>
        <img
          className="h-auto w-full max-w-none transition duration-300 hover:scale-110 sm:h-auto sm:w-auto"
          src={img}
        />
      </div>
      <div className="text-center-body-1 text-pr-2">{children}</div>
    </div>
  );
}
