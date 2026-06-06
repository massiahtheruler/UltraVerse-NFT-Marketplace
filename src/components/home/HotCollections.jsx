import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getHotCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Failed to load hot collections:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getHotCollections();
  }, []);

  const visibleCollections = isLoading ? new Array(6).fill(null) : collections;

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {visibleCollections.map((collection, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={collection?.id || index}
            >
              <div className="nft_coll">
                <div className="nft_wrap">
                  {collection && (
                    <Link to="/item-details">
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt={collection.title}
                      />
                    </Link>
                  )}
                </div>
                <div className="nft_coll_pp">
                  {collection && (
                    <>
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={collection.title}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </>
                  )}
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection?.title || "Loading..."}</h4>
                  </Link>
                  <span>{collection ? `ERC-${collection.code}` : "ERC"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
