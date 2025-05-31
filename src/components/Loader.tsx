// src/components/Loader.tsx
const Loader = () => {
  console.log('Loader component rendered');
  return (
    <div className="d-flex justify-content-center my-5 py-5">
      <div className="preloader">
        {[...Array(4)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
