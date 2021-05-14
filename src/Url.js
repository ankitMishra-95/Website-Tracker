import React, { useEffect } from "react";
import { useGlobalContext } from "./Context";

function Url() {
  const { urlList, timeDifference } = useGlobalContext();
  return (
    <>
      <section>
        <div className="wrapper">
          <div className="url-section">
            <h2>websites</h2>
            <div className="urls">
              {urlList.map((elem, index) => {
                const { url, fullUrl, status, title, time } = elem;
                return (
                  <article key={index} className={status}>
                    <div className="left">
                      <h4>{title}</h4>
                      <a href={fullUrl} target="_blank">
                        {url}
                      </a>
                    </div>
                    <div className="right">
                      <span>
                        Last checked:
                        {timeDifference(new Date(), time)}
                      </span>
                      <button type="button">{status}</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Url;
