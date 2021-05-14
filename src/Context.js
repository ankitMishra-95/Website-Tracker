import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [urlList, setUrlList] = useState([]);
  const [userInput, setuserInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userInputCorrect, setuserInputCorrect] = useState(false);

  const isValidURL = (str) => {
    let a = document.createElement("a");
    a.href = str;
    return a.host && a.host !== window.location.host;
  };

  const getInputData = (e) => {
    e.preventDefault();
    if (!userInput == "" && isValidURL(userInput)) {
      let newInput = { url: userInput, time: new Date().getTime() };
      setUrlList((old) => {
        return [newInput, ...old];
      });
      let urlData = [
        newInput,
        ...JSON.parse(localStorage.getItem("storeForUrl")),
      ];
      localStorage.setItem("storeForUrl", JSON.stringify(urlData));
      setIsLoading(true);
      setuserInput("");
      showData();
    } else {
      setuserInputCorrect(true);
    }
  };

  const getResponse = (url, time) => {
    let status = "";
    return fetch(`http://textance.herokuapp.com/title/${url}`)
      .then((response) => {
        if (response.status === 200) {
          status = "live";
        } else {
          status = "error";
          return "Not Found";
        }
        return response.text();
      })
      .then((html) => {
        let domain = new URL(url).hostname;
        return {
          url: domain,
          fullUrl: url,
          status: status,
          title: html,
          time: time,
        };
      })
      .catch((err) => {
        return err.message;
      });
  };

  //   First time visible data
  let cTime = new Date().getTime();
  let urls1 = [
    {
      url: "https://www.ushacook.com/en/",
      time: cTime,
    },
    {
      url: "https://baragaonweaves.com/",
      time: cTime,
    },
    {
      url: "https://www.proathlix.com/abcd",
      time: cTime,
    },
    {
      url: "https://www.merinolaminates.com/en/",
      time: cTime,
    },
  ];

  // This one keeps the order the same as the URL list.
  const showData = () => {
    let urlData = JSON.parse(localStorage.getItem("storeForUrl"));
    Promise.all(urlData.map((elem) => getResponse(elem.url, elem.time))).then(
      (titles) => {
        setUrlList(titles);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    let storage = localStorage.getItem("storeForUrl");
    // setting data first time
    if (storage === null) {
      localStorage.setItem("storeForUrl", JSON.stringify(urls1));
    }
    showData();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      //fetching on every 5 Minutes.
      showData();
    }, 30 * 10000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setuserInputCorrect(false);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [userInputCorrect]);

  let LastChecked = 0;
  function timeDifference(date1, date2) {
    let difference = date1.getTime() - date2;

    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    let minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;
    if (hoursDifference >= 24) {
      LastChecked =
        daysDifference <= 9
          ? daysDifference + " Day ago"
          : daysDifference + " Days ago";
      return LastChecked;
    }
    if (minutesDifference >= 60) {
      LastChecked =
        hoursDifference <= 9
          ? hoursDifference + " Hour ago"
          : hoursDifference + " Hours ago";
      return LastChecked;
    }
    LastChecked =
      minutesDifference <= 9
        ? minutesDifference + " Minute ago"
        : minutesDifference + " Minutes ago";
    return LastChecked;
  }
  console.clear();
  return (
    <AppContext.Provider
      value={{
        urlList,
        isLoading,
        userInput,
        setuserInput,
        getInputData,
        userInputCorrect,
        timeDifference,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
