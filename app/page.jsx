"use client";
import { useEffect, useState } from "react";
import ImageComponent from "./components/ImageComponent";
// import Loader from "./components/Loader";
import Renderer from "./components/Renderer";
import Navbar from "./components/Navbar";
import { AiOutlineReload } from "react-icons/ai";
import { useRouter } from "next/navigation";

const clientID = process.env.API_KEY;
export default function Home() {
  const [defaultImages, setDefaultImages] = useState([]);
  const [page, setPage] = useState(1);
  const [render, setRender] = useState(null);
  const [query, setQuery] = useState("");
  const [showRenderImage, setShowRenderImage] = useState(false);
  const [queries, setQueries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // function to get all the images
  const getImages = async () => {
    const urlDefault = `https://api.unsplash.com/photos/?client_id=${clientID}&page=${page}&per_page=8`;
    const urlSearch = `https://api.unsplash.com/search/photos?query=${query}&per_page=8&client_id=${clientID}&page=${page}`;
    try {
      const res = await fetch(query ? urlSearch : urlDefault, {
        method: "GET",
      });
      const data = await res.json();

      setDefaultImages((prevImages) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...prevImages, ...data.results];
        } else {
          return [...prevImages, ...data];
        }
      });
    } catch (error) {
      throw error;
    }
  };

  // query function
  const searchQuery = async (event) => {
    event.preventDefault();
    if (query != "" && queries.length > 10) {
      const newArr = queries.slice(10);
      setQueries(newArr);
    }
    if (query != "") {
      setDefaultImages([]);
      scrollToTop();
      setPage(1);
      getImages();
      suggestionsFunction();
    }
  };

  // get items from local storage
  useEffect(() => {
    const storedList = localStorage.getItem("suggestions");
    setSuggestions(storedList ? JSON.parse(storedList) : []);
    setQueries(storedList ? JSON.parse(storedList) : []);
  }, []);

  const suggestionsFunction = () => {
    setQueries((prevQuery) => [...new Set(prevQuery), query]);
    localStorage.setItem("suggestions", JSON.stringify(queries));
  };

  // run default url
  useEffect(() => {
    getImages();
  }, [page]);

  // to increment page numbers
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        setPage((prevPage) => {
          return prevPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  // scrolls to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // image rendering or zoom in
  const renderImage = (image) => {
    setShowRenderImage(true);
    setRender(image);
  };

  // remove scroll from the page while the image is rendering
  useEffect(() => {
    if (showRenderImage) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showRenderImage]);

  const handleRefresh = () => {
    location.reload();
  };
  return (
    <>
      <Navbar>
        <div className="place-self-end flex items-center gap-3 justify-between">
          <form onSubmit={searchQuery}>
            <input
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="bg-[#151515] lg:px-5 lg:py-2 px-2 py-1 border-b-2"
              value={query}
              placeholder="Search..."
              autoComplete="true"
            />
          </form>
          <button type="button" onClick={() => handleRefresh()}>
            <AiOutlineReload className="h-6 w-6" />
          </button>
        </div>
        {suggestions.length > 0 ? (
          <div className="col-span-1 col-start-2 place-self-center">
            <div>
              <h1 className="text-gray-200 font-bold">Suggestions</h1>
              <div className="flex gap-2 flex-wrap mt-2 text-xs lg:text-sm">
                {suggestions.map((suggestion, index) => {
                  return (
                    <button
                      key={index}
                      className="bg-gray-200 text-black rounded-full px-2 py-1"
                      onClick={() => setQuery(suggestion)}
                    >
                      {suggestion}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Navbar>
      <main className="container mx-auto">
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-10 gap-5">
          {defaultImages.map((image, index) => (
            <div
              onClick={() => renderImage(image)}
              key={index}
              className="mb-5 w-full h-full cursor-zoom-in"
              style={{ aspectRatio: image.width / image.height }}
            >
              <ImageComponent image={image} src={image.urls.regular} />
            </div>
          ))}
        </div>
        {showRenderImage && (
          <Renderer
            selectedImage={render}
            setShowRenderImage={setShowRenderImage}
          />
        )}
      </main>
    </>
  );
}
