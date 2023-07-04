
export default function Renderer({ selectedImage, setShowRenderImage }) {
  const handleToggle = () => {
    setShowRenderImage(false);
  };
  return (
    <section className="w-full h-screen flex items-center justify-center fixed top-0 left-0 z-20">
      <div
        onClick={() => handleToggle()}
        className="bg-black blur-bg bg-opacity-50 absolute top-0 left-0 w-full h-full"
      ></div>
      <div className="relative z-20 w-3/4 h-3/4">
        <button
          onClick={() => handleToggle()}
          type="button"
          className="absolute -top-10 -right-10 text-xl text-white"
        >
          Close
        </button>
        <img
          onClick={() => handleToggle()}
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          className="w-full h-full object-contain cursor-zoom-out"
        />
      </div>
    </section>
  );
}
